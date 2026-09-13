from pydantic import BaseModel

class UserModel(BaseModel):
    id: int
    fullName: str
    email: str
    username: str
    password: str