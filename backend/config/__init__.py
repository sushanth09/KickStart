from peewee import *

host = 'localhost'
user = 'root'
password = ''
db_name = 'kickStart'

conn = MySQLDatabase(
    db_name, user=user,
    password=password,  
    host=host
)
