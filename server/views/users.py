from utils.hashPassword import hash_password, comparePassword
from fastapi import status, APIRouter
from database.settings import Base
from models.setup import User
from schemas.users import UserModel, UserUpdateModel
from database.dependencies import db_dependencies

usersrouter = APIRouter()

# Create a new user
@usersrouter.post('/users/post/', status_code=status.HTTP_201_CREATED)
async def create_user(user: UserModel, db: db_dependencies):
    try:
        db_user = User(**user.model_dump())
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return {"message": "User added successfully :)", "data": db_user}
    except Exception as e:
            return {"message": "Exception occured!", "detail": e}


# List all the users detail
@usersrouter.get('/users/get/', status_code=status.HTTP_200_OK)
async def list_user(db: db_dependencies):
    try:
        db_user = db.query(User).all()
        if db_user is None:
            return {"message": "No users available!"}
        return {"message": "Users list successfully listed :)", "data": db_user}
    except Exception as e:
        return {"message": "Exception occured!", "detail": str(e)}


# Fetch specific users detail
@usersrouter.get('/users/fetch/{userid}', status_code=status.HTTP_202_ACCEPTED)
async def detch_user(userid: int, db: db_dependencies):
    try:
        db_user = db.query(User).filter(User.id == userid).first()
        if db_user is None:
            return {"message": "User not found!"}
        return {"message": "Users fetched successfully :)", "data": db_user}
    except Exception as e:
        return {"message": "Exception occured!", "detail": str(e)}


# Update users data based on users id
@usersrouter.put('/users/update/{usersid}', status_code=status.HTTP_201_CREATED)
async def update_user(userid: int, db: db_dependencies, user:UserUpdateModel):
    try:
        db_user = db.query(User).filter(User.id == userid).first()
        if db_user is None:
            return {"message": "User not found!"}
        db_user.fullName = user.fullName
        db_user.email = user.email
        db_user.username = user.username
        db_user.password = user.password
        
        db.commit()
        db.refresh(db_user)
        
        return {"message": "User's data updated successfully :)", "data": db_user}
    except Exception as e:
        return {"message": "Exception occured!", "detail": str(e)}
    

# Delete users data based on users id
@usersrouter.delete('/users/delete/{userid}', status_code=status.HTTP_200_OK)
async def delete_user(userid: int, db: db_dependencies):
    try:
        db_user = db.query(User).filter(User.id == userid).first()
        if db_user is None:
            return {"message": "User not found!"}
        db.delete(db_user)
        db.commit()
        return {"message": "Users data successfully deleted :)"}
    except Exception as e:
        db.rollback()
        return {"message": "Exception occured!", "detail": str(e)}