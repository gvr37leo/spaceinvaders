
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

    get():number{
        switch (this.animType) {
            case AnimType.once:
                return clamp(lerp(this.begin,this.end,this.stopwatch.get() / this.duration),this.begin,this.end) 
            case AnimType.repeat:
                return lerp(this.begin,this.end,this.stopwatch.get() % this.duration)
            case AnimType.pingpong:
                return lerp(this.begin,this.end,this.stopwatch.get() % this.duration)
            case AnimType.extend:
                var dist = to(this.begin,this.end)
                var cycles = this.stopwatch.get() / this.duration
                return cycles * dist
        }
    }
}

class BulletSpawner{
    
    firerate:number
    bulletspeed:number
    targetAngle:Vector = new Vector(0,1)
    anim:Anim
    ability:Ability
    pos:Vector


    constructor(){
        this.anim = new Anim()
        this.anim.animType = AnimType.pingpong
        this.anim.duration = 1000
        this.anim.begin = -1
        this.anim.end = 1
        this.anim.stopwatch.start()

        this.ability = new Ability(() => {
            var dir = this.targetAngle.c()
            var offset = this.anim.get()
            dir.rotate2d(offset * TAU).scale(this.bulletspeed)
            var bullet = new Bullet(this.pos.c(), dir)
            bullets.push(bullet)
        })
        this.ability.cooldown = this.firerate
    }

    update(){
        this.ability.tryfire()
    }


}