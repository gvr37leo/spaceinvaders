class Enemy{
    
    health = 100
    path:Vector[] = []
    pathlength:number
    speed = 100
    hitbox = new Rect(new Vector(-30,-30),new Vector(30,30))
    shootability: Ability;

    constructor(public pos:Vector, public spawntimeMil:number){
        this.shootability = new Ability(() => {
            enemybullets.push(new Bullet(this.pos.c(),new Vector(0,300)))
        })
    }

    update(time){
        this.pos = pinpointpath(100,to(this.spawntimeMil,time),this.path)
        this.hitbox.moveEdgeTo(this.pos,new Vector(0.5,0.5))
        this.shootability.tryfire()
    }

    draw(ctxt){
        this.pos.draw(ctxt)
        // this.hitbox.draw(ctxt)
    }

    die(){
        explosion1.play()
        var anim = new AtlasAnimation(images[0],this.pos.c(), new AtlasLayout(1,8,new Vector(48,48),new Vector(0,0),new Vector(0,0)))
        anim.anim.duration = 500
        anim.anim.animType = AnimType.once
        animations.push(anim)
        setTimeout(() => findAndDelete(animations,anim),anim.anim.duration)
    }
}

function calcpathlength(path:Vector[]){
    var total = 0;
    for(var i = 0; i < path.length - 1; i++){
        total += path[i].to(path[i+1]).length()
    }
    return total
}

function generateEnemys(amount:number,start:number,duration:number):Enemy[]{
    var enemys = []

    var rng = new RNG(0)
    return enemys

}

function generateEnemyChain(amount:number,starttimeMil:number,timespaceMil:number,path:Vector[]):Enemy[]{
    var enemys = []

    for(var i = 0; i < amount; i++){
        var enemy = new Enemy(new Vector(0,0),starttimeMil + i * timespaceMil)
        enemy.path = path
        enemy.pathlength = calcpathlength(enemy.path)
        enemys.push(enemy)
    }
    return enemys
}

function pinpointpath(speed:number,timespenttraveling:number,path:Vector[]):Vector{
    var distance = speed * (timespenttraveling / 1000)

    var currentdistance = 0
    for(var i = 0; i < path.length - 1; i++){
        var a = path[i]
        var b = path[i + 1]
        var a2b = a.to(b)
        var mag = a2b.length()
        if(distance <= currentdistance + mag){
            var percentageOfStraightRemaining = to(currentdistance, distance) / mag;
            return a.lerp(b, percentageOfStraightRemaining)
        }else{
            currentdistance += mag
        }
    }
    last
    return last(path).c()
}
