from utils.hashPassword import hash_password, comparePassword
from utils.auth import create_access_token
from fastapi import status, APIRouter
from fastapi.responses import JSONResponse
from database.settings import Base
from models.setup import User
from schemas.auth import UserModel
from database.dependencies import db_dependencies

usersrouter = APIRouter()

# Create a new user
@usersrouter.post('/users/post/', status_code=status.HTTP_201_CREATED)
async def create_user(user: UserModel, db: db_dependencies):
    try:
        user_data = user.model_dump()
        existing_username = db.query(User).filter(User.username == user.username).first()
        existing_email = db.query(User).filter(User.email == user.email).first()
        
        if existing_email:
            return JSONResponse(
                status_code=status.HTTP_409_CONFLICT, 
                content={
                    "message": "Email already registered"
                }
            )

        if existing_username:
            return JSONResponse(
                status_code=status.HTTP_409_CONFLICT,
                content={
                    "message": "Username already taken"
                }
            )
        
        hashed_password = hash_password(user_data['password'])
        db_user = User(
            fullName = user.fullName,
            username = user.username,
            email = user.email,
            password = hashed_password
        )
        
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        
        access_token = create_access_token({
            "sub": db_user.id
        })
        
        return {
            "message": "User added successfully :)",
            "data": {
                "fullname": db_user.fullName,
                "email": db_user.email,
                "username": db_user.username
            },
            "tokens": {
                "accessToken": access_token
            }
        }
    except Exception as e:
        db.rollback()
        print("ERROR:", e)
        return {"message": "Exception occured!", "detail": str(e)}


# List all the users detail
@usersrouter.get('/users/get/', status_code=status.HTTP_200_OK)
async def list_user(db: db_dependencies):
    try:
        db_user = db.query(User).all()
        if db_user is None:
            return {"message": "No users available!"}
        return {"message": "Users list successfully listed :)", "data": db_user}
    except Exception as e:
        db.rollback()
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
        db.rollback()
        return {"message": "Exception occured!", "detail": str(e)}


# Update users data based on users id
@usersrouter.put('/users/update/{usersid}', status_code=status.HTTP_201_CREATED)
async def update_user(userid: int, db: db_dependencies, user:UserModel):
    try:
        db_user = db.query(User).filter(User.id == userid).first()
        if db_user is None:
            return {"message": "User not found!"}
        
        # fields updating
        db_user.fullName = user.fullName
        db_user.email = user.email
        db_user.username = user.username
        db_user.password = user.password
        
        # saving changes
        db.commit()
        db.refresh(db_user)
        return {"message": "User's data updated successfully :)", "data": db_user}
    except Exception as e:
        db.rollback()
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