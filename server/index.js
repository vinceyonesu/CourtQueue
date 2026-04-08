const express = require('express');
const http = require('http');
const cors = require('cors');
const queueRoutes = require('./routes/queue');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/queue', queueRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('CourtQueue server is running!');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };
