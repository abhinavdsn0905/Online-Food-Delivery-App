from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import schemas, models, auth
from ..database import get_db

router = APIRouter(prefix="/order", tags=["Orders"])

@router.post("/create", response_model=schemas.APIResponse[schemas.OrderResponse])
def create_order(order: schemas.OrderCreate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    try:
        new_order = models.Order(
            user_id=current_user.id,
            total_amount=order.total_amount,
            status="Preparing",
            payment_status=order.payment_status
        )
        db.add(new_order)
        db.commit()
        db.refresh(new_order)

        for item in order.items:
            db_item = models.OrderItem(
                order_id=new_order.id,
                food_item_id=item.food_item_id,
                quantity=item.quantity,
                price=item.price
            )
            db.add(db_item)
        
        # Clear user's cart
        db.query(models.CartItem).filter(models.CartItem.user_id == current_user.id).delete()
        db.commit()

        # Refresh order to get the nested items
        db.refresh(new_order)
        return {"success": True, "message": "Order created successfully", "data": new_order}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("s", response_model=schemas.APIResponse[List[schemas.OrderResponse]])
def get_orders(db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    try:
        orders = db.query(models.Order).filter(models.Order.user_id == current_user.id).order_by(models.Order.created_at.desc()).all()
        return {"success": True, "message": "Orders fetched successfully", "data": orders}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{id}", response_model=schemas.APIResponse[schemas.OrderResponse])
def get_order(id: int, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    try:
        order = db.query(models.Order).filter(models.Order.id == id, models.Order.user_id == current_user.id).first()
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        return {"success": True, "message": "Order fetched successfully", "data": order}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
