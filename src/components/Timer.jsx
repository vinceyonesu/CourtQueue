import React, { useState, useEffect } from 'react';

function Timer({ playerName, onTimeUp }) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Format seconds into mm:ss display
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          // Notify when playtime hits 60 minutes
          if (prev >= 3599) {
            clearInterval(interval);
            setIsRunning(false);
            if (onTimeUp) onTimeUp();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }

    // Cleanup interval on unmount or when stopped
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f9f9f9',
      border: '1px solid #ddd',
      borderRadius: '8px',
      maxWidth: '300px',
      textAlign: 'center',
      marginTop: '20px',
    }}>
      <h3 style={{ marginTop: 0 }}>
        ⏱ {playerName ? `${playerName}'s Timer` : 'Court Timer'}
      </h3>

      <div style={{
        fontSize: '48px',
        fontWeight: 'bold',
        color: isRunning ? '#1D9E75' : '#333',
        marginBottom: '20px',
        letterSpacing: '2px',
      }}>
        {formatTime(seconds)}
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        {!isRunning ? (
          <button
            onClick={handleStart}
            style={{
              padding: '8px 20px',
              backgroundColor: '#1D9E75',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Start
          </button>
        ) : (
          <button
            onClick={handlePause}
            style={{
              padding: '8px 20px',
              backgroundColor: '#e67e22',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Pause
          </button>
        )}

        <button
          onClick={handleReset}
          style={{
            padding: '8px 20px',
            backgroundColor: '#eee',
            color: '#333',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;
