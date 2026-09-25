# Design Explanation — Flight Tracking & Operations Dashboard

## Overview

This document explains the key architecture and UI/UX decisions made while building the Flight Tracking & Operations Dashboard, an Angular 17 application for monitoring flight operations using mock data and Leaflet Maps.

## Architecture Decisions

### Single Shared Service Pattern

Rather than splitting state across multiple services, all flight data, filtering logic, and selection state live in one `FlightService`. Every component (map, KPI cards, filter bar, details panel) reads from and writes to this single source of truth. This keeps data flow predictable: a filter change in one component is immediately reflected everywhere else, without needing to pass data manually through several layers of parent/child components.

### Standalone Components

The app uses Angular 17's standalone component API rather than NgModules. Each component explicitly declares its own imports (e.g., `ReactiveFormsModule` only where forms are used), making dependencies clear at a glance and reducing boilerplate.

### Presentational vs. Container Components

`Dashboard` acts as the container component — it owns state and orchestrates data flow. `KpiCards`, `FilterBar`, `FlightMap`, and `FlightDetails` are presentational: they receive data via `@Input()` and emit events via `@Output()`, but contain no business logic themselves. This separation makes each piece independently testable and reusable.

### Leaflet Integration

Markers are managed through a Leaflet `LayerGroup` rather than a manually tracked array. This guarantees that `clearLayers()` removes every marker in one reliable call before redrawing — avoiding stale or duplicate markers when filters change, which was an issue encountered and fixed during development.

Flight positions are plotted at a calculated point along the route (40% of the way from origin to destination) rather than at the origin airport itself. This avoids multiple flights sharing a departure city from visually stacking on the same marker, and better represents an "in-flight" tracking scenario. Marker icons are custom `divIcon`s (rotated plane symbols, colored by status) rather than Leaflet's default pin, and colors are shared consistently across markers, popups, and route polylines.

### Reactive Forms + RxJS

The filter bar uses a single `FormGroup` with four `FormControl`s (search, status, origin, destination). Rather than wiring individual `(change)` handlers, the form's `valueChanges` observable is piped through `debounceTime(300)` before filters are applied — reducing unnecessary re-filtering while the user is still typing.

## UI/UX Decisions

- **Map-first layout**: The map occupies the primary visual space, per the assignment's requirement, with KPIs and filters above it and details alongside it — keeping the map as the focal point rather than competing for attention.
- **Status-based color coding**: Active (blue), Delayed (amber), Arrived (green), Scheduled (gray) are applied consistently across markers, route lines, KPI card accents, and status badges, so a user can recognize a flight's state at a glance across every part of the UI.
- **Sticky header**: The dashboard header remains visible while scrolling, keeping the dark mode toggle and title accessible at all times.
- **Empty states**: The details panel shows a clear instructional message ("Click a flight marker...") rather than a blank space when nothing is selected.
- **Dark mode**: Implemented with CSS custom properties toggled via a class on `<body>`, allowing every component to theme consistently without a separate theming library.
- **Responsive layout**: A CSS Grid two-column layout (map + details) collapses to a single stacked column below 900px width, tested at tablet (1024×786) and mobile viewport sizes.
- **Basic accessibility**: Form inputs have associated `<label>` elements (visually hidden where appropriate), and icon-only controls (like the dark mode toggle) include `aria-label` / `role="switch"` attributes for screen reader support.

## What I'd Improve With More Time

- **Marker clustering** for denser flight data, to avoid visual crowding at lower zoom levels.
- **Unit tests** for `FlightService`'s filtering logic and the components' `@Input()`/`@Output()` contracts.
- **Real-time data simulation** (e.g., an interval that gradually moves each flight's position and updates its progress percentage) rather than the current fixed 40%-progress mock.
- **Persisted filter/theme state** (e.g., via localStorage) so preferences survive a page reload.

## Known Limitations

- All data is mocked within the Angular app; no backend or live flight API is used, per the assignment's requirements.
- Progress percentages and the operations log entries are simulated for presentation purposes rather than derived from real telemetry or timestamps.