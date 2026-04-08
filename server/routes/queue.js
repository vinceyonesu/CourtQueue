const express = require('express');
const router = express.Router();

// In-memory queue for now
let queue = [];

// GET all players in queue
router.get('/', (req, res) => {
  res.json(queue);
});

// POST join queue
router.post('/join', (req, res) => {
  const { name, court } = req.body;

  if (!name || !court) {
    return res.status(400).json({ error: 'Name and court are required' });
  }

  const player = {
    id: Date.now(),
    name,
    court,
    position: queue.length + 1,
    joinedAt: new Date(),
    status: 'waiting'
  };

  queue.push(player);
  res.status(201).json(player);
});

// DELETE leave queue
router.delete('/leave/:id', (req, res) => {
  const { id } = req.params;
  queue = queue.filter(player => player.id !== parseInt(id));

  // Recalculate positions
  queue = queue.map((player, index) => ({
    ...player,
    position: index + 1
  }));

  res.json({ message: 'Player removed from queue', queue });
});

// PATCH update player status
router.patch('/status/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  queue = queue.map(player =>
    player.id === parseInt(id)
      ? { ...player, status }
      : player
  );

  res.json({ message: 'Status updated', queue });
});

module.exports = router;
