from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from app.routers import rejection
from app.routers.rejection import limiter

app = FastAPI(
    title="No-as-a-Service (NaaS)",
    description="A microservice for automated rejection reasons.",
    version="1.0.0"
)

# Register rate limiter state and exception handler
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Enable CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register endpoints
app.include_router(rejection.router)

@app.get("/")
def root():
    return {"message": "Welcome to No-as-a-Service! Hit /no or visit /docs for API specs."}