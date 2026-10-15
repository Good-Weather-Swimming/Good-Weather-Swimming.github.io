# Replace rezerv.it API with Open-Meteo

## Description
The current weather API endpoint (rezerv.it/weather/v1/forecast) is returning 404 errors. This feature adds Open-Meteo as a replacement API source for both air weather data and marine/ocean data (including water temperature).

## Requirements
- Replace all references to rezerv.it API in codebase
- Use Open-Meteo API for air weather data (temperature, wind, precipitation, UV)
- Use Marine API for ocean data (wave height, sea surface temperature)
- Implement caching to reduce API calls
- Handle API failures gracefully with fallbacks

## Priority
High

## Effort
2-3 days

## References
- OPEN_METEO_NOTE.md
- open-meteo.com
- Current broken endpoint: rezerv.it/weather/v1/forecast