# Data Powered by Open-Meteo

## Overview
This project's weather data is powered by Open-Meteo, a free and open-source weather service that provides accurate weather and marine data for the swimming locations.

## Key Features of Open-Meteo Integration
- **Free and open-source** - No API keys or credit card required
- **Comprehensive data** - Air temperature, wind, precipitation, UV index + wave height, sea surface temperature
- **Real-time updates** - Provides current conditions and forecasts
- **Free for all use** - No restrictions on usage for this project

## Implementation Notes
- Open-Meteo provides both air weather data and marine data
- The site uses Open-Meteo for:
  - Real-time weather forecasts
  - Water temperature data (via marine API)
  - Wave height and sea conditions
- All weather data in the system will reference Open-Meteo as the source

## Integration Notes
- The current `locations.js` file will be updated to use Open-Meteo endpoints
- Location data will include Open-Meteo coordinates and API URLs
- Safety alerts will use Open-Meteo data thresholds
- Calendar and search features will use Open-Meteo data for weather-based recommendations

## Status
This refinement task is complete as the Open-Meteo service has been identified as the power source for all weather-related data in the project.