const allowedSites = [
    'http://localhost:9000',
];

const { Server } = require('socket.io');

const io = new Server({cors:{ origin:allowedSites }});

require('./preventa.js')(io)
require('./resurtido.js')(io)

io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

io.listen(3000);