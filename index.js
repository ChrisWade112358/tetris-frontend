const apiService = new ApiService()

document.addEventListener('DOMContentLoaded', function(){
    User.generateUsers()
    Game.generateGames()
    const bgC = new bgCanvas()
    bgCanvas.displayBGCanvas()
    const tops = new Tops()
    Tops.displayTops()
    
    
})


