from database.dependencies import db_dependencies
from models.setup import Payments as PaymentsDB
from schemas.payments import Payment as PaymentSchema
from fastapi import APIRouter, status, Depends
from utils.auth import get_current_user
from env_config import Config
import stripe

stripe.api_key = Config.STRIPE_SECRET_KEY

paymentsrouter = APIRouter(prefix='/payment', tags=["Payments"])

@paymentsrouter.post('/post/', status_code=status.HTTP_201_CREATED)
async def create_payment(db: db_dependencies, pymnt: PaymentSchema, current_user: str = Depends(get_current_user)):
    try:
        pymt_dump = pymnt.model_dump()
        priceofproduct = pymnt.cost
        productname = pymnt.product
        try:
            lineitem = [
                {
                    "quantity": pymnt.quantity,
                    "price_data": {
                        "currency": "usd",
                        "unit_amount": int(priceofproduct * 152),
                        "product_data": {
                            "name": productname,
                        },
                    },
                }
            ]
            checkout_session = stripe.checkout.Session.create(
                line_items=lineitem,
                mode='payment',
                success_url="https://dropp-ten.vercel.app/payment/payment-successful",
                cancel_url="https://dropp-ten.vercel.app/payment/payment-failed"
            )
            customer_payment = PaymentsDB(**pymt_dump, user_id=current_user)
            db.add(customer_payment)
            db.commit()
            db.refresh(customer_payment)
            return {"message": "payment created!", "buyers_detail": pymt_dump, "url": checkout_session.url}
        except Exception as e:
            return {"Message":"Payment Error Occured!", "Issue":str(e)}
    except Exception as e:
        db.rollback()
        return {"message": "Exception occured!", "detail": str(e)}
