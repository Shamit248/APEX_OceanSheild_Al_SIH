import pandas as pd


def load_ais_data(file_path):
    df = pd.read_csv(file_path)

    df["timestamp"] = pd.to_datetime(df["timestamp"])

    return df