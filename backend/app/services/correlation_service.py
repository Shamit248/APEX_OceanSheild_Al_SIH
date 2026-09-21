from sqlalchemy.orm import Session

from ..database import crud


def create_vessel(db: Session, data):
    existing = crud.get_vessel(
        db,
        data.mmsi
    )

    if existing:
        return None

    return crud.create_vessel(
        db,
        data
    )


def get_vessels(db: Session):
    return crud.get_vessels(db)


def get_vessel(db: Session, mmsi: str):
    return crud.get_vessel(
        db,
        mmsi
    )