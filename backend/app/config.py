from pydantic_settings import BaseSettings
from pydantic import ConfigDict

class Settings(BaseSettings):
    model_config = ConfigDict(env_file=".env")

    APP_NAME: str = "No-as-a-Service (NaaS)"
    APP_VERSION: str = "1.0.0"
    RATE_LIMIT: str = "60/minute"
    GEMINI_API_KEY: str = ""

settings = Settings()