from sqlalchemy import Boolean, Column, Integer, String
from database.settings import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    fullName = Column(String(50))
    email = Column(String(50), unique=True)
    username = Column(String(50), unique=True)
    password = Column(String)
    