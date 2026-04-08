const {
  getAverageDuration,
  calculateWaitTime,
  formatWaitTime,
} = require('../server/utils/waitTime');

// --- getAverageDuration tests ---

test('returns default duration when no sessions exist', () => {
  expect(getAverageDuration([])).toBe(30);
});

test('returns default duration when sessions is null', () => {
  expect(getAverageDuration(null)).toBe(30);
});

test('calculates average from completed sessions', () => {
  const sessions = [
    { duration_minutes: 20 },
    { duration_minutes: 40 },
    { duration_minutes: 30 },
  ];
  expect(getAverageDuration(sessions)).toBe(30);
});

test('only uses last 5 sessions for rolling average', () => {
  const sessions = [
    { duration_minutes: 60 },
    { duration_minutes: 10 },
    { duration_minutes: 10 },
    { duration_minutes: 10 },
    { duration_minutes: 10 },
    { duration_minutes: 10 },
  ];
  // Last 5 sessions all have 10 minutes so average should be 10
  expect(getAverageDuration(sessions)).toBe(10);
});

// --- calculateWaitTime tests ---

test('returns 0 wait time for position 0', () => {
  expect(calculateWaitTime(0, [])).toBe(0);
});

test('returns 0 wait time for position 1 (next up)', () => {
  expect(calculateWaitTime(1, [])).toBe(0);
});

test('calculates correct wait time for position 2', () => {
  const sessions = [{ duration_minutes: 30 }];
  // Position 2 means 1 game ahead x 30 min = 30 min wait
  expect(calculateWaitTime(2, sessions)).toBe(30);
});

test('calculates correct wait time for position 4', () => {
  const sessions = [{ duration_minutes: 20 }];
  // Position 4 means 3 games ahead x 20 min = 60 min wait
  expect(calculateWaitTime(4, sessions)).toBe(60);
});

// --- formatWaitTime tests ---

test('returns next up message for 0 minutes', () => {
  expect(formatWaitTime(0)).toBe('You are next!');
});

test('returns minutes for waits under 1 hour', () => {
  expect(formatWaitTime(45)).toBe('About 45 min wait');
});

test('returns hours for waits over 1 hour', () => {
  expect(formatWaitTime(60)).toBe('About 1 hr wait');
});

test('returns hours and minutes for mixed wait time', () => {
  expect(formatWaitTime(90)).toBe('About 1 hr 30 min wait');
});
