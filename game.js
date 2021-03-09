class Game {
    
    static allGames = []
    
    constructor(game){
        this.id = game.id
        this.user_id = game.user_id
        this.score = game.score
        this.lines = game.lines
        this.level = game.level
        Game.allGames.push(this)
    }

    static generateGames(){
        const gameData = apiService.fetchGames()
            .then(data =>
                data.forEach(game => {
                    const newGame = new Game(game)
                }),   
            )
    }

    static userGames(id){
        let userGamesArray = [];
        for(let e = 0; e < this.allGames.length; e++){
            if(this.allGames[e].user_id == id){
                userGamesArray.push(this.allGames[e]);
            }
        }
        return userGamesArray
    }

    static highScore(){
        let highScoreArray = [].concat(this.allGames)
        highScoreArray = highScoreArray.sort((a, b) => b.score - a.score);
        highScoreArray.length = 5;
        return highScoreArray;
    }

    static highLevel(){
        let highLevelArray = [].concat(Game.allGames)
        highLevelArray = highLevelArray.sort((a, b) => b.score - a.score);
        highLevelArray.length = 5;
        return highLevelArray;
    }

    static highLines(){
        let highLinesArray = [].concat(Game.allGames)
        highLinesArray = highLinesArray.sort((a, b) => b.score - a.score);
        highLinesArray.length = 5;
        return highLinesArray;
    }



    


}