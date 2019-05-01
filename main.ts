/// <reference path="utils.ts" />
/// <reference path="node_modules/vectorx/vector.ts" />
/// <reference path="node_modules/eventsystemx/EventSystem.ts" />
// <reference path="wsbox.ts" />

var crret = createCanvas(500,500)
var canvas = crret.canvas
var ctxt = crret.ctxt


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

class Enemy{
    
    health = 100
    path:Vector[] = []
    

    constructor(public pos:Vector, public spawntime:number, lifespan:number){

    }

    update(dt){
        
    }

    draw(ctxt){
        this.pos.draw(ctxt)
    }
}

var ship = new Ship(new Vector(250,400))
var bullets:Bullet[] = []
var enemys:Enemy[] = generateEnemys(100,)
var activeEnemys:number[] = []

function generateEnemys(amount:number,start:number,duration:number):Enemy[]{
    var enemys = []

    var rng = new RNG(0)
    return enemys

}

function generateEnemyChain(amount:number,start:number,timespace:number,path:Vector[]):Enemy[]{
    var enemys = []

    for(var i = start; i < start + duration; i++){

        var enemy = new Enemy(new Vector(0,0),0,5000)
        enemy.path = [

        ]
        enemys.push(enemy)
    }
    return enemys
}

function pinpointpath(speed:number,timespenttraveling:number,path:Vector[]):Vector{
    var distance = speed * timespenttraveling

    var currentdistance = 0
    for(var i = 0; i < path.length; i++){
        var a = path[i]
        var b = path[i + 1]
        var straight = a.to(b)
        var mag = straight.length()
        if(currentdistance + mag <= distance){
            var percentageOfStraightRemaining = to(currentdistance, distance) / mag;
            return a.lerp(b, percentageOfStraightRemaining)
        }else{
            currentdistance += mag
        }
    }
    last
    return last(path).c()
}

loop(dt => {
    dt /= 1000
    ctxt.clearRect(0,0,500,500)
    ship.update(dt)
    bullets = bullets.filter(b => (b.createdAt + b.lifespan) > Date.now())
    bullets.forEach(b => b.update(dt))


    ship.draw(ctxt)
    bullets.forEach(b => b.draw(ctxt))

})




