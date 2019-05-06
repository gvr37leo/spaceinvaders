
class Bullet{
    
    createdAt = Date.now()
    lifespan = 2000

    constructor(public pos:Vector, public vel:Vector){
        
    }

    update(dt){
        this.pos.add(this.vel.c().scale(dt))
    }

    draw(ctxt){
        this.pos.draw(ctxt)
    }
}

enum AnimType{once,repeat,pingpong,extend}

class Anim{
    animType:AnimType = AnimType.once
    reverse:boolean
    duration:number = 1000
    stopwatch:StopWatch = new StopWatch()


    path:Vector[] = []
    begin:number = 0
    end:number = 1
    curve:number

    constructor(){

    }

    get(){
        switch (this.animType) {
            case AnimType.once:
                
                break;
            case AnimType.once:
                
                break;
            case AnimType.once:
                
                break;
            case AnimType.once:
                
                break;
        }
    }
}

class BulletSpawner{
    
    firerate:number
    bulletspeed:number
    targetAngle:number
    anim:Anim


    constructor(){
        this.anim = new Anim()
        this.anim.animType = AnimType.pingpong
        this.anim.duration = 1000
        this.anim.begin = 0
        this.anim.end = 1
    }


}