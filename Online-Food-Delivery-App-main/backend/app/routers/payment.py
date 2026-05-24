from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import random
import uuid
from .. import schemas, models, auth
from ..database import get_db
from typing import Dict, Any

router = APIRouter(prefix="/payment", tags=["Payment"])

@router.post("/process", response_model=schemas.APIResponse[Dict[str, Any]])
def process_payment(payment: schemas.PaymentProcess, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    try:
        order = db.query(models.Order).filter(models.Order.id == payment.order_id, models.Order.user_id == current_user.id).first()
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")

        # Simulate random success/failure
        success = random.random() > 0.1 # 90% success
        
        status = "Paid" if success else "Failed"
        transaction_id = f"TXN{uuid.uuid4().hex[:10].upper()}" if success else None

        if success:
            order.payment_status = "Paid"
            order.status = "Preparing"
        else:
            order.payment_status = "Failed"

        new_payment = models.Payment(
            order_id=payment.order_id,
            payment_method=payment.method,
            payment_status=status,
            transaction_id=transaction_id
        )
        db.add(new_payment)
        db.commit()

        if not success:
            raise HTTPException(status_code=400, detail="Payment Failed")

        return {"success": True, "message": "Payment Successful", "data": {"transaction_id": transaction_id, "order_id": order.id}}
    except HTTPException as e:
        raise e
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))





