def clean_ais_data(df):

    df = df.drop_duplicates()

    df = df.dropna(
        subset=["MMSI", "timestamp", "latitude", "longitude"]
    )

    df = df[
        (df["latitude"].between(-90, 90)) &
        (df["longitude"].between(-180, 180))
    ]

    if "speed" in df.columns:
        df = df[
            (df["speed"] >= 0) &
            (df["speed"] <= 60)
        ]

    return df.reset_index(drop=True)