from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    phone = Column(String)
    address = Column(String)
    role = Column(String, default="user") # "user" or "admin"
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Restaurant(Base):
    __tablename__ = "restaurants"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    cuisine = Column(String)
    image = Column(String)
    location = Column(String)
    delivery_time = Column(String)
    
    items = relationship("FoodItem", back_populates="restaurant")

class FoodItem(Base):
    __tablename__ = "food_items"
    id = Column(Integer, primary_key=True, index=True)
    restaurant_id = Column(Integer, ForeignKey("restaurants.id"))
    name = Column(String, index=True)
    description = Column(String)
    price = Column(Float)
    category = Column(String)
    image = Column(String)
    availability = Column(Boolean, default=True)

    restaurant = relationship("Restaurant", back_populates="items")
    cart_items = relationship("CartItem", back_populates="food_item")
    order_items = relationship("OrderItem", back_populates="food_item")

class CartItem(Base):
    __tablename__ = "cart"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    food_item_id = Column(Integer, ForeignKey("food_items.id"))
    quantity = Column(Integer, default=1)

    food_item = relationship("FoodItem", back_populates="cart_items")

class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    total_amount = Column(Float)
    status = Column(String, default="Preparing") # Preparing, Delivered, Cancelled
    payment_status = Column(String, default="Pending")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    items = relationship("OrderItem", back_populates="order")

class OrderItem(Base):
    __tablename__ = "order_items"
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    food_item_id = Column(Integer, ForeignKey("food_items.id"))
    quantity = Column(Integer)
    price = Column(Float)

    order = relationship("Order", back_populates="items")
    food_item = relationship("FoodItem", back_populates="order_items")

class Payment(Base):
    __tablename__ = "payments"
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    payment_method = Column(String)
    payment_status = Column(String)
    transaction_id = Column(String, unique=True, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
