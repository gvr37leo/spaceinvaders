var express = require('express')
var app = express()
var WebSocket = require('ws')
var path = require('path')
// var {Lobby,Player,SBox} = require('serversrc/lobby.js')

var wss = new WebSocket.Server({port:8080})

var lobbys = []
var players = []

wss.on('connection',(ws,req) => {

    var sbox = new SBox(ws)

    sbox.listen('gamestart',() => {

    })



    ws.on('close', (code,reason) => {
        
    })
})

app.use(express.static('./'))

app.get('lobbys',(req,res) => {
    res.send({
        lobbys,
        players,
    })
})

app.all('/*', function(req, res, next) {
    res.sendFile(path.resolve('index.html'));
});


app.listen(8000, () => {
    console.log('listening')
})

