import sys
import os

# Add the backend directory to sys.path so 'app' can be imported
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import SessionLocal, engine, Base
from app.models import User, Restaurant, FoodItem
from app.auth import get_password_hash

def seed_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()

    # Admin User
    admin = User(
        name="Admin Account", 
        email="admin@foodiehub.com", 
        password_hash=get_password_hash("admin123"), 
        phone="1234567890", 
        address="Admin Headquarters", 
        role="admin"
    )
    
    # Standard User
    user = User(
        name="Test User", 
        email="testuser@gmail.com", 
        password_hash=get_password_hash("password123"), 
        phone="0987654321", 
        address="123 Main St", 
        role="user"
    )
    
    db.add(admin)
    db.add(user)

    # Restaurants
    r1 = Restaurant(name="KFC", cuisine="Fast Food, American", image="https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=500&q=80", location="Global", delivery_time="20-30 min")
    r2 = Restaurant(name="Domino's Pizza", cuisine="Pizzas, Italian", image="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80", location="Global", delivery_time="30 min")
    r3 = Restaurant(name="McDonald's", cuisine="Burgers, Fast Food", image="https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80", location="Global", delivery_time="20-30 min")
    r4 = Restaurant(name="Paradise Biryani", cuisine="Biryani, North Indian", image="https://images.unsplash.com/photo-1589302168068-964664d93cb0?w=500&q=80", location="Hyderabad, India", delivery_time="40-50 min")
    r5 = Restaurant(name="Haldiram's", cuisine="North Indian, Snacks, Sweets", image="https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80", location="New Delhi, India", delivery_time="30-40 min")
    r6 = Restaurant(name="Saravana Bhavan", cuisine="South Indian, Vegetarian", image="https://images.unsplash.com/photo-1610192244261-3f3394c50813?w=500&q=80", location="Chennai, India", delivery_time="30-45 min")
    db.add_all([r1, r2, r3, r4, r5, r6])
    db.commit()

    # KFC Items
    items = [
        FoodItem(restaurant_id=r1.id, name="Zinger Burger", description="Signature crispy chicken fillet burger", price=149.00, category="Burgers", image="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80"),
        FoodItem(restaurant_id=r1.id, name="Hot & Crispy Chicken", description="Spicy fried chicken bucket", price=499.00, category="Chicken", image="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&q=80"),
        FoodItem(restaurant_id=r1.id, name="Chicken Popcorn", description="Bite-sized crispy chicken pieces", price=129.00, category="Snacks", image="https://images.unsplash.com/photo-1562967914-608f82629710?w=500&q=80"),

        # Domino's Items
        FoodItem(restaurant_id=r2.id, name="Margherita Pizza", description="Classic cheese and tomato pizza", price=299.00, category="Pizzas", image="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80"),
        FoodItem(restaurant_id=r2.id, name="Peppy Paneer", description="Paneer, crisp capsicum and spicy red pepper", price=399.00, category="Pizzas", image="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&q=80"),
        FoodItem(restaurant_id=r2.id, name="Choco Lava Cake", description="Chocolate cake with molten chocolate center", price=99.00, category="Desserts", image="https://images.unsplash.com/photo-1563805042-7684c8a9e9ce?w=500&q=80"),

        # McDonald's Items
        FoodItem(restaurant_id=r3.id, name="Big Mac", description="Double beef patty burger with special sauce", price=249.00, category="Burgers", image="https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&q=80"),
        FoodItem(restaurant_id=r3.id, name="French Fries", description="World famous crispy potato fries", price=109.00, category="Sides", image="https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&q=80"),
        FoodItem(restaurant_id=r3.id, name="McChicken", description="Crispy chicken patty with lettuce and mayo", price=179.00, category="Burgers", image="https://images.unsplash.com/photo-1615486171448-4fdcb313bc96?w=500&q=80"),

        # Paradise Biryani
        FoodItem(restaurant_id=r4.id, name="Chicken Dum Biryani", description="Authentic Hyderabadi chicken biryani", price=349.00, category="Biryani", image="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&q=80"),
        FoodItem(restaurant_id=r4.id, name="Mutton Biryani", description="Tender mutton pieces cooked with aromatic rice", price=449.00, category="Biryani", image="https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=500&q=80"),
        FoodItem(restaurant_id=r4.id, name="Double Ka Meetha", description="Traditional bread pudding dessert", price=149.00, category="Desserts", image="https://images.unsplash.com/photo-1605151551061-31be81eebf08?w=500&q=80"),

        # Haldiram's
        FoodItem(restaurant_id=r5.id, name="Chole Bhature", description="Spicy chickpea curry with fried bread", price=199.00, category="North Indian", image="https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=500&q=80"),
        FoodItem(restaurant_id=r5.id, name="Raj Kachori", description="Crispy kachori filled with potatoes, yogurt and chutneys", price=149.00, category="Chaat", image="https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80"),
        FoodItem(restaurant_id=r5.id, name="Rasgulla", description="Spongy cottage cheese balls in sugar syrup", price=99.00, category="Sweets", image="https://images.unsplash.com/photo-1582716401301-b2407dc7563d?w=500&q=80"),

        # Saravana Bhavan
        FoodItem(restaurant_id=r6.id, name="Masala Dosa", description="Crispy rice crepe filled with spiced potato", price=129.00, category="South Indian", image="https://images.unsplash.com/photo-1589301760014-d929f39ce9b0?w=500&q=80"),
        FoodItem(restaurant_id=r6.id, name="Idli Sambar", description="Steamed rice cakes served with lentil soup", price=89.00, category="South Indian", image="https://images.unsplash.com/photo-1589301773112-0071376269de?w=500&q=80"),
        FoodItem(restaurant_id=r6.id, name="Filter Coffee", description="Authentic South Indian filter coffee", price=59.00, category="Beverages", image="https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80")
    ]
    
    db.add_all(items)
    db.commit()
    
    print("Database seeded successfully with new Indian and Global chain restaurants!")
    db.close()

if __name__ == "__main__":
    seed_db()
