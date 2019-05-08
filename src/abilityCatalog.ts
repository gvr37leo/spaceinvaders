function createAimedShotAbility(pos:Vector,target:Vector){
    var speed = 100
    return new Ability(() => {
        bullets.push(new Bullet(pos.c(),pos.to(target).normalize().scale(speed))) 
    })
    
}

function createInstantRingAbility(pos:Vector){
    var amount = 20
    var speed = 100
    return new Ability(() => {
        for(var i = 0; i < amount; i++){
            bullets.push(new Bullet(pos.c(),new Vector(0,1).rotate2d(i / amount * TAU).scale(speed)))
        }
    })
}

function createLoopingRingAbility(pos:Vector,updateEvent:EventSystem<number>){
    var speed = 100
    return new Ability(() => {
        var bulletspawner = new BulletSpawner(speed,pos)
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

function createOrderlyShotgunBlastAbility(pos:Vector){
    return new Ability(() => {
        bullets.concat(bulletRingSpawn(-0.25,0.05,10,pos))
    })
}

function createRandomShotgunBlastAbility(pos:Vector){
    var amount = 10
    var minspeed = 100
    var maxspeed = 200
    var spread = 0.2
    return new Ability(() => {
        for(var i = 0; i < amount; i++){
            bullets.push(new Bullet(pos.c(),new Vector(0,1).rotate2d(randomSpread(0,spread)).scale(random(minspeed,maxspeed))))
        }
    })
}

function creategattlinggunAbility(pos:Vector,target:Vector){
    var speed = 100
    var firerate = 200
    var timelength = 2000
    return new Ability(() => {
        var handle = setInterval(() => {
            bullets.push(new Bullet(pos.c(),pos.to(target).normalize().scale(speed)))
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

function bulletRingSpawn(begin:number,step:number,numberOfSteps:number,origin:Vector):Bullet[]{
    var bullets:Bullet[] = []
    var speed = 100
    for(var i = 0; i < numberOfSteps; i++){
        var dir = new Vector(0,1).rotate2d((begin + i * step) * TAU).scale(speed)
        bullets.push(new Bullet(origin.c(),dir))
    }
    return bullets
}