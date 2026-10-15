# Issue 03: Implement a safety alert system

## Problem
The site currently has no safety warning system for hazardous swimming conditions such as high waves, cold water, storms, or extreme UV exposure.

## Goal
Provide a clear, threshold-based alert system that helps users quickly understand whether a location is safe or risky for swimming.

## User impact
Without safety warnings, swimmers may underestimate risk and visit locations in unsuitable conditions. This can lead to poor user experience and possible safety concerns.

## Requirements
- Define safety thresholds for key conditions, including:
  - wave height
  - water temperature
  - wind conditions
  - UV index
  - precipitation/storm risk
- Create a warning model with clear alert levels such as Green, Yellow, and Red.
- Display alerts prominently on location pages.
- Integrate the alert state with calendar and filtering logic where relevant.
- Ensure the system updates based on the latest forecast data.

## Acceptance criteria
- [ ] Safety conditions are evaluated using project thresholds.
- [ ] Alerts are displayed clearly on each location page.
- [ ] The warning system supports multiple severity levels.
- [ ] The alert status is available to other features such as search and calendar views.
- [ ] Data from Open-Meteo is used as the source of truth for the warnings.

## Dependencies
- Weather and marine data integration must be complete.
- Frontend alert components must be designed and rendered consistently.
- Threshold values should be reviewed with swim safety considerations in mind.

## Priority
Medium

## Estimated effort
2-3 days.
