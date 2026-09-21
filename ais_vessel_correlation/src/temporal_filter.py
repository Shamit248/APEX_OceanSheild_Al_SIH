import pandas as pd


def filter_by_time(
    df,
    spill_time,
    time_window_minutes=60
):

    spill_time = pd.to_datetime(spill_time)

    df = df.copy()

    df["time_difference_minutes"] = (
        (df["timestamp"] - spill_time)
        .abs()
        .dt.total_seconds() / 60
    )

    return df[
        df["time_difference_minutes"]
        <= time_window_minutes
    ].copy()