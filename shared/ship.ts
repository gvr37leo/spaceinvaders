/// <reference path="ability.ts" />
/// <reference path="abilityCatalog.ts" />



class Ship{
    speed = 200
    shootcooldown = 200
    lastshottime = Date.now()
    shootability: Ability;

    constructor(public pos:Vector,public gamedb:GameDB){
        // this.shootability = new Ability(() => {
        //     bullets.push(new Bullet(this.pos.c(),new Vector(0,-300)))
        //     gunshot.play()
        // })
        this.shootability = createOrderlyShotgunBlastAbility(this.pos,gamedb)
    }

    update(dt){
        // var move = getMoveInputYFlipped()
        // if(move.length() > 0){
        //     move.normalize()
        // }
        // this.pos.add(move.scale(this.speed).scale(dt))

        // if(keys[32]){
        //     this.shoot()
        // }
    }

    shoot(){

        this.shootability.tryfire()
    }

    draw(ctxt){
        this.pos.draw(ctxt)
    }
}