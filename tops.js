class Tops extends bgCanvas{

    constructor(bgctx, bgCan){
        super(bgctx, bgCan)
    }

    static displayTops(){
        setTimeout(() => this.listTops(Game.highScore(), "score", 90), 100)
        setTimeout(() => this.listTops(Game.highLevel(), "level", 365), 100)
        setTimeout(() => this.listTops(Game.highLines(), "lines", 625), 100)
    }

    static displayUserTops(userID){
        setTimeout(() => this.getUserTop(userID, "score", 370), 100)
        setTimeout(() => this.getUserTop(userID, "level", 540), 100)
        setTimeout(() => this.getUserTop(userID, "lines", 710), 100)
    }

    static listTops(array, top, yValue){
        this.bgctx.fillStyle = 'black';
        this.bgctx.font = "25px Arial";
        this.bgctx.fillText(`Top ${top.charAt(0).toUpperCase() + top.slice(1)}`, 245, yValue)
        this.bgctx.fillText("Rank", 160, (yValue + 30))
        this.bgctx.fillText("Name", 260, (yValue + 30))
        this.bgctx.fillText(`${top.charAt(0).toUpperCase() + top.slice(1)}`, 370, (yValue + 30))
        this.bgctx.font = "18px Arial";
        let yText = (yValue + 55);
        for(let i = 0; i < array.length; i++){
            let user = User.findUserByID(array[i].user_id)
            this.bgctx.fillText((i + 1), 180, yText)
            this.bgctx.fillText(`${user.name}`, 250, yText)
            if(top == "score"){
                this.bgctx.fillText(`${array[i].score}`, 390, yText)
            }
            else if(top == "level"){
                this.bgctx.fillText(`${array[i].level}`, 390, yText)
            }
            else{
                this.bgctx.fillText(`${array[i].lines}`, 390, yText)
            }
            
            yText += 30
        }
 
    }

    static getUserTop(id, top, yValue){
        let array = Game.userGames(id)
        let user = User.findUserByID(id)
        this.bgctx.fillStyle = 'black';
        this.bgctx.font = "60px Arial";
        this.bgctx.fillText(`${user.name}`, 1380, 110)
        this.bgctx.fillText(`${user.password}`, 1380, 200)
        if(top === "score"){
            array = array.sort((a, b) => b.score - a.score);
        }
        else if(top === "level"){
            array = array.sort((a, b) => b.level - a.level);
        }
        else {
            array = array.sort((a, b) => b.lines - a.lines);
        }
        array.length = 3
        this.bgctx.fillStyle = 'black';
        this.bgctx.font = "25px Arial";
        this.bgctx.fillText(`Top ${top.charAt(0).toUpperCase() + top.slice(1)}`, 1445, yValue)
        this.bgctx.fillText("Rank", 1380, (yValue + 30))
        this.bgctx.fillText(`${top.charAt(0).toUpperCase() + top.slice(1)}`, 1570, (yValue + 30))
        this.bgctx.font = "18px Arial";
        let yText = (yValue + 70);

        for(let i = 0; i < array.length; i++){
            this.bgctx.fillText((i + 1), 1400, yText)
            if(top === "score"){
                this.bgctx.fillText(`${array[i].score}`, 1600, yText)
            }
            else if(top === "level"){
                this.bgctx.fillText(`${array[i].level}`, 1600, yText)
            }
            else{
                this.bgctx.fillText(`${array[i].lines}`, 1600, yText)
            }
            yText += 30
        }
    }



}

