from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel
from typing import Annotated
from models import setup
from database.settings import engine, SessionLocal
from sqlalchemy.orm import Session

app = FastAPI()
setup.Base.metadata.create_all(bind=engine)

class UserModel(BaseModel):
    fullName: str
    email: str
    username: str
    password: str
    
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
db_dependencies = Annotated[Session, Depends(get_db)]

@app.get('/home')
def home():
    return "Hello :)"

@app.post('/users/', status_code=status.HTTP_201_CREATED)
async def create_user(user: UserModel, db: db_dependencies):
    db_user = setup.User(**user.model_dump())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"message": "User added successfully :)", "data": db_user}