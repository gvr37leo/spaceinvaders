/// <reference path="../node_modules/@types/ws/index.d.ts" />




class Lobby{
    game
    constructor(){


    }

    getPlayers(db,store){

    }
}

class Player{
    lobby:number
}


class SBox{
    

    constructor(public socket:WebSocket){
        this.socket = socket
        this.socket.addEventListener('open', () => {

        })

        this.socket.addEventListener('close', () => {

        })
    }

    send(type:string,data){
        this.socket.send(JSON.stringify({
            type:type,
            data:data,
        }))
    }

    listen(type:string,cb){
        this.socket.addEventListener('message',e => {
            var res = JSON.parse(e.data)
            if(res.type == type){
                cb(res.data)
            }
        })
    }
}

module.exports = {
    Lobby,
    Player,
    SBox,
}