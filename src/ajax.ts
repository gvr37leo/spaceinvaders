function getLobbys(){
    fetch('')
    .then(res => res.json())
    .then(data => {

    })
}

function getPlayers(){

}

enum Comparator{gt,gte,lt,lte,eq,neq}

class Prop{
    prop:string
    comparator:Comparator
    value:number
}

class Filter{
    skip:number
    take:number
    orderAsc:boolean
    props:Prop[]
}

function get(table:string,filter:Filter):Promise<any[]>{
    
    fetch(`/api/${table}`,{
        method:'POST',
        body:JSON.stringify(filter)
    })


    return null
}