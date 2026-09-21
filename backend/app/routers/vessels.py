from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from ..database.connection import get_db

from ..schemas.vessel import (
    VesselCreate,
    VesselResponse
)

from ..services import vessel_service


router = APIRouter(
    prefix="/vessels",
    tags=["Vessels"]
)


@router.post(
    "/",
    response_model=VesselResponse
)
def create_vessel(
    data: VesselCreate,
    db: Session = Depends(get_db)
):

    vessel = vessel_service.create_vessel(
        db,
        data
    )

    if not vessel:
        raise HTTPException(
            status_code=400,
            detail="Vessel already exists"
        )

    return vessel


@router.get(
    "/",
    response_model=list[VesselResponse]
)
def get_vessels(
    db: Session = Depends(get_db)
):

    return vessel_service.get_vessels(db)


@router.get(
    "/{mmsi}",
    response_model=VesselResponse
)
def get_vessel(
    mmsi: str,
    db: Session = Depends(get_db)
):

    vessel = vessel_service.get_vessel(
        db,
        mmsi
    )

    if not vessel:
        raise HTTPException(
            status_code=404,
            detail="Vessel not found"
        )

    return vessel