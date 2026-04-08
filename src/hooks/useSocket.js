import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SERVER_URL = 'http://localhost:5000';

function useSocket() {
  const [socket, setSocket] = useState(null);
  const [queue, setQueue] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Connect to server
    const newSocket = io(SERVER_URL);
    setSocket(newSocket);

    // Connection established
    newSocket.on('connect', () => {
      console.log('Connected to CourtQueue server');
      setConnected(true);
    });

    // Receive queue updates from server
    newSocket.on('queue-update', (updatedQueue) => {
      setQueue(updatedQueue);
    });

    // Connection lost
    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      setConnected(false);
    });

    // Cleanup on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Join queue function
  const joinQueue = (name, court) => {
    if (socket) {
      socket.emit('join-queue', { name, court });
    }
  };

  // Leave queue function
  const leaveQueue = (playerId) => {
    if (socket) {
      socket.emit('leave-queue', playerId);
    }
  };

  return { queue, connected, joinQueue, leaveQueue };
}

export default useSocket;
