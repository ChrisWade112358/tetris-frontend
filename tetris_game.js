let canvas = document.querySelector('#gameCanvas');
canvas.width = 640;
canvas.height = 640;

let ctx = canvas.getContext('2d');

let right = { x: 1, y: 0 };
let down = { x: 0, y: 1 };
let left = { x: -1, y: 0 };

let EMPTY = -1;
let BORDER = -2;

let fallingShape;
let nextShape;
let dim = 640;
let nRows = 18;
let nCols = 12;
let blockSize = 30;
let topMargin = 50; 
let leftMargin = 20;
let scoreX = 400;
let scoreY = 330;
let titleX = 130;
let titleY = 160;
let clickX = 120;
let clickY = 300;
let previewCenterX = 467;
let previewCenterY = 97;
let mainFont = 'bold 48px monospace';
let smallFont = 'bold 18px monospace';
let colors = ['green', 'red', 'blue', 'purple', 'orange', 'blueviolet', 'magenta'];
let gridRect = { x: 46, y: 47, w: 308, h: 517 };
let previewRect = { x: 387, y: 47, w: 200, h: 200 };
let titleRect = { x: 100, y: 95, w: 252, h: 100 };
let clickRect = { x: 49, y: 285, w: 285, h: 180 };
let outerRect = { x: 5, y: 5, w: 630, h: 630 };
let squareBorder = 'white';
let titlebgColor = '#F94144';
let textColor = 'black';
let bgColor = '#F9C74F';
let gridColor = '#90BE6D';
let gridBorderColor = '#43AA8B';
let largeStroke = 5;
let smallStroke = 2;

// position of falling shape
let fallingShapeRow;
let fallingShapeCol;

let keyDown = false;
let fastDown = false;

let grid = [];
let scoreboard = new Scoreboard();
let currentUser;

addEventListener('keydown', function (event) {
    if (!keyDown) {
        keyDown = true;

        if (scoreboard.isGameOver())
            return;

        switch (event.key) {

            case 'w':
                if (canRotate(fallingShape))
                    rotate(fallingShape);
                break;

            case 'a':
                if (canMove(fallingShape, left))
                    move(left);
                break;

            case 'd':
                if (canMove(fallingShape, right))
                    move(right);
                break;

            case 's':
                if (!fastDown) {
                    fastDown = true;
                    while (canMove(fallingShape, down)) {
                        move(down);
                        draw();
                    }
                    shapeHasLanded();
                }
        }
        draw();
    }
});


addEventListener('keyup', function () {
    keyDown = false;
    fastDown = false;
});

function canRotate(s) {
    if (s === Shapes.Square)
        return false;

    let pos = new Array(4);
    for (let i = 0; i < pos.length; i++) {
        pos[i] = s.pos[i].slice();
    }

    pos.forEach(function (row) {
        let tmp = row[0];
        row[0] = row[1];
        row[1] = -tmp;
    });

    return pos.every(function (p) {
        let newCol = fallingShapeCol + p[0];
        let newRow = fallingShapeRow + p[1];
        return grid[newRow][newCol] === EMPTY;
    });
}

function rotate(s) {
    if (s === Shapes.Square)
        return;

    s.pos.forEach(function (row) {
        let tmp = row[0];
        row[0] = row[1];
        row[1] = -tmp;
    });
}

function move(dir) {
    fallingShapeRow += dir.y;
    fallingShapeCol += dir.x;
}

function canMove(s, dir) {
    return s.pos.every(function (p) {
        let newCol = fallingShapeCol + dir.x + p[0];
        let newRow = fallingShapeRow + dir.y + p[1];
        return grid[newRow][newCol] === EMPTY;
    });
}

function shapeHasLanded() {
    addShape(fallingShape);
    if (fallingShapeRow < 2) {
        scoreboard.setGameOver();
        scoreboard.setTopscore();
    } else {
        scoreboard.addLines(removeLines());
    }
    selectShape();
}

function removeLines() {
    let count = 0;
    for (let r = 0; r < nRows - 1; r++) {
        for (let c = 1; c < nCols - 1; c++) {
            if (grid[r][c] === EMPTY)
                break;
            if (c === nCols - 2) {
                count++;
                removeLine(r);
            }
        }
    }
    return count;
}

