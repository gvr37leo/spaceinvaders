/// <reference path="../node_modules/eventsystemx/EventSystem.ts" />


class Rule{

    constructor(public message:string,public cb:() => boolean){

    }
}

class Ability{
    // ammo:number = 1
    // maxammo:number = 1

    cooldown:number = 1000
    lastfire = Date.now()
    rules:Rule[] = [
        new Rule('not ready yet',() => (this.lastfire + this.cooldown) < Date.now())
    ]

    onCastFinished = new EventSystemVoid()

    

    constructor(public cb:() => void){

    }


    tryfire(){
        if(this.rules.some(r => r.cb())){
            this.cb()
            this.lastfire = Date.now()
        }
            
    }
}