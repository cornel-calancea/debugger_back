var express = require('express');
var router = express.Router();

const io = require('socket.io')(3001, {
  cors: {
    origin: "*",
  }
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// socket connections
io.on('connection', (socket) => {
  socket.removeAllListeners();
  console.log('a user connected ');

  socket.on('connect-lobby', (id) => {
    socket.join(id);
    console.log("user join " + id)
    io.to(id).emit("lobby-ack");
  });

  socket.on('diconnect-lobby', (id) => {
    console.log("user leave " + id)
    io.to(id).emit("lobby-ack");
  });

  socket.on('check-room', (id) => {
    if (socket.adapter.rooms.get(id) === undefined ||
      !socket.adapter.rooms.get(id).has(socket.id)) {
      console.log("user rejoin " + id)
      socket.join(id);
    }
  });

  socket.on('start-game', (id) => {
    console.log("user started game");
    io.to(id).emit('start-game-ack');
  })

  socket.on('pos-update', ({ id, idPos, newPos }) => {
    console.log("user moved", id, idPos, newPos);
    io.to(id).emit('move-ack', { idPos, newPos });
  })

  socket.on('bug-update', ({ id, idPlayer, idBug }) => {
    let timestamp = new Date().getTime();
    console.log("bug was attacked", id, idPlayer, idBug, timestamp);

    io.to(id).emit('bug-ack', { idPlayer, idBug, timestamp });
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

module.exports = router;
