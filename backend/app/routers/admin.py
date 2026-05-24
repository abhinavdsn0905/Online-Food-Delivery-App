import os
import shutil
import uuid
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from .. import schemas, models, auth
from ..database import get_db

router = APIRouter(prefix="/admin", tags=["Admin"])

# Admin check dependency
def check_admin(current_user: models.User = Depends(auth.get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    return current_user

@router.get("/users", response_model=schemas.APIResponse[List[schemas.UserResponse]])
def get_all_users(db: Session = Depends(get_db), admin: models.User = Depends(check_admin)):
    try:
        users = db.query(models.User).order_by(models.User.created_at.desc()).all()
        return {"success": True, "message": "All users fetched successfully", "data": users}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/restaurants/add", response_model=schemas.APIResponse[schemas.RestaurantResponse])
def add_restaurant(restaurant: schemas.RestaurantCreateWithItems, db: Session = Depends(get_db), admin: models.User = Depends(check_admin)):
    try:
        rest_dict = restaurant.model_dump(exclude={"items"})
        new_restaurant = models.Restaurant(**rest_dict)
        db.add(new_restaurant)
        db.commit()
        db.refresh(new_restaurant)
        
        for item in restaurant.items:
            food_item = models.FoodItem(**item.model_dump(), restaurant_id=new_restaurant.id)
            db.add(food_item)
            
        db.commit()
        return {"success": True, "message": "Restaurant and items added successfully", "data": new_restaurant}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/restaurants/{id}", response_model=schemas.APIResponse[schemas.RestaurantResponse])
def update_restaurant(id: int, rest_update: schemas.RestaurantUpdate, db: Session = Depends(get_db), admin: models.User = Depends(check_admin)):
    try:
        restaurant = db.query(models.Restaurant).filter(models.Restaurant.id == id).first()
        if not restaurant:
            raise HTTPException(status_code=404, detail="Restaurant not found")
        
        update_data = rest_update.model_dump(exclude_unset=True, exclude={"items"})
        for key, value in update_data.items():
            setattr(restaurant, key, value)
            
        if rest_update.items is not None:
            db.query(models.FoodItem).filter(models.FoodItem.restaurant_id == id).delete()
            for item in rest_update.items:
                food_item = models.FoodItem(**item.model_dump(), restaurant_id=id)
                db.add(food_item)
            
        db.commit()
        db.refresh(restaurant)
        return {"success": True, "message": "Restaurant updated successfully", "data": restaurant}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/upload")
def upload_file(file: UploadFile = File(...), admin: models.User = Depends(check_admin)):
    try:
        os.makedirs("static/uploads", exist_ok=True)
        ext = file.filename.split(".")[-1]
        filename = f"{uuid.uuid4()}.{ext}"
        file_path = f"static/uploads/{filename}"
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        return {"success": True, "message": "File uploaded", "data": {"url": f"http://127.0.0.1:8000/{file_path}"}}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/users/{id}", response_model=schemas.APIResponse)
def delete_user(id: int, db: Session = Depends(get_db), admin: models.User = Depends(check_admin)):
    try:
        user = db.query(models.User).filter(models.User.id == id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        if user.role == 'admin':
            raise HTTPException(status_code=400, detail="Cannot delete an admin")
        
        db.delete(user)
        db.commit()
        return {"success": True, "message": "User deleted successfully", "data": None}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class OrderStatusUpdate(BaseModel):
    status: str

@router.put("/orders/{id}/status", response_model=schemas.APIResponse)
def update_order_status(id: int, status_update: OrderStatusUpdate, db: Session = Depends(get_db), admin: models.User = Depends(check_admin)):
    try:
        order = db.query(models.Order).filter(models.Order.id == id).first()
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        
        order.status = status_update.status
        db.commit()
        return {"success": True, "message": "Order status updated", "data": None}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/orders", response_model=schemas.APIResponse[List[schemas.OrderResponse]])
def get_all_orders(db: Session = Depends(get_db), admin: models.User = Depends(check_admin)):
    try:
        orders = db.query(models.Order).order_by(models.Order.created_at.desc()).all()
        return {"success": True, "message": "All orders fetched successfully", "data": orders}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/food/add", response_model=schemas.APIResponse[schemas.FoodItemResponse])
def add_food_item(item: schemas.FoodItemBase, db: Session = Depends(get_db), admin: models.User = Depends(check_admin)):
    try:
        new_item = models.FoodItem(**item.model_dump())
        db.add(new_item)
        db.commit()
        db.refresh(new_item)
        return {"success": True, "message": "Food item added successfully", "data": new_item}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
