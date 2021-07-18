import './config/env'
import express from 'express'
import path from 'path'
import cors from 'cors'
import morgan from 'morgan'
import socket from 'socket.io'
import http from 'http'
import 'express-async-errors'

import './database/connection'

import routes from './routes'
import errorHandler from './errors/handler'

const app = express()
const httpServer = http.createServer(app)
const io = socket(httpServer)

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorHandler)

const clients : Array<any> = []

io.on('connection', (client: any) => {
    console.log(`Usuário connectado ${client.id}`)
    clients.push(client)

    client.on('disconnect', () => {
        clients.splice(clients.indexOf(client), 1)
        console.log(`Usuário desconectado ${client.id}`)
    })
})

httpServer.listen(3333, () => {
    console.log("Conectado ao Servidor!")
})
