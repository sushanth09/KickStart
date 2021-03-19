from fastapi import APIRouter, Request, status, HTTPException
from .models import StartUps
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


@router.post("/", response_model=StartUpModel)
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


@router.get("/", response_model=List[StartUpModel])
def get_all_startups():
    """
    Get list of all Startups
    """
    return list(StartUps.select().offset(0).limit(100))