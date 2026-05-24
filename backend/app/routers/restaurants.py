from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import schemas, models
from ..database import get_db

router = APIRouter(tags=["Restaurants"])

@router.get("/restaurants", response_model=schemas.APIResponse[List[schemas.RestaurantResponse]])
def get_restaurants(db: Session = Depends(get_db)):
    try:
        restaurants = db.query(models.Restaurant).all()
        return {"success": True, "message": "Restaurants fetched successfully", "data": restaurants}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/restaurant/{id}", response_model=schemas.APIResponse[schemas.RestaurantResponse])
def get_restaurant(id: int, db: Session = Depends(get_db)):
    try:
        restaurant = db.query(models.Restaurant).filter(models.Restaurant.id == id).first()
        if not restaurant:
            raise HTTPException(status_code=404, detail="Restaurant not found")
        return {"success": True, "message": "Restaurant fetched successfully", "data": restaurant}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/menu/{restaurant_id}", response_model=schemas.APIResponse[List[schemas.FoodItemResponse]])
def get_menu(restaurant_id: int, db: Session = Depends(get_db)):
    try:
        items = db.query(models.FoodItem).filter(models.FoodItem.restaurant_id == restaurant_id).all()
        return {"success": True, "message": "Menu fetched successfully", "data": items}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
