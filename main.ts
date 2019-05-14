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
/// <reference path="src/resourceLoading.ts" />
/// <reference path="src/scene.ts" />
/// <reference path="src/sceneCatalog.ts" />
/// <reference path="src/router.ts" />
/// <reference path="src/table.ts" />






//images
//background, bullet, plane, enemy
//sound
//shoot, explosion, background music
  

//multiplayer
//random gen
//boss



var screensize= new Vector(500,500)
var screenRect = new Rect(new Vector(0,0),screensize)



var router = new Router()

class Lobby{
    id = 1
}

router.listen(/^\/lobby$/,(res) => {
    var table = new Table<Lobby>([
        new Column([],(l,i) => {
            return string2html('<span>1<span>')
        }),
        new Column([],(l,i) => {
            return string2html(`<a href="/lobby/${l.id}">join<a/>`)
        }),
    ])

    table.load([
        new Lobby(),
    ])

    document.body.append(table.element)
    
})

router.listen(/^\/lobby\/([0-9]+)$/,(res) => {
    debugger
})

router.listen(/^game\/id$/,(res) => {
    var crret = createCanvas(screensize.x,screensize.y);
    var canvas = crret.canvas;
    var ctxt = crret.ctxt;
    var mainscene = new MainScene()
    onResourcesLoaded.listen(() => {
        loop(dt => {
            mainscene.update(dt)
            mainscene.draw(ctxt)
        })
    })
})


router.trigger(window.location.pathname)
// window.addEventListener('popstate',(event) => {
//     router.trigger(window.location.pathname)
// })











