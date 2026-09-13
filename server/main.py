from fastapi import FastAPI, HTTPException, Depends, status
from typing import Annotated
from models import setup
from database.settings import engine, SessionLocal
from sqlalchemy.orm import Session

app = FastAPI()

setup.Base.metadata.create_all(bind=engine)
    
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
db_dependencies = Annotated[Session, Depends(get_db)]