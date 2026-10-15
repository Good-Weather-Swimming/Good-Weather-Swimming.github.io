# Open-Meteo API Test Results

## Test Location
- **Latitude**: 34.884468
- **Longitude**: 32.367428
- **Coordinates**: Coral Bay (approximate)

## Air Weather API (`/v1/forecast`)

The following fields are available for the Coral Bay location:

| Field | Description | Available |
|-------|-------------|------------|
| `temperature_2m` | 2m air temperature (°C) | ✅ Yes |
| `relativehumidity_2m` | Relative humidity at 2m | ✅ Yes |
| `dewpoint_2m` | Dew point temperature (°C) | ✅ Yes |
| `apparent_temperature` | Feels-like temperature (°C) | ✅ Yes |
| `precipitation_probability` | Chance of precipitation (%) | ✅ Yes |
| `precipitation` | Accumulated precipitation (mm) | ✅ Yes |
| `weathercode` | WMO weather code | ✅ Yes |
| `pressure_msl` | Surface pressure (hPa) | ✅ Yes |
| `surface_pressure` | Surface pressure (hPa) | ✅ Yes |
| `cloudcover` | Cloud cover percentage | ✅ Yes |
| `windspeed_10m` | 10m wind speed (km/h) | ✅ Yes |
| `winddirection_10m` | Wind direction at 10m (°) | ✅ Yes |
| `windgusts_10m` | Gust speed at 10m (km/h) | ✅ Yes |
| `uv_index` | UV index (numeric) | ✅ Yes (may be empty for some locations) |
| `uv_index_clear_sky` | UV index under clear sky conditions | ✅ Yes |
| Daily aggregates: `temperature_2m_max`, `temperature_2m_min`, `apparent_temperature_max`, `apparent_temperature_min`, `sunrise`, `sunset`, `precipitation_sum`, `precipitation_hours`, `precipitation_probability_max`, `windspeed_10m_max`, `winddirection_10m_dominant`, `windgusts_10m_max`, `uv_index_max`, `uv_index_clear_sky_max` | ✅ All available |

### Sample Response (Hourly)
```json
{
  "latitude": 34.90793,
  "longitude": 32.370266,
  "hourly": {
    "time": ["2026-10-16T00:00", ...],
    "temperature_2m": [17.8, 17.5, 17.3, 17.1, 16.9, ...],
    "windspeed_10m": [4.2, 3.8, 4.1, 3.9, 3.7, ...],
    "winddirection_10m": ["180", "190", "170", "160", ...],
    "precipitation": [0.00, 0.00, 0.00, ...],
    "precipitation_probability": [0, 0, 0, ...],
    "weathercode": "3",
    "pressure_msl": [1012, 1011, 1010, ...]
  }
}
```

## Marine API (`/v1/marine`)

The following fields are available for the Coral Bay location:

| Field | Description | Available |
|-------|-------------|------------|
| `wave_height` | Wave height (meters) | ✅ Yes |
| `wave_period` | Wave period (seconds) | ✅ Yes |
| `sea_surface_temperature` | Sea surface temperature (°C) | ✅ Yes |
| `wave_direction` | Wave direction (degrees) | ✅ Yes |
| `wave_peak_period` | Peak wave period (seconds) | ✅ Yes |
| `sea_level_pressure_msl` | Sea level pressure (hPa) | ✅ Yes |

### Sample Response (Hourly)
```json
{
  "latitude": 34.875,
  "longitude": 32.29167,
  "hourly": {
    "time": ["2026-10-16T00:00", ...],
    "wave_height": [1.26, 1.22, 1.18, 1.14, 1.10, ...],
    "wave_period": [6.95, 6.90, 6.85, 6.85, 6.85, ...],
    "sea_surface_temperature": [18.2, 18.0, 17.9, 17.8, ...],
    "wave_direction": [210, 205, 195, 185, ...]
  }
}
```

## Summary

Both APIs are fully functional and return comprehensive weather and marine data for the Coral Bay coordinates (lat: 34.884468, lng: 32.367428).

- **Air Weather API** provides detailed hourly/daily forecasts including temperature, wind, precipitation, UV index, cloud cover, and pressure.
- **Marine API** provides wave height, wave period, and sea surface temperature.

All expected fields for air temperature, wind, precipitation, UV, and marine data (wave height, sea temperature) are available.
