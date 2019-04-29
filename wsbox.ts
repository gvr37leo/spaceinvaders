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
        server
    }

    add(delta:number){
        this.prediction += delta
        this.onupdate.trigger(new ClientUpdate(delta,this.version),null)
        this.version++
    }

    receiveServerUpdate(){

    }
}


class ClientEntry{
    client:Client
    val:number
    backlog:ClientUpdate[] = []
}

class Server{

    clients:ClientEntry[] = []
    onupdate:EventSystem<number>
   

    constructor(){
        setInterval(() => {
            for(var client of this.clients){
                var acks = []
                for(var entry of client.backlog){
                    client.val += entry.val
                    
                    acks.push({
                            
                    })
                }
                client.backlog = []
                
            }
        },3000)
    }

    addClient(client:Client){
        var clientEntry = new ClientEntry()
        clientEntry.client = client
        clientEntry.val = 0
        this.clients.push(clientEntry)
        client.onupdate.listen(e => {
            clientEntry.backlog.push(e)
        })
    }
}