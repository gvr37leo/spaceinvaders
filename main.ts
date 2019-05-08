/// <reference path="src/utils.ts" />
/// <reference path="src/vector.ts" />
/// <reference path="node_modules/eventsystemx/EventSystem.ts" />
/// <reference path="src/rect.ts" />
// <reference path="wsbox.ts" />
/// <reference path="src/bullet.ts" />
/// <reference path="src/enemy.ts" />
/// <reference path="src/ship.ts" />
/// <reference path="src/ability.ts" />
/// <reference path="src/stopwatch.ts" />
/// <reference path="src/Animation.ts" />
/// <reference path="src/abilityCatalog.ts" />



//images
//sound
//multiplayer
//random gen
//background slide

//boss



var screensize= new Vector(500,500)
var screenRect = new Rect(new Vector(0,0),screensize)
var crret = createCanvas(screensize.x,screensize.y)
var canvas = crret.canvas
var ctxt = crret.ctxt
var sw = new StopWatch()


var ship = new Ship(new Vector(250,400))
var bullets:Bullet[] = []
var enemybullets:Bullet[] = []
var enemys:Enemy[] = generateEnemyChain(0,3000,250,[
    screenRect.getPoint(new Vector(0,0)),
    screenRect.getPoint(new Vector(1,0.2)),
    screenRect.getPoint(new Vector(0,0.4)),
    screenRect.getPoint(new Vector(0.5,0.8)),
])
var activeEnemys:Enemy[] = []
var images = []
var explosion
loadImages(['images/explosion-6.png']).then(imagesL => {
    images = imagesL
    explosion = new AtlasAnimation(images[0], new AtlasLayout(1,8,new Vector(48,48),new Vector(0,0),new Vector(0,0)))
})
 
var bulletSpawner = new BulletSpawner(100,new Vector(250,250))
var time = 0
var enemy2spawnI = 0

function update(dt){
    time += dt
    dt /= 1000



    while(enemy2spawnI < enemys.length && enemys[enemy2spawnI].spawntimeMil < time){
        activeEnemys.push(enemys[enemy2spawnI++])
    }

    bulletSpawner.update()
    //filter out enemys that finished their path
    activeEnemys = activeEnemys.filter(e => (to(e.spawntimeMil,time) / 1000) * e.speed < e.pathlength)
    
    ship.update(dt)
    bullets = bullets.filter(b => (b.createdAt + b.lifespan) > Date.now())
    bullets.forEach(b => b.update(dt))
    enemybullets = enemybullets.filter(b => (b.createdAt + b.lifespan) > Date.now())
    enemybullets.forEach(b => b.update(dt))
    activeEnemys.forEach(e => e.update(time))

    var bulletDestructionSet = new Set<Bullet>()
    var enemyDestrctionSet = new Set<Enemy>()
    outer:for(var bullet of bullets){
        for(var enemy of activeEnemys){
            if(enemy.hitbox.collidePoint(bullet.pos)){
                bulletDestructionSet.add(bullet)
                enemyDestrctionSet.add(enemy)
                continue outer
            }
        }
    }

    bullets = bullets.filter(b => bulletDestructionSet.has(b) == false)
    activeEnemys = activeEnemys.filter(e => enemyDestrctionSet.has(e) == false)
}

function draw(ctxt){
    ctxt.clearRect(0,0,500,500)
    ship.draw(ctxt)
    bullets.forEach(b => b.draw(ctxt))
    enemybullets.forEach(b => b.draw(ctxt))
    activeEnemys.forEach(e => e.draw(ctxt))
    bulletSpawner.pos.draw(ctxt)
    if(explosion){
        explosion.draw(ctxt,new Vector(10,10))
    }
}

loop(dt => {
    update(dt)
    draw(ctxt)
})





