class Store<T>{
    data:Map<number,T>
    idcounter:number

    constructor(){
        this.data = new Map()
        this.idcounter = 0
    }

    add(obj:any){
        obj.id = this.idcounter
        this.data.set(obj.id,obj)
        this.idcounter++
        return obj.id
    }

    get(id:number){
        return this.data.get(id)
    }

    update(id:number,obj:any){
        if(this.data.has(id)){
            this.data.set(id,obj)
            return true
        }else{
            return false
        }
        
    }

    del(id:number){
        return this.data.delete(id)
    }
}

class DB{
    stores:Map<string,Store<any>>

    constructor(){
        this.stores = new Map()
        this.stores.set('lobby',new Store())
        this.stores.set('player',new Store())
        this.stores.set('')
    }

    getStore(name:string){
        return this.stores.get(name)
    }
}