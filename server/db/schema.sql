-- CourtQueue Database Schema

-- Players table
CREATE TABLE players (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Courts table
CREATE TABLE courts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'available'
);

-- Queue table
CREATE TABLE queues (
  id SERIAL PRIMARY KEY,
  court_id INTEGER REFERENCES courts(id),
  player_id INTEGER REFERENCES players(id),
  position INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'waiting',
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Court sessions table
CREATE TABLE court_sessions (
  id SERIAL PRIMARY KEY,
  court_id INTEGER REFERENCES courts(id),
  player_id INTEGER REFERENCES players(id),
  start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_time TIMESTAMP,
  duration_minutes INTEGER
);

-- Seed courts
INSERT INTO courts (name) VALUES
  ('Court 1'),
  ('Court 2'),
  ('Court 3');
