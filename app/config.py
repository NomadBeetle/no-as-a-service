import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "No-as-a-Service (NaaS)"
    APP_VERSION: str = "1.0.0"
    RATE_LIMIT: str = "120/minute"
    
    class Config:
        env_file = ".env"

settings = Settings()