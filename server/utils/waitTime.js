// Default average game duration in minutes if no sessions exist yet
const DEFAULT_AVG_DURATION = 30;

// Calculate rolling average from last 5 completed sessions
function getAverageDuration(completedSessions) {
  if (!completedSessions || completedSessions.length === 0) {
    return DEFAULT_AVG_DURATION;
  }

  // Only use last 5 sessions for rolling average
  const recentSessions = completedSessions.slice(-5);

  const total = recentSessions.reduce((sum, session) => {
    return sum + session.duration_minutes;
  }, 0);

  return Math.round(total / recentSessions.length);
}

// Calculate estimated wait time for a player
// based on their position and average game duration
function calculateWaitTime(position, completedSessions) {
  if (position <= 0) {
    return 0;
  }

  // Position 1 means they are next up — only waiting for current game to end
  // Position 2 means they wait for 1 full game, and so on
  const gamesAhead = position - 1;
  const avgDuration = getAverageDuration(completedSessions);
  const estimatedWait = gamesAhead * avgDuration;

  return estimatedWait;
}

// Format wait time into a readable string
function formatWaitTime(minutes) {
  if (minutes === 0) {
    return 'You are next!';
  }
  if (minutes < 60) {
    return `About ${minutes} min wait`;
  }
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  if (remaining === 0) {
    return `About ${hours} hr wait`;
  }
  return `About ${hours} hr ${remaining} min wait`;
}

module.exports = {
  getAverageDuration,
  calculateWaitTime,
  formatWaitTime,
};
