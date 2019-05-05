class StopWatch{

    starttime = Date.now()

    peek():number{
        return to(this.starttime, Date.now())
    }

    start(){
        this.starttime = Date.now()
    }

    stop(){

    }

    reset(){

    }
}