module.exports = (io) => {
    const preventa = io.of('/preventa')
    console.log('si se importo preventa')
    preventa.on('connection', (pvt) => {
        console.log(`Conexion Id ${pvt.id}`);
        console.log(`conexion desde preventa ${pvt.id}`)

        pvt.on('ParametrosConexion', (param) => {
            const room = param.join //creacion de room 
            const cuenta = param.account.nick //cuenta conectada
            pvt.join(room);

            console.log(`usuario ${cuenta} ingreso al room ${room}`)

            pvt.in(room).allSockets().then((sockets) => {
                const users = Array.from(sockets);
                preventa.to(room).emit('updateUserList', users);
            });

            pvt.on('CreacionPedido', (parametros) => {
                console.log(parametros._store)
                preventa.to(room).emit('PedidoCreado',parametros)
            })
        })
        pvt.on('disconnect',() =>{
            console.log('medesconecte');
        })
    }) 
}