# AIS Vessel Correlation

This module is part of the OceanShield AI project and focuses on
correlating historical AIS vessel data with an estimated marine
oil-spill origin.

## Workflow

AIS Data
↓
Data Cleaning
↓
Spatial Filtering
↓
Temporal Filtering
↓
Feature Extraction
↓
Vessel Correlation Scoring
↓
Candidate Vessel Ranking

## Features

- AIS data preprocessing
- Invalid data removal
- Spatial filtering using Haversine distance
- Temporal correlation with spill origin time
- Vessel feature extraction
- Candidate vessel scoring
- Vessel ranking

## Input

The system accepts AIS data containing:

- MMSI
- Timestamp
- Latitude
- Longitude
- Speed
- Heading

## Output

The system generates a ranked list of candidate vessels based on
their spatial and temporal correlation with the estimated spill origin.

## Technologies

- Python
- Pandas
- NumPy
- GeoPandas
- Shapely
- Scikit-learn
- XGBoost
- Folium