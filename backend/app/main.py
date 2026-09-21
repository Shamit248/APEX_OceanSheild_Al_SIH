from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database.connection import Base, engine

from .database import models

from .routers import (
    spills,
    vessels,
    correlations,
    alerts
)


Base.metadata.create_all(
    bind=engine
)


app = FastAPI(
    title="OceanShield AI",
    description="Oil Spill Detection and Vessel Correlation API",
    version="1.0.0"
)


# -------------------------
# CORS
# -------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# -------------------------
# ROUTERS
# -------------------------

app.include_router(
    spills.router
)

app.include_router(
    vessels.router
)

app.include_router(
    correlations.router
)

app.include_router(
    alerts.router
)


# -------------------------
# ROOT
# -------------------------

@app.get("/")
def root():

    return {
        "project": "OceanShield AI",
        "status": "running"
    }


@app.get("/health")
def health():

    return {
        "status": "healthy"
    }