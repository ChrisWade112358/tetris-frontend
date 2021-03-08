class bgCanvas {

    constructor(){
        this.bgCan;
        this.bgctx;
    }

    static displayBGCanvas(){
        bgCanvas.drawBGCanvas(window.innerWidth, window.innerHeight)
        bgCanvas.addRectangles()
        bgCanvas.displayTops()
    }

    

    static drawBGCanvas(width, height){
        this.bgCan = document.createElement('canvas');
        this.bgctx = this.bgCan.getContext('2d')
        this.bgCan.width = width;
        this.bgCan.height = height;
        document.body.appendChild(this.bgCan)
    }

    static addRectangles(){
        this.bgctx.fillStyle = "#577590";
        this.bgctx.fillRect(0,0,window.innerWidth, window.innerHeight);

        this.bgctx.fillStyle = 'yellow';
        this.bgctx.fillRect(140, 285, 320, 440)  
        
        this.bgctx.fillStyle = 'orange';
        this.bgctx.fillRect(1350, 90, 320, 635)
    }

    static displayTops(){
        setTimeout(() => this.listTopLines(Game.highLines()), 100) 
    }

    static displayTopsLoop(){
        do {
            //let score = setInterval(() => this.listTopScores(Game.highScore()), 3000)
            //setTimeout(clearInterval(score), 10000)
            //let level = setTimeout(() => this.listTopLevel(Game.highLevel()), 3000)
            //setTimeout(clearInterval(level), 10000)
            //let lines = setTimeout(() => this.listTopLines(Game.highLines()), 3000)
            //setTimeout(clearInterval(lines), 10000)
    
        }
        while(Game.allGames.length > 0)
        
    }

    static listTopScores(array){
        this.bgctx.fillStyle = 'black';
        this.bgctx.font = "25px Arial";
        this.bgctx.fillText("Rank", 160, 325)
        this.bgctx.fillText("Name", 260, 325)
        this.bgctx.fillText("Score", 370, 325)
        this.bgctx.font = "18px Arial";
        let yText = 395;
        for(let i = 0; i < array.length; i++){
            let user = User.findUserByID(array[i].user_id)
            this.bgctx.fillText((i + 1), 180, yText)
            this.bgctx.fillText(`${user.name}`, 250, yText)
            this.bgctx.fillText(`${array[i].score}`, 390, yText)
            yText += 30
        }
    }

    static listTopLevel(array){
        this.bgctx.fillStyle = 'black';
        this.bgctx.font = "25px Arial";
        this.bgctx.fillText("Rank", 160, 325)
        this.bgctx.fillText("Name", 260, 325)
        this.bgctx.fillText("Level", 370, 325)
        this.bgctx.font = "18px Arial";
        let yText = 395;
        for(let i = 0; i < array.length; i++){
            let user = User.findUserByID(array[i].user_id)
            this.bgctx.fillText((i + 1), 180, yText)
            this.bgctx.fillText(`${user.name}`, 250, yText)
            this.bgctx.fillText(`${array[i].level}`, 390, yText)
            yText += 30
        }
    }

    static listTopLines(array){
        this.bgctx.fillStyle = 'black';
        this.bgctx.font = "25px Arial";
        this.bgctx.fillText("Rank", 160, 325)
        this.bgctx.fillText("Name", 260, 325)
        this.bgctx.fillText("Lines", 370, 325)
        this.bgctx.font = "18px Arial";
        let yText = 395;
        for(let i = 0; i < array.length; i++){
            let user = User.findUserByID(array[i].user_id)
            this.bgctx.fillText((i + 1), 180, yText)
            this.bgctx.fillText(`${user.name}`, 250, yText)
            this.bgctx.fillText(`${array[i].lines}`, 390, yText)
            yText += 30
        }
    }

    
    
    
}





