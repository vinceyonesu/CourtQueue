import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>🎾 Welcome to CourtQueue</h1>
      <p>Join the queue and track your wait time in real time.</p>
      <button onClick={() => navigate('/queue')}>
        Join the Queue
      </button>
    </div>
  );
}

export default Home;
