module.exports = (io) => {
    const preventa = io.of('/preventa')
    preventa.on('connection', (pvt) => {
        // console.log(pvt)
        console.log(`Conexion Id ${pvt.id}`);
        console.log(`conexion desde preventa ${pvt.id}`)

        pvt.on('ParametrosConexion', (param) => {
            const room = `_store${param.join}` //creacion de room 
            const cuenta = param.account.nick //cuenta conectada
            pvt.join(room);
            pvt.data = { room }
            console.log(`usuario ${cuenta} ingreso al room ${room}`)
            preventa.in(room).allSockets().then((sockets) => {
                const users = Array.from(sockets);
                console.log(users.length)
                preventa.emit('updateUserList', users);
            });

            pvt.on('CreacionPedido', (parametros) => {
                console.log(parametros._store)
                preventa.to(room).emit('PedidoCreado', parametros)
            })

            pvt.on('ChangeStatusOrder', (params) => {
                // console.log(params)
                preventa.to(room).emit('updOrder', params)
                if (params._state == 2) {
                    preventa.to(room).emit('Checkin', params)
                    // preventa.to(room).emit('updOrder', params)
                } else if (params._state == 3) {
                    preventa.to(room).emit('warehouse', params)
                } else if (params._state == 4) {
                    // preventa.to(room).emit('warehouse',params)
                    // preventa.to(room).emit('updOrder', params)
                    preventa.to(room).emit('delivery', params)
                } else if (params._state == 5) {
                    // preventa.to(room).e
                    // mit('updOrder', params)
                    preventa.to(room).emit('checkout', params)
                } else if (params._state == 6) {
                    // preventa.to(room).emit('updOrder', params)
                    // preventa.to(room).emit('checkout',params)
                }
            })

            pvt.on('ChangeStateConfig', (params) => {
                // console.log(params)
                preventa.to(room).emit('changeStateConfig', params)
            })
        })
        pvt.on('disconnect', () => {
            console.log('me desconecté de Preventa');

            const room = pvt.data?.room; // Recuperamos el room

            if (room) {
                pvt.in(room).allSockets().then((sockets) => {
                    const users = Array.from(sockets);
                    preventa.to(room).emit('updateUserList', users);
                });
            }
        })
    })
}