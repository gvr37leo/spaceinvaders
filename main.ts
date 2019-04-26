/// <reference path="node_modules/utilsx/utils.ts" />
/// <reference path="node_modules/vectorx/vector.ts" />

var crret = createCanvas(500,500)
var canvas = crret.canvas
var ctxt = crret.ctxt

var socket = new WebSocket('ws://localhost:8080/')
socket.addEventListener('message',e => {
    console.log(JSON.parse(e.data))
})

loop((dt) => {
    ctxt.clearRect(0,0,500,500)

    ctxt.fillRect(10,10,10,10)
})
