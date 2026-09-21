def calculate_scores(df):

    df = df.copy()

    df["distance_score"] = (
        1 / (1 + df["min_distance_km"])
    )

    df["time_score"] = (
        1 / (1 + df["min_time_difference"])
    )

    for column in ["distance_score", "time_score"]:

        maximum = df[column].max()

        if maximum > 0:
            df[column] = df[column] / maximum

    df["correlation_score"] = (
        0.60 * df["distance_score"]
        + 0.40 * df["time_score"]
    )

    df["correlation_score"] *= 100

    return df.sort_values(
        "correlation_score",
        ascending=False
    )