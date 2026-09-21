from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from ..database.connection import get_db

from ..schemas.alert import (
    AlertCreate,
    AlertResponse
)

from ..services import alert_service


router = APIRouter(
    prefix="/alerts",
    tags=["Alerts"]
)


@router.post(
    "/",
    response_model=AlertResponse
)
def create_alert(
    data: AlertCreate,
    db: Session = Depends(get_db)
):

    alert = alert_service.create_alert(
        db,
        data
    )

    if not alert:
        raise HTTPException(
            status_code=404,
            detail="Spill not found"
        )

    return alert


@router.get(
    "/",
    response_model=list[AlertResponse]
)
def get_alerts(
    db: Session = Depends(get_db)
):

    return alert_service.get_alerts(db)


@router.patch(
    "/{alert_id}/read",
    response_model=AlertResponse
)
def mark_alert_read(
    alert_id: int,
    db: Session = Depends(get_db)
):

    alert = alert_service.mark_alert_read(
        db,
        alert_id
    )

    if not alert:
        raise HTTPException(
            status_code=404,
            detail="Alert not found"
        )

    return alert