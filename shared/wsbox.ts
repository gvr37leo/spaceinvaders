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

// class onClientUpdatePackage{
//     constructor(public delta:number,public version:number){

//     }
// }

// class onServerUpdatePackage{
//     constructor(public val:number,public version:number){

//     }
// }

// class HistoryEntry{
//     // ack:boolean
//     val:number
//     version:number
// }

// class Client{

//     onupdate:EventSystem<onClientUpdatePackage> = new EventSystem()
//     val:number = 0
//     prediction:number = 0
//     interpolatedValue:number = 0
//     version:number = 0
//     history:onClientUpdatePackage[] = []
//     lag = 2200

//     constructor(server:Server){
//     }

//     onReceiveServerUpdate(e:onServerUpdatePackage){
//         setTimeout(() => {
//             if(this.history.length > 0){
//                 var latestindex = e.version - this.history[0].version
//                 var latest = this.history[latestindex]
//                 this.history.splice(0,latestindex + 1)
//                 //cut away history from before the the version that was just received
                
//                 //reconstruct from remaining updates
//                 this.val = e.val
//                 var latestval = e.val
//                 for(var i = 0; i < this.history.length; i++){
//                     latestval += this.history[i].delta
//                 }
//                 if(this.prediction != latestval){
//                     this.prediction = latestval
//                     console.log(`misprediction: predicted ${this.prediction} but was ${latestval}`)
//                 }else{
//                     console.log(`latest:${latestval} prediction:${this.prediction}`)
//                 }
//             }
//         },this.lag)
//     }

//     add(delta:number){
//         var clientPackage = new onClientUpdatePackage(delta,this.version)
//         this.history.push(clientPackage)
//         this.onupdate.trigger(clientPackage,null)
//         this.prediction += delta
//         this.version++
//     }
// }

// class ClientEntry{
//     client:Client
//     val:number
//     backlog:onClientUpdatePackage[] = []
// }

// class Server{

//     clients:ClientEntry[] = []
//     onupdate:EventSystem<onServerUpdatePackage> = new EventSystem()
//     updateRate = 3000

//     constructor(){
//         setInterval(() => {
//             for(var clientEntry of this.clients){
//                 if(clientEntry.backlog.length > 0 ){
//                     for(var entry of clientEntry.backlog){
//                         clientEntry.val += entry.delta
//                     }
//                     var lastversion = clientEntry.backlog.slice(-1)[0].version
//                     clientEntry.backlog = []
//                     client.onReceiveServerUpdate(new onServerUpdatePackage(clientEntry.val,lastversion))
//                 }
//             }
//         },this.updateRate)
//     }

//     addClient(client:Client){
//         var clientEntry = new ClientEntry()
//         clientEntry.client = client
//         clientEntry.val = 0
//         this.clients.push(clientEntry)
//         client.onupdate.listen(e => {
//             clientEntry.backlog.push(e)
//         })
//     }
// }