function removeLine(line) {
    for (let c = 0; c < nCols; c++)
        grid[line][c] = EMPTY;

    for (let c = 0; c < nCols; c++) {
        for (let r = line; r > 0; r--)
            grid[r][c] = grid[r - 1][c];
    }
}

function addShape(s) {
    s.pos.forEach(function (p) {
        grid[fallingShapeRow + p[1]][fallingShapeCol + p[0]] = s.ordinal;
    });
}

function Shape(shape, o) {
    this.shape = shape;
    this.pos = this.reset();
    this.ordinal = o;
}

let Shapes = {
    ZShape: [[0, -1], [0, 0], [-1, 0], [-1, 1]],
    SShape: [[0, -1], [0, 0], [1, 0], [1, 1]],
    IShape: [[0, -1], [0, 0], [0, 1], [0, 2]],
    TShape: [[-1, 0], [0, 0], [1, 0], [0, 1]],
    Square: [[0, 0], [1, 0], [0, 1], [1, 1]],
    LShape: [[-1, -1], [0, -1], [0, 0], [0, 1]],
    JShape: [[1, -1], [0, -1], [0, 0], [0, 1]]
};

function getRandomShape() {
    let keys = Object.keys(Shapes);
    let ord = Math.floor(Math.random() * keys.length);
    let shape = Shapes[keys[ord]];
    return new Shape(shape, ord);
}

Shape.prototype.reset = function () {
    this.pos = new Array(4);
    for (let i = 0; i < this.pos.length; i++) {
        this.pos[i] = this.shape[i].slice();
    }
    return this.pos;
}

function selectShape() {
    fallingShapeRow = 1;
    fallingShapeCol = 5;
    fallingShape = nextShape;
    nextShape = getRandomShape();
    if (fallingShape != null) {
        fallingShape.reset();
    }
}

function Scoreboard() {
    this.MAXLEVEL = 9;

    let level = 0;
    let lines = 0;
    let score = 0;
    let topscore = 0;
    let gameOver = true;

    this.reset = function () {
        this.setTopscore();
        level = lines = score = 0;
        gameOver = false;
    }

    this.setGameOver = function () {
        gameOver = true;
    }

    this.isGameOver = function () {
        return gameOver;
    }

    this.setTopscore = function () {
        if (score > topscore) {
            topscore = score;
        }
    }

    this.getTopscore = function () {
        return topscore;
    }

    this.getSpeed = function () {

        switch (level) {
            case 0: return 700;
            case 1: return 600;
            case 2: return 500;
            case 3: return 400;
            case 4: return 350;
            case 5: return 300;
            case 6: return 250;
            case 7: return 200;
            case 8: return 150;
            case 9: return 100;
            default: return 100;
        }
    }

    this.addScore = function (sc) {
        score += sc;
    }

    this.addLines = function (line) {

        switch (line) {
            case 1:
                this.addScore(10);
                break;
            case 2:
                this.addScore(20);
                break;
            case 3:
                this.addScore(30);
                break;
            case 4:
                this.addScore(40);
                break;
            default:
                return;
        }

        lines += line;
        if (lines > 10) {
            this.addLevel();
        }
    }

    this.addLevel = function () {
        lines %= 10;
        if (level < this.MAXLEVEL) {
            level++;
        }
    }

    this.getLevel = function () {
        return level;
    }

    this.getLines = function () {
        return lines;
    }

    this.getScore = function () {
        return score;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawUI();

    if (scoreboard.isGameOver()) {
        if(currentUser == undefined){
            drawStartScreen();
            let nameEdit = document.getElementById("nameEdit").hidden = true;
            let passwordEdit1 = document.getElementById("passwordEdit1").hidden = true;
            let passwordEdit2 = document.getElementById("passwordEdit2").hidden = true;
            let updateBtn = document.getElementById("updateBtn").hidden = true;
            let deleteBtn = document.getElementById("deleteBtn").hidden = true;
            

        }
        else{
            drawStartScreen();
            apiService.submitGame(currentUser.id, scoreboard.getScore(), scoreboard.getLines(), scoreboard.getLevel())
                .then(data =>{
                    const newGame = new Game(data)
                }
            )
            setTimeout(() => bgCanvas.listTops(Game.highScore(), "score", 90), 100)
            setTimeout(() => bgCanvas.listTops(Game.highLevel(), "level", 365), 100)
            setTimeout(() => bgCanvas.listTops(Game.highLines(), "lines", 625), 100)
            
        }
        
    } else {
        drawFallingShape();
        
    }
}

function getNameInput(){
    let nameInput = document.getElementById('nameinput')
    let passwordInput = document.getElementById('passwordinput')
    let inputs = document.querySelectorAll('.inputs')
    if(nameInput.hidden === true){
        nameInput.hidden = false;
        passwordInput.hidden = false;
    }
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e){
            if(e.key === 'Enter'){
                currentUser = User.findUser(nameInput.value, passwordInput.value)
                setTimeout(() => afterReturn(), 100)
            }
        })
    })

}

