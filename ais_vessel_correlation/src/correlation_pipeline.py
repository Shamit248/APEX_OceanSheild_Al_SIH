from data_loader import load_ais_data
from preprocessing import clean_ais_data
from spatial_filter import filter_nearby_vessels
from temporal_filter import filter_by_time
from feature_engineering import calculate_vessel_features
from vessel_scoring import calculate_scores


AIS_FILE = "../data/sample_ais.csv"

SPILL_LAT = 18.5200
SPILL_LON = 72.8500

SPILL_TIME = "2026-09-10 10:00:00"


def run_pipeline():

    print("Loading AIS data...")

    df = load_ais_data(AIS_FILE)

    print(f"Records loaded: {len(df)}")

    df = clean_ais_data(df)

    print(f"Records after cleaning: {len(df)}")

    df = filter_nearby_vessels(
        df,
        SPILL_LAT,
        SPILL_LON,
        radius_km=20
    )

    print(f"Records near spill: {len(df)}")

    df = filter_by_time(
        df,
        SPILL_TIME,
        time_window_minutes=60
    )

    print(f"Records in time window: {len(df)}")

    features = calculate_vessel_features(df)

    ranked_vessels = calculate_scores(features)

    print("\nCandidate Vessels:")
    print(ranked_vessels)

    ranked_vessels.to_csv(
        "../data/vessel_correlation_results.csv",
        index=False
    )


if __name__ == "__main__":
    run_pipeline()