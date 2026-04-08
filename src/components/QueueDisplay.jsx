import React from 'react';

function QueueDisplay({ players }) {
  if (players.length === 0) {
    return (
      <div style={{ marginTop: '30px' }}>
        <h3>Current Queue</h3>
        <p style={{ color: '#888' }}>No players in queue yet. Be the first to join!</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '30px' }}>
      <h3>Current Queue</h3>
      {players.map((player) => (
        <div
          key={player.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            padding: '12px 20px',
            marginBottom: '10px',
            backgroundColor: player.status === 'playing' ? '#E1F5EE' : '#f9f9f9',
            border: '1px solid #ddd',
            borderRadius: '8px',
          }}
        >
          {/* Position badge */}
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#1D9E75',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '16px',
            flexShrink: 0,
          }}>
            {player.position}
          </div>

          {/* Player info */}
          <div style={{ flex: 1 }}>
            <strong>{player.name}</strong>
            <span style={{ marginLeft: '10px', color: '#888', fontSize: '14px' }}>
              {player.court}
            </span>
          </div>

          {/* Status badge */}
          <div style={{
            padding: '4px 10px',
            borderRadius: '20px',
            fontSize: '13px',
            backgroundColor: player.status === 'playing' ? '#1D9E75' : '#eee',
            color: player.status === 'playing' ? 'white' : '#555',
          }}>
            {player.status === 'playing' ? 'Playing' : 'Waiting'}
          </div>
        </div>
      ))}
    </div>
  );
}

export default QueueDisplay;