function afterReturn(){
    let nameInput = document.getElementById('nameinput');
    let passwordInput = document.getElementById('passwordinput');
    nameInput.hidden = true;
    passwordInput.hidden = true;
    bgCanvas.displayUserTops(currentUser.id)
    startNewGame();
    editUser();
    deleteUser();
}



function editUser(){
    let nameEdit = document.getElementById("nameEdit");
    let passwordEdit1 = document.getElementById("passwordEdit1");
    let passwordEdit2 = document.getElementById("passwordEdit2");
    let updateBtn = document.getElementById("updateBtn");
    

    nameEdit.hidden = false;
    passwordEdit1.hidden = false;
    passwordEdit2.hidden = false;
    updateBtn.hidden = false;
    


    
    updateBtn.addEventListener('click', function(e){
        e.preventDefault();
        if(passwordEdit1.value == passwordEdit2.value && passwordEdit1.value != "" && nameEdit.value != ""){
            const UserObj = {
                id: currentUser.id,
                name: nameEdit.value,
                password: passwordEdit1.value,
            }
            apiService.editUser(UserObj);

        }
        else if(passwordEdit1.value == passwordEdit2.value && passwordEdit1.value != "" && nameEdit.value == ""){
            const UserObj = {
                id: currentUser.id,
                name: currentUser.name,
                password: passwordEdit1.value,
            }
            apiService.editUser(UserObj);
        }
        else if(passwordEdit1.value == "" && nameEdit.value != ""){
            const UserObj = {
                id: currentUser.id,
                name: nameEdit.value,
                password: currentUser.password,
            }
            apiService.editUser(UserObj);
        }
        else if(passwordEdit1.value != passwordEdit2.value && passwordEdit1.value != ""){
            alert("passwords must match. Please enter your password and re-enter your password in the virify password input.")
        }
        else{
            alert("Nothing was entered into edit fields. Please enter a change into the edit fields and click Update again.")
        }
        bgCanvas.displayUserTops(currentUser.id)
    })
    
    
}

function deleteUser(){
    let deleteBtn = document.getElementById("deleteBtn");
    deleteBtn.hidden = false;
    deleteBtn.addEventListener('click', function(e){
        e.preventDefault()
        apiService.deleteUser(currentUser.id)
        User.findUserByID(currentUser.id).delete
        e.target.reset
    })

}



function drawStartScreen() {
    ctx.font = mainFont;

    fillRect(titleRect, titlebgColor);
    fillRect(clickRect, titlebgColor);
    getNameInput();
    
    ctx.fillStyle = textColor;
    ctx.fillText('Tetris', titleX, titleY);

    ctx.font = smallFont;
    ctx.fillText('Enter name', 150, 300);
    ctx.fillText('and password', 140, 327);
    ctx.fillText('name:', 95, 368);
    ctx.fillText('password:', 55, 400);
    ctx.fillText('then press "Enter"', 110, 460);
}

function fillRect(r, color) {
    ctx.fillStyle = color;
    ctx.fillRect(r.x, r.y, r.w, r.h);
}

