from fastapi import APIRouter, Request, status, HTTPException
from starlette.responses import Response
from .models import StartUps,Investors, UserReg
import peewee, traceback, json
from pydantic import BaseModel
from typing import List
from config.utility import *


router = APIRouter()

class StartUpModel(BaseModel):
    id:int
    company_name: str
    email: str
    contact: str
    product_name: str
    problem_statement: str
    industry: str
    funding_goal: int

    class Config:
        orm_mode = True

class UserModel(BaseModel):
    id: int
    email: str
    password: str
    account_type: int

    class Config:
        orm_mode = True


@router.post("/startup/create", response_model=StartUpModel)
async def create(company_name: str, email: str, contact: str, product_name: str, ps: str, industry: str, funding_goal: int):
    """
    Add a new Startup to DB
    """
    startup_object = StartUps(
        company_name=company_name,
        email=email, 
        contact=contact,
        product_name=product_name,
        problem_statement=ps,
        industry=industry,
        funding_goal=funding_goal
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
    

@router.delete("/startup/{email}")
def delete_startup(email: str):
    """
    Delete a startup by email
    """
    del_startUps = StartUps.delete().where(StartUps.email == email).execute()
    if del_startUps is None:
        return {"status_code": 404, "description": "Startup not found"}
    return {"status_code": 200, "description": "Startup successfully deleted"}

def get_all_users():
    return list(UserReg.select().offset(0).limit(100))

class InvestorsModel(BaseModel):
    id:int
    fname: str
    lname:str
    venture_name:str
    contact: str
    email: str
    investor_type: int

    class Config:
        orm_mode = True


@router.post("/investors/create", response_model=InvestorsModel)
async def create(fname:str, lname:str, venture_name: str,  contact: str, email: str, investor_type: int):
    """
    Add a new Investor to DB
    """
    investor_object = Investors(
        fname=fname,
        lname=lname,
        venture_name=venture_name,
        contact=contact,
        email=email,
        investor_type=investor_type
)
    investor_object.save()
    return investor_object

@router.get("/investors/get", response_model=List[InvestorsModel])
def get_all_investors():
    """
    Get list of all Investors
    """
    return list(Investors.select().offset(0).limit(100))


@router.get("/investors/view/{email}", response_model=InvestorsModel)
def get_investor(email: str):
    """
    Get a investor details by email
    """
    return Investors.filter(Investors.email == email).first()

@router.delete("/investors/{email}")
def delete_investors(email: str):
    """
    Delete a investor by email
    """
    del_investors = Investors.delete().where(Investors.email == email).execute()
    if del_investors is None:
        return {"status_code": 404, "description": "Investor not found"}
    return {"status_code": 200, "description": "Investor successfully deleted"}
	

@router.post("/login")
async def user_login(form_data: OAuth2PasswordRequestForm = Depends()):
    access_token = ""
    data = {}
    try:
        users_db = UserReg.filter(UserReg.email == form_data.username).first()
        #print("users_data: ", users_db.email, " form_data: ", form_data.username, " password: ", form_data.password)
        
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
        
        data = {"access_token": access_token, "token_type": "bearer", "email": user.email}
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

