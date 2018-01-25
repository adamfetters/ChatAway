const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const app = express();

const server = app.listen(5000, () => {
  console.log('Server listening on port 5000');
});

app.use(cors());

const io = socket(server);

io.on('connection', socket => {
  console.log(socket.id);

  socket.on('SEND_MESSAGE', data => {
    io.emit('RECEIVE_MESSAGE', data);
  });
});
