from pydantic import BaseModel, Field

class RejectionReason(BaseModel):
    """
    Internal model for full entries (if used)
    """
    id: str = Field(..., examples=["dev_01"])
    category: str = Field(..., examples=["dev"])
    reason: str = Field(..., examples=["I'm currently blocked by a race condition in my coffee maker."])
    severity: str = Field(..., examples=["mild"])

class RejectionResponse(BaseModel):
    """
    Clean external API response payload returned by GET /no
    """
    reason: str = Field(..., examples=["In a different season of life, I might say yes..."])

class ErrorResponse(BaseModel):
    """
    Standard error payload format
    """
    detail: str = Field(..., examples=["No rejection reasons found."])