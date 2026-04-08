import React, { useState } from 'react';
import QueueDisplay from '../components/QueueDisplay';
import JoinForm from '../components/JoinForm';

function Queue() {
  const [players, setPlayers] = useState([]);

  const handleJoin = (playerName, court) => {
    const newPlayer = {
      id: Date.now(),
      name: playerName,
      court: court,
      position: players.length + 1,
    };
    setPlayers([...players, newPlayer]);
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>Court Queue</h2>
      <JoinForm onJoin={handleJoin} />
      <QueueDisplay players={players} />
    </div>
  );
}

export default Queue;
