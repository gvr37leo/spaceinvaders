var express = require('express')
var app = express()
var WebSocket = require('ws')

var wss = new WebSocket.Server({port:8080})
wss.on('connection',(ws,req) => {
    ws.on('message', data => {

    })

    setInterval(() => {
        ws.send(JSON.stringify({
            message:'yo'
        }))
    },1000)
    
})

app.use(express.static('./'))

app.listen(8000, () => {
    console.log('listening')
})