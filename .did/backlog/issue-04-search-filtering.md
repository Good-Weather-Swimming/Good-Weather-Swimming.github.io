# Issue 04: Add search and filtering for swim locations

## Problem
The site has multiple swim locations, but users currently lack a practical way to search and narrow them down based on real conditions and location attributes.

## Goal
Enable users to find suitable swim spots using search and filtering controls based on weather, water conditions, and amenities.

## User impact
Visitors must manually inspect multiple pages to find a location that matches their needs. This makes the site harder to use and reduces the usefulness of location data.

## Requirements
- Add a search box to the home page for location lookup.
- Support filtering by at least:
  - location name or area
  - water temperature threshold
  - weather status or conditions
  - amenities such as toilets, showers, or lifeguard presence
  - distance from a user-selected area if available
  - user rating or quality signals
- Allow multiple combined filters to work together.
- Keep the interface mobile-friendly and responsive.

## Acceptance criteria
- [ ] A location search box is visible on the home page.
- [ ] Users can filter locations by multiple criteria at the same time.
- [ ] Results update dynamically as filters change.
- [ ] The filter logic uses weather and location data from the app.
- [ ] The interface remains usable on mobile devices.

## Dependencies
- Location data model must include relevant attributes.
- Weather and marine data must be available for filtering logic.
- The frontend needs a clear, responsive layout for controls and results.

## Priority
High

## Estimated effort
2-4 days depending on UI complexity.
