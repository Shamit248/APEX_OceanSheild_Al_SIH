from sqlalchemy.orm import Session

from ..database import crud


def create_alert(db: Session, data):

    spill = crud.get_spill(
        db,
        data.spill_id
    )

    if not spill:
        return None

    return crud.create_alert(
        db,
        data
    )


def get_alerts(db: Session):
    return crud.get_alerts(db)


def mark_alert_read(
    db: Session,
    alert_id: int
):
    return crud.mark_alert_read(
        db,
        alert_id
    )