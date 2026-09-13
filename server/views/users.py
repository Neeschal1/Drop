from utils.hashPassword import hash_password, comparePassword
from fastapi import status
from database.settings import Base
from models.setup import User, UserModel
from ..main import app, db_dependencies

@app.post('/users/', status_code=status.HTTP_201_CREATED)
async def create_user(user: UserModel, db: db_dependencies):
    db_user = User(**user.model_dump())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"message": "User added successfully :)", "data": db_user}