from pydantic import BaseModel
from enum import Enum

class PaymentMethod(str, Enum):
    CREDIT_CARD = "Credit Card"
    ESEWA = "eSewa"
    KHALTI = "Khalti"
    
class Payment(BaseModel):
    product: int
    cost: float
    quantity: int
    fullname: str
    email_address: str
    shipping_address: str
    city: str
    postal_code: int
    payment_method: PaymentMethod
    