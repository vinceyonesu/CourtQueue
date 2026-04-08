# CourtQueue — Project Planning

## Core Features
- Players join a digital queue by entering their name and selecting a court
- Live queue display shows all players and their current position
- Playtime timer starts when a player begins their session
- Estimated wait time calculated from average game duration

## Data Model

### players
- id
- name
- joined_at

### queues
- id
- court_id
- player_id
- position
- status (waiting / playing / done)

### court_sessions
- id
- court_id
- player_id
- start_time
- end_time
- duration_minutes

## Tech Stack Decisions
- React — component-based UI, good for live updates
- Node.js + Express — fast REST API setup
- Socket.io — real-time push updates to all connected players
- PostgreSQL — reliable relational DB for queue and session data
- Jest — unit testing for queue logic and wait time algorithm

## App Pages
- Home — welcome screen, join queue button
- Queue — live queue display, timer, wait estimates
- Admin — manage courts, reset queue
