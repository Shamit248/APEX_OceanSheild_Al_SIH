from math import radians, sin, cos, sqrt, atan2


def haversine_distance(lat1, lon1, lat2, lon2):

    R = 6371.0

    lat1 = radians(lat1)
    lat2 = radians(lat2)

    dlat = lat2 - lat1
    dlon = radians(lon2 - lon1)

    a = (
        sin(dlat / 2) ** 2
        + cos(lat1)
        * cos(lat2)
        * sin(dlon / 2) ** 2
    )

    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return R * c


def filter_nearby_vessels(
    df,
    spill_lat,
    spill_lon,
    radius_km=20
):

    df = df.copy()

    df["distance_km"] = df.apply(
        lambda row: haversine_distance(
            spill_lat,
            spill_lon,
            row["latitude"],
            row["longitude"]
        ),
        axis=1
    )

    return df[df["distance_km"] <= radius_km].copy()