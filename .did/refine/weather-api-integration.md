# Weather API Integration Requirements

## Overview
Refine the requirements for replacing the broken `rezerv.it/weather/v1/forecast` endpoint with Open-Meteo API for Good Weather Swimming project.

## Current Status
- The rezerv.it endpoint returns 404 errors
- Need to replace with Open-Meteo (air weather + marine data)

## Requirements to Refine

### 1. Open-Meteo Air Weather API
- Endpoint: `https://api.open-meteo.com/v1/forecast`
- Parameters needed:
  - latitude, longitude
  - hourly: temperature_2m, wind_speed_10m, wind_direction_10m, precipitation_probability, weather_code, uv_index
  - daily: temperature_2m_max, temperature_2m_min, precipitation_sum, weather_code
  - timezone: auto-detect based on location
- Expected output: temperature, wind, precipitation, UV index

### 2. Open-Meteo Marine API
- Endpoint: `https://marine-api.open-meteo.com/v1/forecast`
- Parameters needed:
  - latitude, longitude
  - hourly: wave_height, wave_period, sea_temperature, wind_speed, wind_direction
  - daily: wave_height_max, sea_temperature_max
- Expected output: wave height, wave period, sea surface temperature

### 3. Data Integration Requirements
- Fetch both air and marine data for each location
- Cache data locally to reduce API calls
- Handle API failures gracefully with fallback data
- Map Open-Meteo data to internal data model fields

### 4. Location Data Model Updates
Current location data (src/_data/locations.js) needs:
- Add `openMeteoLat`, `openMeteoLng` fields
- Add `weatherDataUrl` for Open-Meteo API endpoint
- Add `marineDataUrl` for Marine API endpoint
- Add `dataCacheExpiry` field (e.g., 30 minutes)

### 5. Calendar Integration
- Replace existing calendar iframe (currently pulls from rezerv.it)
- Use Open-Meteo data for calendar events
- Implement caching to avoid excessive API calls
- Add fallback when API is unavailable

## Acceptance Criteria
1. API calls return valid JSON with expected fields
2. Air temperature matches expected ranges for location
3. Marine data (wave height, sea temperature) is present and reasonable
4. Calendar displays at least 7 days of forecast data
5. Data is cached and fallback works during API failures

## Dependencies
- Location data must be updated before integration
- Frontend components need to handle both air and marine data
- Error handling must be implemented for API failures

## Testing Requirements
- Unit tests for API data parsing
- Integration tests for cache functionality
- End-to-end tests for calendar display
- Performance tests for data loading

## Priority
High - This is blocking many other features

## Estimated Effort
2-3 days for initial integration

## References
- Open-Meteo Documentation: https://open-meteo.com/
- Current broken endpoint: rezerv.it/weather/v1/forecast