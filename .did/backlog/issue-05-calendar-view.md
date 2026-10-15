# Issue 05: Add a swim calendar view by location

## Problem
The site does not yet provide a dedicated calendar view that helps users understand which days are most suitable for swimming at each location.

## Goal
Create a location-based calendar that highlights the best swim days using weather and marine data.

## User impact
Users need an easier way to find suitable swimming days without manually reviewing daily conditions. A calendar makes this decision much clearer and more useful.

## Requirements
- Add a calendar component for each location.
- Use Open-Meteo forecast data to identify recommended swim days.
- Mark days with favourable weather and marine conditions.
- Support color coding or visual indicators for different conditions.
- Make the calendar responsive and accessible.

## Acceptance criteria
- [ ] A calendar component exists for each swim location.
- [ ] Recommended swim days are marked using weather and marine conditions.
- [ ] The calendar is integrated with Open-Meteo data.
- [ ] Visual indicators help users understand conditions quickly.
- [ ] The interface works on mobile and desktop screens.
- [ ] The calendar remains usable when data is partially unavailable.

## Dependencies
- Weather and marine data must be available.
- Location pages or location detail views need a place to host the calendar.
- A fallback or empty-state view should exist for data outages.

## Priority
Medium

## Estimated effort
2-3 days.
