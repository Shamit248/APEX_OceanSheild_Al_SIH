from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from ..database.connection import get_db

from ..schemas.correlation import (
    CorrelationCreate,
    CorrelationResponse
)

from ..services import correlation_service


router = APIRouter(
    prefix="/correlations",
    tags=["Correlations"]
)


@router.post(
    "/",
    response_model=CorrelationResponse
)
def create_correlation(
    data: CorrelationCreate,
    db: Session = Depends(get_db)
):

    correlation = (
        correlation_service.create_correlation(
            db,
            data
        )
    )

    if not correlation:
        raise HTTPException(
            status_code=404,
            detail="Spill or vessel not found"
        )

    return correlation


@router.get(
    "/{spill_id}",
    response_model=list[CorrelationResponse]
)
def get_correlations(
    spill_id: str,
    db: Session = Depends(get_db)
):

    return correlation_service.get_correlations(
        db,
        spill_id
    )