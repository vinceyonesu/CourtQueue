import React, { useState } from 'react';

function Admin() {
  const [courts, setCourts] = useState([
    { id: 1, name: 'Court 1', status: 'available' },
    { id: 2, name: 'Court 2', status: 'available' },
    { id: 3, name: 'Court 3', status: 'available' },
  ]);

  const resetCourt = (courtId) => {
    setCourts(courts.map(court =>
      court.id === courtId
        ? { ...court, status: 'available' }
        : court
    ));
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>Admin Panel</h2>
      <p>Manage courts and reset the queue.</p>
      {courts.map(court => (
        <div key={court.id} style={{ marginBottom: '10px' }}>
          <strong>{court.name}</strong> — {court.status}
          <button
            onClick={() => resetCourt(court.id)}
            style={{ marginLeft: '10px' }}
          >
            Reset
          </button>
        </div>
      ))}
    </div>
  );
}

export default Admin;
