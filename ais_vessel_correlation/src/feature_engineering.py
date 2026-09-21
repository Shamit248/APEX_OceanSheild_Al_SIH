def calculate_vessel_features(df):

    features = (
        df.groupby("MMSI")
        .agg(
            min_distance_km=("distance_km", "min"),
            avg_distance_km=("distance_km", "mean"),
            min_time_difference=("time_difference_minutes", "min"),
            avg_speed=("speed", "mean"),
            avg_heading=("heading", "mean"),
            observations=("MMSI", "count")
        )
        .reset_index()
    )

    return features