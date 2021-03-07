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
                })
            )
    }

    static userGames(user_id){
        let userGamesArray = [];
        for(let i = 0; i < Game.allGames.length; i++){
            if(this.allGames[i].user_id == user_id){
                userGamesArray.push(this.allUsers[i]);
            }
        }
        return userGamesArray
    }

    static highScore(){
        let highScoreArray = [].concat(Game.allGames)
        highScoreArray = highScoreArray.sort((a, b) => b.score - a.score);
        highScoreArray.length = 10;
        console.log(highScoreArray)
    }

    static highLevel(){

    }

    static



    


}