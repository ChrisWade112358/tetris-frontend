class bgCanvas {

    constructor(){
        this.bgCan;
        this.bgctx;
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

        this.bgctx.fillStyle = '#43AA8B';
        this.bgctx.fillRect(140, 20, 320, 835)  
        
        this.bgctx.fillStyle = 'orange';
        this.bgctx.fillRect(1350, 20, 320, 835)
    }

    static drawBlankUserRect(){
        this.bgctx.fillStyle = 'orange';
        this.bgctx.fillRect(1350, 20, 320, 835)
    }

    static displayBGCanvas(){
        this.drawBGCanvas(window.innerWidth, window.innerHeight)
        this.addRectangles()   
    }
    
}





