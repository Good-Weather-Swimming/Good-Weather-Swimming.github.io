# Issue 02: Add water temperature to location pages

## Problem
The site does not currently display water temperature for swim spots, even though it is one of the most important factors when deciding whether a beach is suitable for open-water swimming.

## Goal
Surface water temperature should be visible on relevant location pages and usable in filtering and sorting logic.

## User impact
Swimmers are missing a key decision-making signal when choosing a location. This makes it harder to compare beaches and judge whether conditions are comfortable or safe.

## Requirements
- Add a water temperature field to the location data model.
- Fetch sea surface temperature from the Open-Meteo marine API.
- Display the value clearly on each location page.
- Ensure the metric can be used in filters and sorting logic.
- Keep the value updated with the current forecast data.

## Acceptance criteria
- [ ] Water temperature is stored in the location data structure.
- [ ] Sea temperature is populated from Open-Meteo marine data.
- [ ] The value is displayed on location pages in a clear, user-facing format.
- [ ] Filtering logic supports thresholds such as `> 18°C` when needed.
- [ ] Missing or stale data is handled without breaking the page.

## Dependencies
- Open-Meteo marine API integration must be working.
- Updated frontend templates need to render the new field.
- Weather/data model updates should be complete before UI rollout.

## Priority
High

## Estimated effort
1-2 days.
