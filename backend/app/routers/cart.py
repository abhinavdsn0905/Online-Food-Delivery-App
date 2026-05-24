from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import schemas, models, auth
from ..database import get_db

router = APIRouter(prefix="/cart", tags=["Cart"])

@router.get("/", response_model=schemas.APIResponse[List[schemas.CartItemResponse]])
def get_cart(db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    try:
        items = db.query(models.CartItem).filter(models.CartItem.user_id == current_user.id).all()
        return {"success": True, "message": "Cart items fetched", "data": items}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/add", response_model=schemas.APIResponse[schemas.CartItemResponse])
def add_to_cart(item: schemas.CartItemCreate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    try:
        existing = db.query(models.CartItem).filter(
            models.CartItem.user_id == current_user.id,
            models.CartItem.food_item_id == item.food_item_id
        ).first()

        if existing:
            existing.quantity += item.quantity
            db.commit()
            db.refresh(existing)
            return {"success": True, "message": "Cart item updated", "data": existing}

        new_item = models.CartItem(user_id=current_user.id, food_item_id=item.food_item_id, quantity=item.quantity)
        db.add(new_item)
        db.commit()
        db.refresh(new_item)
        return {"success": True, "message": "Item added to cart", "data": new_item}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/update/{item_id}", response_model=schemas.APIResponse[schemas.CartItemResponse])
def update_cart(item_id: int, item: schemas.CartItemUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    try:
        db_item = db.query(models.CartItem).filter(models.CartItem.id == item_id, models.CartItem.user_id == current_user.id).first()
        if not db_item:
            raise HTTPException(status_code=404, detail="Item not found in cart")
        
        db_item.quantity = item.quantity
        db.commit()
        db.refresh(db_item)
        return {"success": True, "message": "Cart item updated", "data": db_item}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/remove/{item_id}")
def remove_from_cart(item_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    try:
        item = db.query(models.CartItem).filter(models.CartItem.id == item_id, models.CartItem.user_id == current_user.id).first()
        if not item:
            raise HTTPException(status_code=404, detail="Item not found")
        
        db.delete(item)
        db.commit()
        return {"success": True, "message": "Item removed from cart", "data": {}}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
