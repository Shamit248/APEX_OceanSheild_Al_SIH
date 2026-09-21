from datetime import datetime

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Text
)

from .connection import Base


class Spill(Base):
    __tablename__ = "spills"

    id = Column(Integer, primary_key=True, index=True)

    spill_id = Column(
        String(50),
        unique=True,
        nullable=False,
        index=True
    )

    timestamp = Column(DateTime, nullable=False)

    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)

    area_km2 = Column(Float)
    confidence = Column(Float)

    status = Column(
        String(30),
        default="detected"
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )


class Vessel(Base):
    __tablename__ = "vessels"

    id = Column(Integer, primary_key=True, index=True)

    mmsi = Column(
        String(20),
        unique=True,
        nullable=False,
        index=True
    )

    name = Column(String(255))

    vessel_type = Column(String(100))

    imo = Column(String(50))

    flag = Column(String(100))

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )


class VesselPosition(Base):
    __tablename__ = "vessel_positions"

    id = Column(Integer, primary_key=True, index=True)

    mmsi = Column(
        String(20),
        ForeignKey("vessels.mmsi"),
        nullable=False
    )

    timestamp = Column(DateTime, nullable=False)

    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)

    speed = Column(Float)
    course = Column(Float)
    heading = Column(Float)


class Correlation(Base):
    __tablename__ = "correlations"

    id = Column(Integer, primary_key=True, index=True)

    spill_id = Column(
        String(50),
        ForeignKey("spills.spill_id"),
        nullable=False
    )

    mmsi = Column(
        String(20),
        ForeignKey("vessels.mmsi"),
        nullable=False
    )

    distance_km = Column(Float)

    time_difference_hours = Column(Float)

    trajectory_score = Column(Float)

    distance_score = Column(Float)

    time_score = Column(Float)

    final_score = Column(Float)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)

    spill_id = Column(
        String(50),
        ForeignKey("spills.spill_id"),
        nullable=False
    )

    type = Column(String(100))

    severity = Column(String(30))

    message = Column(Text)

    is_read = Column(
        Boolean,
        default=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )