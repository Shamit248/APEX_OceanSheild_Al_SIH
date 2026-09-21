from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from ..database.connection import get_db
from ..schemas.spill import (
    SpillCreate,
    SpillResponse
)

from ..services import spill_service


router = APIRouter(
    prefix="/spills",
    tags=["Spills"]
)


@router.post(
    "/",
    response_model=SpillResponse
)
def create_spill(
    data: SpillCreate,
    db: Session = Depends(get_db)
):

    spill = spill_service.create_spill(
        db,
        data
    )

    if not spill:
        raise HTTPException(
            status_code=400,
            detail="Spill already exists"
        )

    return spill


@router.get(
    "/",
    response_model=list[SpillResponse]
)
def get_spills(
    db: Session = Depends(get_db)
):

    return spill_service.get_spills(db)


@router.get(
    "/{spill_id}",
    response_model=SpillResponse
)
def get_spill(
    spill_id: str,
    db: Session = Depends(get_db)
):

    spill = spill_service.get_spill(
        db,
        spill_id
    )

    if not spill:
        raise HTTPException(
            status_code=404,
            detail="Spill not found"
        )

    return spill