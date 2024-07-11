
import express from 'express'
import { addLogger } from './utils/logger.js'

const app = express()
app.use(addLogger) //Utilizo el Middleware

app.get('/', (req, res) => {
    try {
        res.send("Hola")
        req.logger.error("ERROR")
    } catch (e) {
        req.logger.error(e)
        res.status(500).send(e)
    }

})

app.get('/suma', (req, res) => {
    try {
        let suma = 0
        for (let i = 0; i < 10000; i++) {
            suma += 1
        }
        res.status(200).send(`El resultado de la suma es ${suma}`)
    } catch (e) {
        console.log(e)
        req.logger.error(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        res.status(500).send(e)
    }
})

app.get('/multiplicacion', (req, res) => {
    try {
        let multiplicacion = 1
        for (let i = 0; i < 4000; i++) {
            multiplicacion *= 1
        }
        res.status(200).send(`El resultado de la multiplicacion es ${multiplicacion}`)
    } catch (e) {
        req.logger.error(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        res.status(500).send(e)
    }

})


app.listen(4000, () => console.log("Server on port 4000"))

