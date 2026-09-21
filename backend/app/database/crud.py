from sqlalchemy.orm import Session

from .models import (
    Alert,
    Correlation,
    Spill,
    Vessel,
    VesselPosition
)


# -------------------------
# SPILLS
# -------------------------

def create_spill(db: Session, data):
    spill = Spill(
        spill_id=data.spill_id,
        timestamp=data.timestamp,
        latitude=data.latitude,
        longitude=data.longitude,
        area_km2=data.area_km2,
        confidence=data.confidence,
        status=data.status
    )

    db.add(spill)
    db.commit()
    db.refresh(spill)

    return spill


def get_spills(db: Session):
    return db.query(Spill).all()


def get_spill(db: Session, spill_id: str):
    return (
        db.query(Spill)
        .filter(Spill.spill_id == spill_id)
        .first()
    )


# -------------------------
# VESSELS
# -------------------------

def create_vessel(db: Session, data):
    vessel = Vessel(
        mmsi=data.mmsi,
        name=data.name,
        vessel_type=data.vessel_type,
        imo=data.imo,
        flag=data.flag
    )

    db.add(vessel)
    db.commit()
    db.refresh(vessel)

    return vessel


def get_vessels(db: Session):
    return db.query(Vessel).all()


def get_vessel(db: Session, mmsi: str):
    return (
        db.query(Vessel)
        .filter(Vessel.mmsi == mmsi)
        .first()
    )


# -------------------------
# CORRELATIONS
# -------------------------

def create_correlation(db: Session, data):
    correlation = Correlation(
        spill_id=data.spill_id,
        mmsi=data.mmsi,
        distance_km=data.distance_km,
        time_difference_hours=data.time_difference_hours,
        trajectory_score=data.trajectory_score,
        distance_score=data.distance_score,
        time_score=data.time_score,
        final_score=data.final_score
    )

    db.add(correlation)
    db.commit()
    db.refresh(correlation)

    return correlation


def get_correlations(db: Session, spill_id: str):
    return (
        db.query(Correlation)
        .filter(Correlation.spill_id == spill_id)
        .order_by(Correlation.final_score.desc())
        .all()
    )


# -------------------------
# ALERTS
# -------------------------

def create_alert(db: Session, data):
    alert = Alert(
        spill_id=data.spill_id,
        type=data.type,
        severity=data.severity,
        message=data.message
    )

    db.add(alert)
    db.commit()
    db.refresh(alert)

    return alert


def get_alerts(db: Session):
    return (
        db.query(Alert)
        .order_by(Alert.created_at.desc())
        .all()
    )


def mark_alert_read(db: Session, alert_id: int):
    alert = (
        db.query(Alert)
        .filter(Alert.id == alert_id)
        .first()
    )

    if alert:
        alert.is_read = True

        db.commit()
        db.refresh(alert)

    return alert