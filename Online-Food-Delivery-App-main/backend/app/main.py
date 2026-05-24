import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from starlette.exceptions import HTTPException as StarletteHTTPException
from .database import engine, Base
from .routers import auth, restaurants, cart, orders, payment, admin

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="FoodieHub API")

os.makedirs("static/uploads", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Configure CORS
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global Exception Handlers
@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"success": False, "message": str(exc.detail)}
    )

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    # Log exception here in production
    return JSONResponse(
        status_code=500,
        content={"success": False, "message": "Internal Server Error"}
    )

# Include Routers
app.include_router(auth.router)
app.include_router(restaurants.router)
app.include_router(cart.router)
app.include_router(orders.router)
app.include_router(payment.router)
app.include_router(admin.router)

@app.get("/")
def read_root():
    return {"success": True, "message": "Welcome to FoodieHub API", "data": {}}
