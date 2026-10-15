# Issue 01: Replace the broken weather API with Open-Meteo

## Problem
The site currently relies on the `rezerv.it/weather/v1/forecast` endpoint, which is returning 404 errors. As a result, the weather data shown on the site is unreliable or missing, and the related features cannot function as intended.

## Goal
Replace the broken weather source with Open-Meteo and keep the site functional with accurate air and marine conditions for each swimming location.

## User impact
Visitors cannot trust the weather information shown on location pages, and features such as the calendar and location filtering are affected by missing or invalid data.

## Requirements
- Remove or replace all references to the legacy `rezerv.it` weather endpoint.
- Use the Open-Meteo forecast API for air temperature, wind, precipitation, UV index, and weather code data.
- Use the Open-Meteo marine API for wave height, wave period, and sea temperature.
- Map the returned API data to the project's location data model.
- Add graceful error handling for failed requests or missing data.
- Implement local caching to reduce API calls and provide fallback data during outages.

## Acceptance criteria
- [ ] No active references to `rezerv.it/weather/v1/forecast` remain in the app.
- [ ] The site fetches live weather data from Open-Meteo for each location.
- [ ] Sea and weather data are both available and mapped to the internal data model.
- [ ] Failed API requests do not break the page and trigger a safe fallback path.
- [ ] Cached data is reused when the API is unavailable or rate-limited.

## Dependencies
- Location data model must include Open-Meteo coordinate and endpoint fields.
- Frontend pages must be able to render the new data structure.
- Error handling and fallback logic should be implemented before rollout.

## Priority
High

## Estimated effort
2-3 days for the initial integration and fallback setup.
