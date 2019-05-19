enum AnimType{once,repeat,pingpong,extend}

class Anim{
    animType:AnimType = AnimType.once
    reverse:boolean = false
    duration:number = 1000
    stopwatch:StopWatch = new StopWatch()


    path:Vector[] = []
    begin:number = 0
    end:number = 1

    constructor(){

    }

    get():number{
        var cycles = this.stopwatch.get() / this.duration

        switch (this.animType) {
            case AnimType.once:
                return clamp(lerp(this.begin,this.end,cycles),this.begin,this.end) 
            case AnimType.repeat:
                return lerp(this.begin,this.end,mod(cycles,1))
            case AnimType.pingpong:
                
                var pingpongcycle = mod(cycles, 2)
                if(pingpongcycle <= 1){
                    return lerp(this.begin,this.end,pingpongcycle)
                }else{
                    return lerp(this.end,this.begin,pingpongcycle - 1)
                }

            case AnimType.extend:
                var distPerCycle = to(this.begin,this.end)
                return Math.floor(cycles) * distPerCycle + lerp(this.begin,this.end,mod(cycles,1))
        }
    }
}

function disectAtlas(rows:number,columns:number,imageSize:Vector,padding:Vector,offset:Vector):Vector[]{
    var posses:Vector[] = []

    for(var i = 0; i < rows; i++){
        for(var j = 0; j < columns; j++){
            var pos = new Vector(0,0)
            pos.add(offset)
            pos.add(padding).mul(new Vector(j,i))
            pos.add(imageSize).mul(new Vector(j,i))
            posses.push(pos)
        }
    }
    return posses
}

function loadImages(urls:string[]):Promise<HTMLImageElement[]>{
    var promises:Promise<HTMLImageElement>[] = []

    for(var url of urls){
        promises.push(new Promise((res,rej) => {
            var image = new Image()
            image.onload = e => {
                res(image)     
            }
            image.src = url
        }))
    }

    return Promise.all(promises)
}

class AtlasLayout{
    constructor(
        public rows:number, 
        public columns:number, 
        public imageSize:Vector,
        public padding:Vector,
        public offset:Vector,
    ){

    }
}

class SpriteAnimation{
    anim:Anim = new Anim()
    sprites:HTMLImageElement[] = []

    constructor(){
        this.anim.stopwatch.start()
        this.anim.begin = 0
        this.anim.end = 1
        this.anim.duration = 1000
        this.anim.animType = AnimType.once
    }

    draw(ctxt:CanvasRenderingContext2D,pos:Vector){
        if(this.sprites.length > 0){
            var i = Math.min(Math.floor(this.anim.get() * this.sprites.length), this.sprites.length - 1) 
            ctxt.drawImage(this.sprites[i],pos.x,pos.y)
        }
    }

    
}

class AtlasAnimation{
    anim:Anim = new Anim()
    positions: Vector[];
    halfimageSize: Vector;
    

    constructor(public image:HTMLImageElement,public pos:Vector, public atlasLayout:AtlasLayout){
        this.anim.stopwatch.start()
        this.anim.begin = 0
        this.anim.end = 1
        this.anim.duration = 1000
        this.anim.animType = AnimType.repeat
        this.positions = disectAtlas(this.atlasLayout.rows,this.atlasLayout.columns,this.atlasLayout.imageSize,this.atlasLayout.padding,this.atlasLayout.offset)
        this.halfimageSize = this.atlasLayout.imageSize.c().scale(0.5)
    }

    draw(ctxt:CanvasRenderingContext2D){
        if(this.positions.length > 0){
            var i = Math.min(Math.floor(this.anim.get() * this.positions.length), this.positions.length - 1) 
            var spos = this.positions[i]
            var dpos = this.pos.c().sub(this.halfimageSize)
            ctxt.drawImage(this.image,spos.x,spos.y,this.atlasLayout.imageSize.x,this.atlasLayout.imageSize.y,dpos.x,dpos.y,this.atlasLayout.imageSize.x,this.atlasLayout.imageSize.y)
        }
    }
}

function drawBackground(ctxt:CanvasRenderingContext2D,background:HTMLImageElement,canvassize:Vector,verticalScroll:number){
    verticalScroll = mod(verticalScroll,background.height)
    // verticalScroll = 2550
    if(canvassize.y + verticalScroll > background.height){
        var scroll2end = to(verticalScroll,background.height)
        var overflow = canvassize.y - scroll2end
        ctxt.drawImage(background,0,verticalScroll,canvassize.x,scroll2end,0,0,canvassize.x,scroll2end)
        ctxt.drawImage(background,0,0,canvassize.x,overflow,0,scroll2end,canvassize.x,overflow)
    }else{
        ctxt.drawImage(background,0,verticalScroll,background.width,background.height,0,0,background.width,background.height)
    }
}