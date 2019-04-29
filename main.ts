/// <reference path="node_modules/utilsx/utils.ts" />
/// <reference path="node_modules/vectorx/vector.ts" />
/// <reference path="node_modules/eventsystemx/EventSystem.ts" />
/// <reference path="wsbox.ts" />

var crret = createCanvas(500,500)
var canvas = crret.canvas
var ctxt = crret.ctxt

var socket = new WsBox('ws://localhost:8080/')

socket.listen('test',e => {
    console.log(e)
})

// loop((dt) => {
//     ctxt.clearRect(0,0,500,500)

//     ctxt.fillRect(10,10,10,10)
// })
