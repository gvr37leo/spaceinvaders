
class Lobby{
    game
    constructor(){


    }

    getPlayers(db,store){

    }
}

class Player{
    lobby
}


class SBox{
    socket

    constructor(socket){
        this.socket = socket
        this.socket.addEventListener('open', () => {

        })

        this.socket.addEventListener('close', () => {

        })
    }

    send(type,data){
        this.socket.send(JSON.stringify({
            type:type,
            data:data,
        }))
    }

    listen(type,cb){
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