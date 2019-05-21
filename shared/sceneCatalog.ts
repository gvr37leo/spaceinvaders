/// <reference path="ship.ts" />
/// <reference path="enemy.ts" />
/// <reference path="bullet.ts" />
/// <reference path="Animation.ts" />
/// <reference path="vector.ts" />
/// <reference path="scene.ts" />
/// <reference path="utils.ts" />
/// <reference path="rect.ts" />






class GameDB{
    ships:Ship[] = []
    enemys:Enemy[] = []
    activeEnemys:Enemy[] = []
    enemyBullets:Bullet[] = []
    friendlyBullets:Bullet[] = []
    animations:AtlasAnimation[] = []
}



 
var time = 0

class MainScene implements IScene{
    background
    enemy2spawnI = 0
    gameDB:GameDB = new GameDB()
    backgroundAnim: any;

    constructor(public screenRect:Rect){
        this.gameDB.ships = [new Ship(new Vector(250,400),this.gameDB)]
        this.gameDB.friendlyBullets = []
        this.gameDB.enemyBullets = []
        this.gameDB.enemys = generateEnemyChain(5,1000,250,[
            this.screenRect.getPoint(new Vector(0,0)),
            this.screenRect.getPoint(new Vector(1,0.2)),
            this.screenRect.getPoint(new Vector(0,0.4)),
            this.screenRect.getPoint(new Vector(0.5,0.8)),
        ],this.gameDB)
        var activeEnemys:Enemy[] = []

        this.backgroundAnim = new Anim()
        this.backgroundAnim.animType = AnimType.extend
        this.backgroundAnim.begin = 2500
        this.backgroundAnim.end = 2200
        this.backgroundAnim.stopwatch.start()
    }

    loadResources(){

    }

    update(dt: number): void {
        time += dt
        dt /= 1000
        
      
    
        while(this.enemy2spawnI < this.gameDB.enemys.length && this.gameDB.enemys[this.enemy2spawnI].spawntimeMil < time){
            this.gameDB.activeEnemys.push(this.gameDB.enemys[this.enemy2spawnI++])
        }
    
        //filter out enemys that finished their path
        this.gameDB.activeEnemys = this.gameDB.activeEnemys.filter(e => (to(e.spawntimeMil,time) / 1000) * e.speed < e.pathlength)
        
        this.gameDB.ships[0].update(dt)
        this.gameDB.friendlyBullets = this.gameDB.friendlyBullets.filter(b => (b.createdAt + b.lifespan) > Date.now())
        this.gameDB.friendlyBullets.forEach(b => b.update(dt))
        this.gameDB.enemyBullets = this.gameDB.enemyBullets.filter(b => (b.createdAt + b.lifespan) > Date.now())
        this.gameDB.enemyBullets.forEach(b => b.update(dt))
        this.gameDB.activeEnemys.forEach(e => e.update(time))
    
        var bulletDestructionSet = new Set<Bullet>()
        var enemyDestructionSet = new Set<Enemy>()
        outer:for(var bullet of this.gameDB.friendlyBullets){
            for(var enemy of this.gameDB.activeEnemys){
                if(enemy.hitbox.collidePoint(bullet.pos)){
                    bulletDestructionSet.add(bullet)
                    enemyDestructionSet.add(enemy)
                    enemy.die()
                    continue outer
                }
            }
        }
    
        this.gameDB.friendlyBullets = this.gameDB.friendlyBullets.filter(b => bulletDestructionSet.has(b) == false)
        this.gameDB.activeEnemys = this.gameDB.activeEnemys.filter(e => enemyDestructionSet.has(e) == false)
    }    
    
    
    draw(ctxt: CanvasRenderingContext2D): void {

        if(background){
            drawBackground(ctxt,background,this.screenRect.size(),this.backgroundAnim.get())
        }
        this.gameDB.ships[0].draw(ctxt)
        this.gameDB.friendlyBullets.forEach(b => b.draw(ctxt))
        this.gameDB.enemyBullets.forEach(b => b.draw(ctxt))
        this.gameDB.activeEnemys.forEach(e => e.draw(ctxt))
        this.gameDB.animations.forEach(a => a.draw(ctxt))
    }
}

