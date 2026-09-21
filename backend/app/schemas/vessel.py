from datetime import datetime

from pydantic import BaseModel


class VesselCreate(BaseModel):
    mmsi: str
    name: str

    vessel_type: str | None = None
    imo: str | None = None
    flag: str | None = None


class VesselResponse(VesselCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True