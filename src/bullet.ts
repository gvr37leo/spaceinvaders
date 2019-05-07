
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

class BulletSpawner{
    
    targetAngle:Vector = new Vector(0,1)
    anim:Anim = new Anim()
    ability:Ability
    


    constructor(public bulletspeed:number, public pos:Vector){
        this.anim.animType = AnimType.extend
        this.anim.duration = 1000
        this.anim.begin = 0.3
        this.anim.end = 0.5
        this.anim.stopwatch.start()

        this.ability = new Ability(() => {
            var dir = this.targetAngle.c()
            var offset = this.anim.get()
            dir.rotate2d(offset * TAU).scale(this.bulletspeed)
            var bullet = new Bullet(this.pos.c(), dir)
            bullets.push(bullet)
        })
        this.ability.cooldown = 100
    }

    update(){
        this.ability.tryfire()
    }


}