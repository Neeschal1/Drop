from utils.hashPassword import hash_password, comparePassword
from fastapi import status, APIRouter
from database.settings import Base
from models.setup import User
from schemas.users import UserModel
from database.dependencies import db_dependencies

usersrouter = APIRouter()

@usersrouter.post('/users/post/', status_code=status.HTTP_201_CREATED)
async def create_user(user: UserModel, db: db_dependencies):
    db_user = User(**user.model_dump())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"message": "User added successfully :)", "data": db_user}


@usersrouter.get('/users/get/', status_code=status.HTTP_200_OK)
async def fetch_user(db: db_dependencies):
    db_user = db.query(User).all()
    return {"message": "Users list successfully listed :)", "data": db_user}


@usersrouter.get('/users/fetch/{userid}', status_code=status.HTTP_202_ACCEPTED)
async def update_user(userid: int, db: db_dependencies):
    db_user = db.query(User).filter(User.id == userid).first()
    return {"message": "Users fetched successfully :)", "data": db_user}