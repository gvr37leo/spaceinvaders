/// <reference path="lobby.ts" />


var express = require('express')
var app = express()
var wsWebSocket = require('ws')
var path = require('path')
var bodyParser = require('body-parser')
app.use(bodyParser.json())
var wss = new wsWebSocket.Server({port:8080})

class Store{
    data
    idcounter

    constructor(){
        this.data = new Map()
        this.idcounter = 0
    }

    add(obj){
        obj.id = this.idcounter
        this.data.set(obj.id,obj)
        this.idcounter++
        return obj.id
    }

    get(id){
        return this.data.get(id)
    }

    update(id,obj){
        if(this.data.has(id)){
            this.data.set(id,obj)
            return true
        }else{
            return false
        }
        
    }

    del(id){
        return this.data.delete(id)
    }
}

class DB{
    stores

    constructor(){
        this.stores = new Map()
        this.stores.set('lobby',new Store())
        this.stores.set('player',new Store())
    }

    getStore(name){
        return this.stores.get(name)
    }
}
var db = new DB()

wss.on('connection',(ws,req) => {

    var sbox = new SBox(ws)
    sbox.listen('join',(data) => {
        var playerstore = db.getStore('player')
        var player = new Player()
        player.lobby = data
        var id = playerstore.add(player)
        ws.on('close', (code,reason) => {
            playerstore.del(id)
        })
    })
    // sbox.listen('gamestart',() => {

    // })

    ws.on('close', (code,reason) => {
        
    })
})

app.use(express.static('../'))

app.post('/api/:table', (req,res,next) => {
    var store = db.getStore(req.params.table)
    var ids = []
    for(var obj of req.body){
        ids.push(store.add(obj))
    }
    res.send(ids)
})

app.post('/api/search/:table', (req,res,next) => {
    var store = db.getStore(req.params.table)
    var result = []
    var objects = Array.from(store.data.values())

    
    res.send({
        data:objects,
        tablesize:0,
        unpagedResultSize:0,
    })
})

app.put('/api/:table', (req,res,next) => {
    var store = db.getStore(req.params.table)
    var ids = []
    for(var obj of req.data){
        ids.push(store.update(obj.id,obj))
    }
    res.send(ids)
})

app.delete('/api/:table',(req,res,next) => {
    var store = db.getStore(req.params.table)
    var ids = []
    for(var id of req.body){
        if(store.del(id)){
            ids.push(id)
        }
    }
    res.send(ids)
})

app.all('/*', function(req, res, next) {
    res.sendFile(path.resolve('index.html'));
});


app.listen(8000, () => {
    console.log('listening')
})

