module.exports = (io) => {
    const resurtido = io.of('/resurtido')
    console.log('si se importo resurtido')
    resurtido.on('connection', socket => {
        console.log(socket.id)
        console.log('conexion desde resurtido')
    })
}