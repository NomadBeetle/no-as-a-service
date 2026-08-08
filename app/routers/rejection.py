from pathlib import Path
from typing import List
from fastapi import APIRouter, HTTPException, Request
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.models.reason import RejectionResponse, ErrorResponse
from app.services.rejection_service import RejectionService

# Set up IP rate limiter
limiter = Limiter(key_func=get_remote_address)

router = APIRouter(prefix="/no", tags=["Rejections"])

# Resolve path to data/reasons.json at root level
DATA_FILE = Path(__file__).resolve().parent.parent.parent / "data" / "reasons.json"
service = RejectionService(DATA_FILE)

@router.get(
    "",
    response_model=RejectionResponse,
    responses={404: {"model": ErrorResponse}}
)
@limiter.limit("120/minute")
def get_rejection(request: Request):
    reason_str = service.get_random_reason()
    if not reason_str:
        raise HTTPException(
            status_code=404,
            detail="No rejection reasons found."
        )
    return {"reason": reason_str}