from fastapi import APIRouter, Request, status, HTTPException
from starlette.responses import Response
from .models import StartUps,Investors
import peewee
from pydantic import BaseModel
from typing import List

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