# Issue 01: Fix Weather API

## Description
The current weather API endpoint (`rezerv.it/weather/v1/forecast`) returns 404 errors, preventing the site from showing real-time weather data. Replace this with the Open-Meteo API, which provides free, reliable weather and marine data (including water temperature) without requiring an API key.

## Acceptance Criteria
- [ ] Replace all references to `rezerv.it/weather/v1/forecast` with Open-Meteo endpoints.
- [ ] Implement both air weather (`/v1/forecast`) and marine data (`marine-api.open-meteo.com`) endpoints.
- [ ] Integrate Open-Meteo data into the location data model.
- [ ] Ensure water temperature is derived from marine data.
- [ ] Update location pages to display current weather and water temperature.
- [ ] Add fallback caching for API failures.

## Acceptance Criteria
- [ ] All location pages show current weather and water temperature.
- [ ] Calendar and search features can filter by weather conditions.
- [ ] No broken API calls; fallback caching works during outages.