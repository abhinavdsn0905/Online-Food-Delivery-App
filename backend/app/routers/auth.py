from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import schemas, models, auth
from ..database import get_db

router = APIRouter(tags=["Authentication"])

@router.post("/register", response_model=schemas.APIResponse[schemas.TokenData])
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    try:
        db_user = db.query(models.User).filter(models.User.email == user.email).first()
        if db_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        hashed_password = auth.get_password_hash(user.password)
        new_user = models.User(
            name=user.name,
            email=user.email,
            password_hash=hashed_password,
            phone=user.phone,
            address=user.address
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        access_token = auth.create_access_token(data={"sub": new_user.email})
        return {"success": True, "message": "User registered successfully", "data": {"access_token": access_token, "token_type": "bearer", "user": new_user}}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/login", response_model=schemas.APIResponse[schemas.TokenData])
def login(user_credentials: schemas.Login, db: Session = Depends(get_db)):
    try:
        user = db.query(models.User).filter(models.User.email == user_credentials.email).first()
        if not user or not auth.verify_password(user_credentials.password, user.password_hash):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Credentials")
        
        access_token = auth.create_access_token(data={"sub": user.email})
        return {"success": True, "message": "Login successful", "data": {"access_token": access_token, "token_type": "bearer", "user": user}}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
