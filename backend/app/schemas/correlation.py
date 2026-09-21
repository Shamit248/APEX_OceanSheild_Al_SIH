from datetime import datetime

from pydantic import BaseModel


class CorrelationCreate(BaseModel):
    spill_id: str
    mmsi: str

    distance_km: float
    time_difference_hours: float

    trajectory_score: float
    distance_score: float
    time_score: float

    final_score: float


class CorrelationResponse(CorrelationCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True