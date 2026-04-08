const { Server } = require('socket.io');

let queue = [];

function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log(`Player connected: ${socket.id}`);

    // Send current queue to newly connected player
    socket.emit('queue-update', queue);

    // Player joins queue
    socket.on('join-queue', (playerData) => {
      const player = {
        id: socket.id,
        name: playerData.name,
        court: playerData.court,
        position: queue.length + 1,
        joinedAt: new Date(),
        status: 'waiting'
      };
      queue.push(player);

      // Broadcast updated queue to all connected players
      io.emit('queue-update', queue);
      console.log(`${player.name} joined the queue at position ${player.position}`);
    });

    // Player leaves queue
    socket.on('leave-queue', (playerId) => {
      queue = queue.filter(player => player.id !== playerId);

      // Recalculate positions
      queue = queue.map((player, index) => ({
        ...player,
        position: index + 1
      }));

      // Broadcast updated queue to all connected players
      io.emit('queue-update', queue);
    });

    // Player disconnects
    socket.on('disconnect', () => {
      queue = queue.filter(player => player.id !== socket.id);
      queue = queue.map((player, index) => ({
        ...player,
        position: index + 1
      }));
      io.emit('queue-update', queue);
      console.log(`Player disconnected: ${socket.id}`);
    });
  });

  return io;
}

module.exports = initSocket;