function drawRect(r, color) {
    ctx.strokeStyle = color;
    ctx.strokeRect(r.x, r.y, r.w, r.h);
}

function drawSquare(colorIndex, r, c) {
    let bs = blockSize;
    ctx.fillStyle = colors[colorIndex];
    ctx.fillRect(leftMargin + c * bs, topMargin + r * bs, bs, bs);

    ctx.lineWidth = smallStroke;
    ctx.strokeStyle = squareBorder;
    ctx.strokeRect(leftMargin + c * bs, topMargin + r * bs, bs, bs);
}

function drawUI() {

    // background
    fillRect(outerRect, bgColor);
    fillRect(gridRect, gridColor);

    // the blocks dropped in the grid
    for (let r = 0; r < nRows; r++) {
        for (let c = 0; c < nCols; c++) {
            let idx = grid[r][c];
            if (idx > EMPTY)
                drawSquare(idx, r, c);
        }
    }

    // the borders of grid and preview panel
    ctx.lineWidth = largeStroke;
    drawRect(gridRect, gridBorderColor);
    drawRect(previewRect, gridBorderColor);
    drawRect(outerRect, gridBorderColor);

    // scoreboard
    ctx.fillStyle = textColor;
    ctx.font = smallFont;
    ctx.fillText('hiscore    ' + scoreboard.getTopscore(), scoreX, scoreY);
    ctx.fillText('level      ' + scoreboard.getLevel(), scoreX, scoreY + 30);
    ctx.fillText('lines      ' + scoreboard.getLines(), scoreX, scoreY + 60);
    ctx.fillText('score      ' + scoreboard.getScore(), scoreX, scoreY + 90);
    ctx.fillText('Use "A" to move LEFT', scoreX - 20, scoreY + 140);
    ctx.fillText('Use "D" to move Right', scoreX - 20, scoreY + 170);
    ctx.fillText('Use "W" to rotate piece', scoreX - 20, scoreY + 200);
    ctx.fillText('Use "S" to drop piece', scoreX - 20, scoreY + 230);

    // preview
    let minX = 5, minY = 5, maxX = 0, maxY = 0;
    nextShape.pos.forEach(function (p) {
        minX = Math.min(minX, p[0]);
        minY = Math.min(minY, p[1]);
        maxX = Math.max(maxX, p[0]);
        maxY = Math.max(maxY, p[1]);
    });
    let cx = previewCenterX - ((minX + maxX + 1) / 2.0 * blockSize);
    let cy = previewCenterY - ((minY + maxY + 1) / 2.0 * blockSize);

    ctx.translate(cx, cy);
    nextShape.shape.forEach(function (p) {
        drawSquare(nextShape.ordinal, p[1], p[0]);
    });
    ctx.translate(-cx, -cy);
}

function drawFallingShape() {
    let idx = fallingShape.ordinal;
    fallingShape.pos.forEach(function (p) {
        drawSquare(idx, fallingShapeRow + p[1], fallingShapeCol + p[0]);
    });
}

function animate(lastFrameTime) {
    let requestId = requestAnimationFrame(function () {
        animate(lastFrameTime);
    });

    let time = new Date().getTime();
    let delay = scoreboard.getSpeed();

    if (lastFrameTime + delay < time) {

        if (!scoreboard.isGameOver()) {

            if (canMove(fallingShape, down)) {
                move(down);
            } else {
                shapeHasLanded();
            }
            draw();
            lastFrameTime = time;

        } else {
            cancelAnimationFrame(requestId);
        }
    }
}

function startNewGame() {
    initGrid();
    selectShape();
    scoreboard.reset();
    animate(-1);
}

function initGrid() {
    function fill(arr, value) {
        for (let i = 0; i < arr.length; i++) {
            arr[i] = value;
        }
    }
    for (let r = 0; r < nRows; r++) {
        grid[r] = new Array(nCols);
        fill(grid[r], EMPTY);
        for (let c = 0; c < nCols; c++) {
            if (c === 0 || c === nCols - 1 || r === nRows - 1)
                grid[r][c] = BORDER;
        }
    }
}

function init() {
    initGrid();
    selectShape();
    draw();
}

init();



