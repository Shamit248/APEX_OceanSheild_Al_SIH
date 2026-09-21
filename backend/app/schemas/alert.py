from datetime import datetime

from pydantic import BaseModel


class AlertCreate(BaseModel):
    spill_id: str
    type: str
    severity: str
    message: str


class AlertResponse(AlertCreate):
    id: int
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True