from fastapi import FastAPI
from models import setup
from views.users import usersrouter
from database.settings import engine

app = FastAPI()
app.include_router(usersrouter)

setup.Base.metadata.create_all(bind=engine)