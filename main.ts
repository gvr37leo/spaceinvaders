/// <reference path="src/utils.ts" />
/// <reference path="node_modules/vectorx/vector.ts" />
/// <reference path="node_modules/eventsystemx/EventSystem.ts" />
/// <reference path="src/rect.ts" />
// <reference path="wsbox.ts" />
/// <reference path="src/bullet.ts" />
/// <reference path="src/enemy.ts" />
/// <reference path="src/ship.ts" />

//images
//sound
//multiplayer
//random gen
//only active enemys

//boss
//bullet pattern



var screensize= new Vector(500,500)
var screenRect = new Rect(new Vector(0,0),screensize)
var crret = createCanvas(screensize.x,screensize.y)
var canvas = crret.canvas
var ctxt = crret.ctxt

var ship = new Ship(new Vector(250,400))
var bullets:Bullet[] = []
var enemys:Enemy[] = generateEnemyChain(40,3000,250,[
    screenRect.getPoint(new Vector(0,0)),
    screenRect.getPoint(new Vector(1,0.2)),
    screenRect.getPoint(new Vector(0,0.4)),
    screenRect.getPoint(new Vector(0.5,0.8)),
])
var activeEnemys:Enemy[] = []


var time = 0
loop(dt => {
    update(dt)
    draw(ctxt)
})

function update(dt){
    time += dt
    dt /= 1000
    
    ship.update(dt)
    bullets = bullets.filter(b => (b.createdAt + b.lifespan) > Date.now())
    bullets.forEach(b => b.update(dt))
    enemys.forEach(e => e.update(time))

    var bulletDestructionSet = new Set<Bullet>()
    var enemyDestrctionSet = new Set<Enemy>()
    for(var bullet of bullets){
        for(var enemy of enemys){
            if(enemy.hitbox.collidePoint(bullet.pos)){
                bulletDestructionSet.add(bullet)
                enemyDestrctionSet.add(enemy)
            }
        }
    }

    bullets = bullets.filter(b => bulletDestructionSet.has(b) == false)
    enemys = enemys.filter(e => enemyDestrctionSet.has(e) == false)
}

function draw(ctxt){
    ctxt.clearRect(0,0,500,500)
    ship.draw(ctxt)
    bullets.forEach(b => b.draw(ctxt))
    enemys.forEach(e => e.draw(ctxt))
}




