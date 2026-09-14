from schemas.review import Review as ReviewSchema
from models.setup import Review as ReviewDB
from fastapi import APIRouter, status
from fastapi.responses import JSONResponse
from database.dependencies import db_dependencies

reviewrouter = APIRouter()

# Create a new customer review
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


# List all customer reviews
@reviewrouter.get('/review/list-all-review/', status_code=status.HTTP_200_OK, tags=["Review"])
async def list_all_review(db: db_dependencies):
    try:
        db_review = db.query(ReviewDB).all()
        if not db_review:
            return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={
                "message": "No customer review available!"
            })
        return {"message": "Customer reviews listed successfully :)", "data": db_review}
    except Exception as e:
        db.rollback()
        return {"message": "Exception occured!", "detail": str(e)}