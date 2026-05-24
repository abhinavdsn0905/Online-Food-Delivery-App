from typing import TypeVar, Generic, Optional, Any
from pydantic import BaseModel, EmailStr
from typing import List
from datetime import datetime

T = TypeVar('T')

class APIResponse(BaseModel, Generic[T]):
    success: bool
    message: str
    data: Optional[T] = None

# USER SCHEMAS
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    password: str
    address: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    role: str

    class Config:
        from_attributes = True

class TokenData(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

class Login(BaseModel):
    email: str
    password: str

# RESTAURANT SCHEMAS
class RestaurantBase(BaseModel):
    name: str
    cuisine: str
    image: str
    location: str
    delivery_time: str

class FoodItemCreate(BaseModel):
    name: str
    description: str
    price: float
    category: str
    image: str
    availability: bool = True

class RestaurantCreateWithItems(RestaurantBase):
    items: List[FoodItemCreate] = []

class RestaurantUpdate(BaseModel):
    name: Optional[str] = None
    cuisine: Optional[str] = None
    image: Optional[str] = None
    location: Optional[str] = None
    delivery_time: Optional[str] = None
    items: Optional[List[FoodItemCreate]] = None

class RestaurantResponse(RestaurantBase):
    id: int

    class Config:
        from_attributes = True

# FOOD ITEM SCHEMAS
class FoodItemBase(BaseModel):
    name: str
    description: str
    price: float
    category: str
    image: str
    availability: bool
    restaurant_id: int

class FoodItemResponse(FoodItemBase):
    id: int

    class Config:
        from_attributes = True

# CART SCHEMAS
class CartItemCreate(BaseModel):
    food_item_id: int
    quantity: int = 1

class CartItemUpdate(BaseModel):
    quantity: int

class CartItemResponse(BaseModel):
    id: int
    food_item_id: int
    quantity: int
    
    # Optional field to return food details easily to frontend
    food_item: Optional[FoodItemResponse] = None

    class Config:
        from_attributes = True

# ORDER SCHEMAS
class OrderItemCreate(BaseModel):
    food_item_id: int
    quantity: int
    price: float

class OrderCreate(BaseModel):
    total_amount: float
    payment_status: str
    items: List[OrderItemCreate]

class OrderItemResponse(BaseModel):
    id: int
    food_item_id: int
    quantity: int
    price: float
    food_item: Optional[FoodItemResponse] = None

    class Config:
        from_attributes = True

class OrderResponse(BaseModel):
    id: int
    user_id: int
    total_amount: float
    status: str
    payment_status: str
    created_at: datetime
    items: List[OrderItemResponse] = []

    class Config:
        from_attributes = True

# PAYMENT SCHEMAS
class PaymentProcess(BaseModel):
    order_id: int
    method: str # card, upi, cod
