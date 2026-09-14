from schemas.review import Review as ReviewSchema
from models.setup import Review as ReviewDB
from fastapi import APIRouter, status
from database.dependencies import db_dependencies

reviewrouter = APIRouter()

@reviewrouter.post('/review/post/', status_code=status.HTTP_201_CREATED, tags=["Review"])
async def create_review(review: ReviewSchema, db: db_dependencies):
    try:
        rvw = review.model_dump()
        customer_data = ReviewDB(**rvw)
        db.add(customer_data)
        db.commit()
        db.refresh(customer_data)
        return {"message": "New customer review created!", "data": customer_data}
    except Exception as e:
        db.rollback()
        return {"message": "Exception occured!", "detail": str(e)}