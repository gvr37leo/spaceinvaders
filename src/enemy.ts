class Enemy{
    
    health = 100
    path:Vector[] = []
    speed = 100
    hitbox = new Rect(new Vector(-30,-30),new Vector(30,30))
    

    constructor(public pos:Vector, public spawntimeMil:number){

    }

    update(time){
        this.pos = pinpointpath(100,to(this.spawntimeMil,time),this.path)
        this.hitbox.moveEdgeTo(this.pos,new Vector(0.5,0.5))
    }

    draw(ctxt){
        this.pos.draw(ctxt)
        this.hitbox.draw(ctxt)
    }
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
