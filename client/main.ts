/// <reference path="../shared/utils.ts" />
/// <reference path="../shared/vector.ts" />
/// <reference path="../node_modules/eventsystemx/EventSystem.ts" />
/// <reference path="../shared/rect.ts" />
/// <reference path="../shared/bullet.ts" />
/// <reference path="../shared/enemy.ts" />
/// <reference path="../shared/ship.ts" />
/// <reference path="../shared/ability.ts" />
/// <reference path="../shared/stopwatch.ts" />
/// <reference path="../shared/Animation.ts" />
/// <reference path="../shared/abilityCatalog.ts" />
/// <reference path="../shared/resourceLoading.ts" />
/// <reference path="../shared/scene.ts" />
/// <reference path="../shared/sceneCatalog.ts" />
/// <reference path="../shared/router.ts" />
/// <reference path="../shared/table.ts" />
/// <reference path="../shared/ajax.ts" />
/// <reference path="../shared/wsbox.ts" />






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
    id = 0
}

class Player{
    id = 0
    lobby = 0
}

router.listen(/^\/lobby$/,(res) => {
    var table = new Table<Lobby>([
        new Column([],(l,i) => {
            return string2html(`<span>${l.id}<span>`)
        }),
        new Column([],(l,i) => {
            return string2html(`<a href="/lobby/${l.id}">join<a/>`)
        }),
        new Column([],(l,i) => {
            var button = string2html(`<button>delete</button>`)
            button.addEventListener('click',() => {
                delLobby(l.id).then(v => {
                    refresh()
                })
            })
            return button
        }),
    ])

    function refresh(){
        getLobbys().then(res => {
            table.load(res.data)
        })
    }

    var createbutton = string2html('<button>create</button>')
    createbutton.addEventListener('click',() => {
        createLobby(new Lobby()).then(id => {
            refresh()
        })
    })
    document.body.append(createbutton)
    document.body.append(table.element)

    refresh()
    
})

router.listen(/^\/lobby\/([0-9]+)$/,(res) => {
    var lobbyid = parseInt(res[1])
    //create websocket
    //socket join lobby
    //serverside add player to lobby store ws
    var ws = new WsBox('ws://localhost:8080')
    ws.socket.addEventListener('open', () => {
        ws.send('join',lobbyid)
        getLobby(lobbyid)
        getPlayers(lobbyid).then(fr => {
            table.load(fr.data)
        })
    })
    

    var table = new Table<Player>([
        new Column([],(obj,i) => {

            return string2html(`<span>${obj.id}</span>`)
        })
    ])
    document.body.append(table.element)
})

router.listen(/^\/game\/([0-9]+)$/,(res) => {
    var gameid = parseInt(res[1])
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











