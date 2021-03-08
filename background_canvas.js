class bgCanvas {

    constructor(){
        this.element = '#backgroundCanvas';
        this.dimension = '2d';
    }

    static drawBGCanvas(){
        bgCan = document.createElement('canvas')
        bgCan.width = window.innerWidth;
        bgCan.height = window.innerHeight;
        document.body.appendChild(bgCan)
    }

    
    
}













bgctx.fillStyle = "#577590";
bgctx.fillRect(0,0,window.innerWidth, window.innerHeight);

bgctx.fillStyle = 'yellow';
bgctx.fillRect(140, 90, 320, 640)



function listTopScores(array){
    bgctx.fillStyle = 'black';
    bgctx.font = "25px Arial";
    bgctx.fillText("Rank", 160, 130)
    bgctx.fillText("Name", 260, 130)
    bgctx.fillText("Score", 370, 130)
    bgctx.font = "18px Arial";
    let yText = 200;
    for(let i = 0; i < array.length; i++){
        user = User.findUserByID(array[i].user_id)
        bgctx.fillText((i + 1), 160, yText)
        bgctx.fillText(`${user.name}`, 260, yText)
        bgctx.fillText(`${array[i].score}`, 370, yText)
        yText += 30
    }
}

//listTopScores(Game.highScore());




bgctx.fillStyle = 'orange';
bgctx.fillRect(1350, 90, 320, 640)
