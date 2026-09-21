from datetime import datetime

from pydantic import BaseModel


class SpillCreate(BaseModel):
    spill_id: str
    timestamp: datetime

    latitude: float
    longitude: float

    area_km2: float
    confidence: float

    status: str = "detected"


class SpillResponse(SpillCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True