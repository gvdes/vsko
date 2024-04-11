module.exports = (io) => {
    const preventa = io.of('/preventa')
    console.log('si se importo preventa')
    // console.log(preventa)
    preventa.on('connection', socket => {
        console.log(socket.id)
        console.log('conexion desde preventa')
    })
}