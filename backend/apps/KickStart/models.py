from typing import List, Optional
from pydantic import BaseModel, Field
from typing import Optional
from config import conn
from peewee import *
from pydantic import BaseModel

class BaseModel(Model):
    class Meta:
        database = conn




class StartUps(BaseModel):
    id = PrimaryKeyField(null=False)
    company_name = CharField(max_length=40)
    email = CharField(max_length=40)
    contact = CharField(max_length=40)
    product_name = CharField(max_length=20)
    problem_statement = CharField(max_length=100)
    industry = CharField(max_length=20)  # Category
    funding_goal = IntegerField(null=False)
    current_funds = IntegerField(default=0)

    class Meta:
        db_table = 'startups'
