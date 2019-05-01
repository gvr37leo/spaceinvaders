class Ship{
    speed = 200
    shootcooldown = 200
    lastshottime = Date.now()

    constructor(public pos:Vector){

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
        if((this.lastshottime + this.shootcooldown) < Date.now()){
            bullets.push(new Bullet(this.pos.c(),new Vector(0,-300)))
            this.lastshottime = Date.now()
        }
    }

    draw(ctxt){
        this.pos.draw(ctxt)
    }
}