const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.use(cors());

const io = socket(server);

io.on('connection', socket => {
  console.log(socket.id);

  socket.on('SEND_MESSAGE', data => {
    io.emit('RECEIVE_MESSAGE', data);
  });
});
