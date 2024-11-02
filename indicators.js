module.exports = (io) => {
    console.log('si se importo indicadores')

    const indicators = io.of('/indicadores')
    indicators.on('connection', (ind) => {
        console.log(`Conexion Id ${ind.id}`);
        console.log(`conexion desde indicadores ${ind.id}`)
        ind.on('actForms', (param) => {
            console.log(param.id)
            indicators.emit('NotifyForm',param)
        })
    }) 
}