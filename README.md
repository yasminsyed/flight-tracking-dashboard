# Flight Tracking & Operations Dashboard

A responsive Angular flight tracking dashboard for aviation operations personnel, built with Angular 17, Leaflet Maps, Reactive Forms, and RxJS.

## Features

- Interactive Leaflet map displaying 15+ mock flights as color-coded, direction-oriented plane markers
- Click a flight to highlight its route (polyline) and auto-center the map
- Flight details panel with aircraft info, status, times, progress bar, and operations log
- Live-updating KPI dashboard (Total / Active / Delayed / Arrived flights)
- Search by callsign, filter by status, origin, and destination (Reactive Forms + RxJS debounce)
- Dark mode toggle (applies across the entire app via CSS variables)
- Sticky dashboard header that stays fixed while scrolling
- Responsive layout for desktop and tablet screens
- Basic accessibility: labeled form controls, ARIA attributes on interactive controls

## Tech Stack

- Angular 17 (standalone components, no NgModules)
- TypeScript
- Leaflet.js for interactive maps
- Reactive Forms (`FormGroup`, `FormControl`)
- RxJS (`valueChanges`, `debounceTime`)
- Angular Router
- SCSS with CSS custom properties for theming

## Setup Instructions

1. Clone the repository:
```bash
   git clone https://github.com/yasminsyed/flight-tracking-dashboard.git
   cd flight-tracking-dashboard
```

2. Install dependencies:
```bash
   npm install
```

3. Run the development server:
```bash
   ng serve
```

4. Open your browser at `http://localhost:4200` (auto-redirects to `/dashboard`)

## Project Structure

flight-tracking-dashboard/
├── src/
│ ├── app/
│ │ ├── components/
│ │ │ ├── dashboard/ # Main layout — wires map, filters, KPIs, and details together
│ │ │ │ ├── dashboard.ts
│ │ │ │ ├── dashboard.html
│ │ │ │ └── dashboard.scss
│ │ │ ├── flight-map/ # Leaflet map: markers, routes, popups
│ │ │ │ ├── flight-map.ts
│ │ │ │ ├── flight-map.html
│ │ │ │ └── flight-map.scss
│ │ │ ├── flight-details/ # Selected flight info panel (progress bar, operations log)
│ │ │ │ ├── flight-details.ts
│ │ │ │ ├── flight-details.html
│ │ │ │ └── flight-details.scss
│ │ │ ├── kpi-cards/ # Total / Active / Delayed / Arrived summary cards
│ │ │ │ ├── kpi-cards.ts
│ │ │ │ ├── kpi-cards.html
│ │ │ │ └── kpi-cards.scss
│ │ │ └── filter-bar/ # Search + status/origin/destination filters
│ │ │ ├── filter-bar.ts
│ │ │ ├── filter-bar.html
│ │ │ └── filter-bar.scss
│ │ ├── services/
│ │ │ └── flight.ts # Mock flight data, filtering logic, shared selected-flight state
│ │ ├── app.ts # Root component (RouterOutlet)
│ │ ├── app.html
│ │ └── app.routes.ts # Route definitions (redirects to /dashboard)
│ ├── styles.scss # Global styles, font import, dark mode CSS variables
│ └── index.html
├── angular.json
├── package.json
└── README.md


## Architecture Notes

- **Single shared service (`FlightService`)** holds the mock flight data, current filters, and selected flight — every component reads from and updates this one source of truth instead of passing data through many component layers.
- **Standalone components** are used throughout (Angular 17 default) — no `NgModule` boilerplate.
- **Leaflet `LayerGroup`** is used to manage map markers as a single unit, so `clearLayers()` reliably removes all markers before redrawing on every filter change.
- **Flight positions on the map** are calculated as a point 40% along the route from origin to destination (not at the origin city itself), so flights with the same departure city don't visually stack on top of each other, and to better simulate "in-flight" tracking.
- **Dark mode** is implemented with CSS custom properties (`--bg-page`, `--bg-card`, `--text-primary`, etc.) toggled via a `dark-mode` class on `<body>` — no external theming library required.

## Data

All flight data is mocked within `FlightService`. No backend or external API is required to run this project.

## Known Limitations

- The Leaflet map itself has inherent accessibility limitations common to interactive map libraries; a production version would benefit from a supplementary accessible list/table view of flights as an alternative to the map.
- Progress percentage and the operations log are simulated for presentation purposes, not calculated from real telemetry.