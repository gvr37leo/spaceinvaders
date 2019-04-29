class WsBox{
    socket: WebSocket;

    constructor(url:string){
        this.socket = new WebSocket(url)
        this.socket.addEventListener('open', () => {

        })

        this.socket.addEventListener('close', () => {

        })
    }

    send(type:string,data:any){
        this.socket.send(JSON.stringify({
            type:type,
            data:data,
        }))
    }

    listen(type:string,cb:(data:any) => void){
        this.socket.addEventListener('message',e => {
            var res = JSON.parse(e.data)
            if(res.type == type){
                cb(res.data)
            }
        })
    }
}

class ClientUpdate{
    constructor(public val:number,public version:number){

    }
}

class HistoryEntry{
    ack:boolean
    val:number
    version:number
}

class Client{

    onupdate:EventSystem<ClientUpdate>
    val:number
    prediction:number
    interpolatedValue:number
    version:number
    history:HistoryEntry[]

    constructor(server:Server){

    }

    add(delta:number){

        this.prediction += delta
        this.onupdate.trigger(new ClientUpdate(delta,this.version),null)
        this.version++
    }
}


class ClientEntry{
    client:Client
    val:number
    
}

class Server{

    clients:ClientEntry[] = []

    backlog:ClientUpdate[]

    constructor(){
        setInterval(() => {
            for(var client of this.clients){

            }
        },3000)
    }

    addClient(client:Client){
        client.onupdate.listen(e => {
            this.backlog.push(e)
        })
    }

}