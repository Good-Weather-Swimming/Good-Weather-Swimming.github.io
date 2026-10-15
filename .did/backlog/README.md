# Backlog

Purpose: This directory holds the project backlog - a prioritized list of features, improvements, and technical debt items that are planned but not yet in development.

Structure:
- `ideas.md` - Brainstormed ideas and feature requests
- `features.md` - Prioritized feature backlog
- `technical-debt.md` - Known technical debt items
- `bugs.md` - Known bugs and issues
- `deferred/` - Items temporarily deferred

## Feature Backlog (Prioritized)
1. Replace rezerv.it API with Open-Meteo (weather + marine data)
2. Add water temperature field to location pages
3. Implement safety alert system for hazardous conditions
4. Create search and filtering functionality
5. Build swim calendar view for each location
6. Implement user contribution/report system
7. Add email/SMS notification subscriptions
8. Improve mobile UX with offline cache
9. Add multi-language support (i18n)
10. Add swim condition rating system

## Technical Debt
- Fix broken meta tags on home page (empty location placeholders)
- Replace all rezerv.it references in codebase
- Add proper error handling for API failures
- Implement caching for weather data
- Add fallback for API outages

## Known Issues
- Weather data endpoint (rezerv.it) returns 404
- Calendar iframe may not display correctly without valid weather source
- Home page SEO meta tags have empty placeholders
- No water temperature data on location pages
- No safety warning system for hazardous conditions

## Deferred Items
- Advanced features like swim tracking, leaderboards
- Payment integration (not needed for free community)
- Complex event management system