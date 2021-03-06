from fastapi import APIRouter, Request, status, HTTPException, Depends, File, UploadFile
from .models import StartUps, Investors, UserReg, Investments
import peewee, json
from pydantic import BaseModel
from typing import List
import os
from starlette.responses import RedirectResponse
from config.utility import *
import traceback
from datetime import datetime
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

router = APIRouter()


class StartUpModel(BaseModel):
    id: int
    company_name: str
    email: str
    contact: str
    product_name: str
    problem_statement: str
    industry: str
    funding_goal: int
    company_logo: str

    class Config:
        orm_mode = True


class UserModel(BaseModel):
    id: int
    email: str
    password: str
    account_type: int

    class Config:
        orm_mode = True


class InvestorsModel(BaseModel):
    id: int
    fname: str
    lname: str
    venture_name: str
    contact: str
    email: str
    investor_type: int

    class Config:
        orm_mode = True


class InvestmentModel(BaseModel):
    investor_id: int
    startup_id: int
    invested_amount: int
    has_access: bool
    class Config:
        orm_mode = True


@router.post("/startup/create", response_model=StartUpModel)
async def create(
    company_name: str,
    email: str,
    contact: str,
    product_name: str,
    ps: str,
    industry: str,
    funding_goal: int,
    company_logo: UploadFile = File(...),
):
    """
    Add a new Startup to DB
    """

    baseDir = os.path.dirname(os.path.abspath(__file__))

    uploads_dir = os.path.join(baseDir, "static/logos/" + email)
    if not os.path.exists(uploads_dir):
        os.makedirs(os.path.join(baseDir, "static/logos/" + email))

    file_location = f"{uploads_dir}\{company_logo.filename}"

    with open(file_location, "wb+") as file_object:
        file_object.write(company_logo.file.read())

    # image = Request.url_for(name="static", path=f"/logos/{email}/logo.jpg")
    # print(">>>>>>>>>>>>>>>>>>>>>>", image)
    startup_object = StartUps(
        company_name=company_name,
        email=email,
        contact=contact,
        product_name=product_name,
        problem_statement=ps,
        industry=industry,
        funding_goal=funding_goal,
        company_logo=file_location,
    )

    startup_object.save()
    return startup_object


@router.get("/startup/get", response_model=List[StartUpModel])
def get_all_startups():
    """
    Get list of all Startups
    """
    return list(StartUps.select().offset(0).limit(100))


@router.get("/startup/view/{email}", response_model=StartUpModel)
def get_startup(email: str):
    """
    Get a startup details by email
    """
    return StartUps.filter(StartUps.email == email).first()


@router.delete("/startup/{id}")
def delete_startup(id: int):
    """
    Delete a startup by id
    """
    del_startUps = StartUps.delete().where(StartUps.id == id).execute()
    if del_startUps is None:
        return {"status_code": 404, "description": "Startup not found"}
    return {"status_code": 200, "description": "Startup successfully deleted"}


def get_all_users():
    return list(UserReg.select().offset(0).limit(100))


@router.post("/investors/create", response_model=InvestorsModel)
async def create(
    fname: str,
    lname: str,
    venture_name: str,
    contact: str,
    email: str,
    investor_type: int,
):
    """
    Add a new Investor to DB
    """
    investor_object = Investors(
        fname=fname,
        lname=lname,
        venture_name=venture_name,
        contact=contact,
        email=email,
        investor_type=investor_type,
    )
    investor_object.save()
    return investor_object


@router.get("/investors/get", response_model=List[InvestorsModel])
def get_all_investors():
    """
    Get list of all Investors
    """
    return list(Investors.select().offset(0).limit(100))


@router.get("/investors/view/{id}", response_model=InvestorsModel)
def get_investor(id: int):
    """
    Get a investor details by id
    """
    return Investors.filter(Investors.id == id).first()


@router.delete("/investors/{id}")
def delete_investors(id: int):
    """
    Delete a investor by id
    """
    del_investors = Investors.delete().where(Investors.id == id).execute()
    if del_investors is None:
        return {"status_code": 404, "description": "Investor not found"}
    return {"status_code": 200, "description": "Investor successfully deleted"}


@router.post("/login")
async def user_login(form_data: OAuth2PasswordRequestForm = Depends()):
    access_token = ""
    data = {}
    try:
        users_db = UserReg.filter(UserReg.email == form_data.username).first()
        # print("users_data: ", users_db.email, " form_data: ", form_data.username, " password: ", form_data.password)

        user = authenticate_user(users_db, form_data.username, form_data.password)
        if not user:
            return HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.email}, expires_delta=access_token_expires
        )

        if access_token:
            users_db.access_token = access_token
            users_db.last_login = datetime.now()
            users_db.save()

        data = {
            "access_token": access_token,
            "token_type": "bearer",
            "email": user.email,
        }
    except:
        traceback.print_exc()
    return data


@router.post("/logout/{email}")
async def logout(email: str):
    message = ""
    try:
        user_data = UserReg.filter(UserReg.email == email).first()
        if user_data:
            user_data.access_token = ""
            user_data.save()
            message = "Logout successful."
        else:
            message = "Error while logging out."
    except:
        traceback.print_exc()
    return {"message": message}


@router.post("/register")
async def register_user(email: str, password: str, account_type: int):
    message = ""
    try:
        if not UserReg.filter(UserReg.email == email).first():
            user_object = UserReg(
                email=email,
                password=get_password_hash(password),
                account_type=account_type
            )
            user_object.save()
            message = "User Registered successfully."
        else:
            message = "User already present."
    except:
        traceback.print_exc()
    return {"message": message}


@router.post("/investors/requestAccess/")
def request_access(startupId: int, investorId: int):
    message = ""
    try:
        user_reg = Investments.filter(
            Investments.startup_id == startupId, Investments.investor_id == investorId
        ).first()
        if not user_reg:
            investment_object = Investments(
                investor_id=investorId,
                startup_id=startupId,
            )
            investment_object.save()
            message = "Request sent successfully."
        else:
            return HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="There has been some server issue.",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except:
        traceback.print_exc()
    return message


@router.post("/startup/grantAccess/")
def grantAccess(investor_id: int, startup_id: int):
    #grant access to investor.
    message = ""
    has_access = 0
    try:
        investor_data = Investments.filter(
            Investments.startup_id == startup_id, Investments.investor_id == investor_id
        ).first()
        if investor_data:
            investor_data.has_access = 1
            investor_data.save()
            message = "Access granted."
        else:
            message = "Error while granting access."
    except:
        traceback.print_exc()
    return {"message": message, "has_access": has_access}


@router.post("/startup/getAllRequestAccessData/", response_model=List[InvestmentModel])
def getRequestAccessData(startup_id: int):
    #grant access to investor.
    data = []
    try:
        investor_data = Investments.filter(Investments.startup_id == startup_id)
        if investor_data:
            data = list(investor_data)
    except:
        traceback.print_exc()
    return data


@router.post("/investor/investFunds/")
def investFunds(investor_id: int, startup_id: int, invested_amt: int):
    #grant access to investor.
    message = ""
    try:
        investment_data = Investments.filter(Investments.startup_id == startup_id, Investments.investor_id == investor_id).first()
        if investment_data:
            if investment_data.has_access == 1:
                investment_data.invested_amount += invested_amt 
            investment_data.save()
            message = "Congrats! You have invested " + str(invested_amt)
        else:
            message = "You don't have access to invest the amount."
    except:
        traceback.print_exc()
    return {"message": message}
