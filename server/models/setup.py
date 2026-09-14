from sqlalchemy import Boolean, Column, Integer, String, JSON, ForeignKey, TIMESTAMP
from database.settings import Base
from pydantic import BaseModel

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    fullName = Column(String(50))
    email = Column(String(50), unique=True)
    username = Column(String(50), unique=True)
    password = Column(String)


class Product(Base):
    __tablename__ = "products"
    
    id = Column(Integer, primary_key=True, index=True)
    itemname = Column(String(100))
    description = Column(String(100))
    availability = Column(String(100))
    gender = Column(String(100))
    images = Column(JSON)
    price = Column(String(100))
    ratings = Column(Integer)
    available_sizes = Column(JSON)
    details_and_care = Column(JSON)
    shipping_and_return = Column(JSON)
    
