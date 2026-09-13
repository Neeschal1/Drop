from fastapi import FastAPI
from models import setup
from views.users import usersrouter
from fastapi.middleware.cors import CORSMiddleware
from database.settings import engine

app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

app.include_router(usersrouter)

setup.Base.metadata.create_all(bind=engine)