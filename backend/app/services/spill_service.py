from sqlalchemy.orm import Session

from ..database import crud


def create_spill(db: Session, data):
    existing = crud.get_spill(
        db,
        data.spill_id
    )

    if existing:
        return None

    return crud.create_spill(
        db,
        data
    )


def get_spills(db: Session):
    return crud.get_spills(db)


def get_spill(db: Session, spill_id: str):
    return crud.get_spill(
        db,
        spill_id
    )