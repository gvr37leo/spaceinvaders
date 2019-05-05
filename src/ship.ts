class Ship{
    speed = 200
    shootcooldown = 200
    lastshottime = Date.now()
    shootability: Ability;

    constructor(public pos:Vector){
        this.shootability = new Ability(() => {
            bullets.push(new Bullet(this.pos.c(),new Vector(0,-300)))
        })
    }

    update(dt){
        var move = getMoveInputYFlipped()
        if(move.length() > 0){
            move.normalize()
        }
        this.pos.add(move.scale(this.speed).scale(dt))

        if(keys[32]){
            this.shoot()
        }
    }

    shoot(){

        this.shootability.tryfire()
    }

    draw(ctxt){
        this.pos.draw(ctxt)
    }
}