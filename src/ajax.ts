function getLobbys(){
    return get('lobby', new Filter(0,100,'id',true,[]))
}

function getLobby(id:number){
    return get('lobby', new Filter(0,1,'id',true,[new Prop('id',Comparator.eq,id)]))
}

function getPlayers(lobbyid:number){
    return get('player',new Filter(0,100,'id',true,[new Prop('lobby',Comparator.eq,lobbyid)]))
}

function delLobby(lobbyid:number){
    return del('lobby',[lobbyid]).then(v => v[0])
}

function createLobby(lobby){
    return create('lobby',[lobby]).then(a => a[0])
}

enum Comparator{gt,gte,lt,lte,eq,neq}

class Prop{
    constructor(
        public prop:string,
        public comparator:Comparator,
        public value:number,
    ){

    }
}

class Filter{
    constructor(
        public skip:number,
        public take:number,
        public orderby:string,
        public orderAsc:boolean,
        public props:Prop[],
    ){

    }
}

class FilterResult{
    data:any[]
    tablesize:number
    unpagedResultSize:number
}

function get(table:string,filter:Filter):Promise<FilterResult>{
    return fetch(`/api/search/${table}`,{
        method:'POST',
        body:JSON.stringify(filter),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => {
        return res.json()
    })
}

function create(table:string,objects:any[]):Promise<number[]>{
    return fetch(`/api/${table}`,{
        method:'POST',
        body:JSON.stringify(objects),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => {
        return res.json()
    })
}

function update(table:string,objects:any[]):Promise<number[]>{
    return fetch(`/api/${table}`,{
        method:'PUT',
        body:JSON.stringify(objects),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => {
        return res.json()
    })
}

function del(table:string,ids:number[]):Promise<number[]>{
    return fetch(`/api/${table}`,{
        method:'DELETE',
        body:JSON.stringify(ids),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => {
        return res.json()
    })
}