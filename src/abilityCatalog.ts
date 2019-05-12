function createAimedShotAbility(pos:Vector,target:Vector,gamedb:GameDB){
    var speed = 100
    return new Ability(() => {
        gamedb.friendlyBullets.push(new Bullet(pos.c(),pos.to(target).normalize().scale(speed))) 
    })
    
}

function createInstantRingAbility(pos:Vector,gamedb:GameDB){
    var amount = 20
    var speed = 100
    return new Ability(() => {
        for(var i = 0; i < amount; i++){
            gamedb.friendlyBullets.push(new Bullet(pos.c(),new Vector(0,1).rotate2d(i / amount * TAU).scale(speed)))
        }
    })
}

function createLoopingRingAbility(pos:Vector,updateEvent:EventSystem<number>){
    var speed = 100
    return new Ability(() => {
        var bulletSpawner = new BulletSpawner(speed,pos)
        bulletSpawner.anim.animType = AnimType.extend
        bulletSpawner.anim.begin = 0
        bulletSpawner.anim.end = 1
        bulletSpawner.anim.duration = 1000
        bulletSpawner.anim.stopwatch.start()
        bulletSpawner.ability.cooldown = 100
        var action = dt => {
            bulletSpawner.update()
        }
        updateEvent.listen(action)
        setTimeout(() => {
            updateEvent.deafen(action)
        },2000)
    })
}

function createOrderlyShotgunBlastAbility(pos:Vector,gamedb:GameDB){

    return new Ability(() => {
        gamedb.friendlyBullets = gamedb.friendlyBullets.concat(shotgunwave(pos,0,5,0.125,300))
        gunshot.play()
    })
}

function createRandomShotgunBlastAbility(pos:Vector,gamedb:GameDB){
    var amount = 10
    var minspeed = 100
    var maxspeed = 200
    var spread = 0.2
    return new Ability(() => {
        for(var i = 0; i < amount; i++){
            gamedb.friendlyBullets.push(new Bullet(pos.c(),new Vector(0,1).rotate2d(randomSpread(0,spread)).scale(random(minspeed,maxspeed))))
        }
    })
}

function creategattlinggunAbility(pos:Vector,target:Vector,gamedb:GameDB){
    var speed = 100
    var firerate = 200
    var timelength = 2000
    return new Ability(() => {
        var handle = setInterval(() => {
            gamedb.friendlyBullets.push(new Bullet(pos.c(),pos.to(target).normalize().scale(speed)))
        },firerate)
        setTimeout(() => {
            clearInterval(handle)
        },timelength)
    })
}


var wallwave = new Ability(() => {
    
})

var carrierattack = new Ability(() => {
    
})

function bulletRingSpawn(begin:number,step:number,numberOfSteps:number,origin:Vector,speed):Bullet[]{
    var bullets:Bullet[] = []
    for(var i = 0; i < numberOfSteps; i++){
        var dir = new Vector(0,-1).rotate2d((begin + i * step) * TAU).scale(speed)
        bullets.push(new Bullet(origin.c(),dir))
    }
    return bullets
}

function shotgunwave(origin:Vector,dir:number,amount:number,arc:number,speed:number):Bullet[]{

    if(amount > 1){
        var arcperbullet = arc / (amount - 1)
        var startdir = dir - arc / 2
        return bulletRingSpawn(startdir,arcperbullet,amount,origin,speed)
    }else if(amount == 1){
        return bulletRingSpawn(dir,0,1,origin,speed)
    }else{
        return []
    }
}