const allowedSites = [
    'http://localhost:9000',
];

const { Server } = require('socket.io');


const io = new Server({cors:{ origin:allowedSites }});

io.on("connection", (socket) => {
console.log(socket.id)

});

io.listen(3000);