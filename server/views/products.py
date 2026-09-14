from fastapi import status, APIRouter
from fastapi.responses import JSONResponse
from schemas.products import Product as ProductSchema
from models.setup import Product as ProductDB
from database.dependencies import db_dependencies

productsrouter = APIRouter(prefix='/products', tags=["Products"])

# Create a new product
@productsrouter.post('/post/', status_code=status.HTTP_201_CREATED)
async def add_new_product(prod: ProductSchema, db: db_dependencies):
    try:
        prod_data = prod.model_dump()
        existing_product_name = db.query(ProductDB).filter(prod.itemname == ProductDB.itemname).exists()
        if existing_product_name == True:
            return JSONResponse(status_code=status.HTTP_409_CONFLICT, content={
                "message": "Product name with the entered title already exists! Please select a new name for this product."
            })
            
        client_data = ProductDB(**prod_data)
        db.add(client_data)
        db.commit()
        db.refresh(client_data)
        return {"message": "Data created successfully :)", "data": client_data}
        
    except Exception as e:
        db.rollback()
        return {"message": "Exception occured!", "detail": str(e)}
    

# List all products
@productsrouter.get('/list-all-products/', status_code=status.HTTP_200_OK)
async def list_all_products(db: db_dependencies):
    try:
        db_products = db.query(ProductDB).all()
        if db_products is None:
            return {"message": "No products available!"}
        return {"message": "Products list successfully listed :)", "data": db_products}
    except Exception as e:
        db.rollback()
        return {"message": "Exception occured!", "detail": str(e)}
  