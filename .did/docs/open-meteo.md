# Open-Meteo Weather Service Note

## Service Overview
- **Name**: Open-Meteo
- **URL**: https://open-meteo.com/
- **Type**: Free, open-source weather API
- **Key Features**:
  - No API key required
  - No usage limits
  - Free tier with no throttling
  - GDPR-compliant (no tracking/cookies)
  - High-quality forecasts using ECMWF, DWD, and other models
  - Marine data support (waves, sea surface temperature)
  - Hourly forecasts for up to 7 days

## Key Endpoints
1. **Air Weather** - `https://api.open-meteo.com/v1/forecast`
   - Parameters: latitude, longitude, hourly, daily, daily_weathercode, timezone
   - Returns: temperature, wind speed/direction, precipitation, UV index, etc.

2. **Marine Data** - `https://marine-api.open-meteo.com/v1/forecast`
   - Parameters: latitude, longitude, hourly, daily, windrows, winddir, sea_temperature
   - Returns: wave height, wave period, sea surface temperature, wind over water

## Integration Notes
- Replace `rezerv.it/weather/v1/forecast` endpoint with Open-Meteo
- Add marine endpoint for wave/current data: `https://marine-api.open-meteo.com/v1/forecast`
- Add marine data to location data model:
  ```javascript
  {
    // existing fields...
    openMeteoLat: 34.884468,
    openMeteoLng: 32.367428,
    openMeteoWeatherUrl: "https://api.open-meteo.com/v1/forecast?latitude=34.884468&longitude=32.367428&hourly=temperature_2m,wind_speed_10m,precipitation_probability,weather_code&daily=water_temperature",
    openMeteoMarineUrl: "https://marine-api.open-meteo.com/v1/forecast?latitude=34.884468&longitude=32.367428&hourly=wave_height,wave_period,sea_temperature&daily=water_temperature"
  }
  ```
- Update the embedded calendar iframe to use Open-Meteo data or a new calendar service
- Add error handling for API failures with cached fallback data

## Advantages Over Current Service (rezerv.it)
- No API key required
- No rate limiting
- Free for commercial use
- Marine-specific endpoints available
- Better data quality for water conditions
- No hidden costs or usage restrictions

## Limitations
- Requires internet connection (no offline mode)
- No dedicated mobile app (web-based only)
- No built-in calendar UI (needs custom implementation or use of existing calendar service)
- Requires JavaScript execution for client-side integration

## Implementation Plan
1. Replace `rezerv.it/weather/v1/forecast` with Open-Meteo API calls
2. Update location data model to include Open-Meteo coordinates
3. Replace embedded calendar with Open-Meteo-compatible calendar or custom implementation
4. Add water temperature display to location pages
5. Add safety alerts based on wave height and water temperature thresholds