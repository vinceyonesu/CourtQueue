import React, { useState } from 'react';

function JoinForm({ onJoin }) {
  const [name, setName] = useState('');
  const [court, setCourt] = useState('Court 1');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    onJoin(name, court);
    setName('');
    setError('');
  };

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f9f9f9',
      border: '1px solid #ddd',
      borderRadius: '8px',
      maxWidth: '400px',
    }}>
      <h3 style={{ marginTop: 0 }}>Join the Queue</h3>

      {error && (
        <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>
      )}

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
          Your Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
          }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
          Select Court
        </label>
        <select
          value={court}
          onChange={(e) => setCourt(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
          }}
        >
          <option>Court 1</option>
          <option>Court 2</option>
          <option>Court 3</option>
        </select>
      </div>

      <button
        onClick={handleSubmit}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#1D9E75',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '15px',
          cursor: 'pointer',
        }}
      >
        Join Queue
      </button>
    </div>
  );
}

export default JoinForm;
