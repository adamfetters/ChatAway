const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
require('dotenv').config();
const app = express();

const path = require('path');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const io = socket(server);

io.on('connection', socket => {
  console.log(socket.id);

  socket.on('SEND_MESSAGE', data => {
    io.emit('RECEIVE_MESSAGE', data);
  });
});
