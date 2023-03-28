class Game {

    startGame(){
        document.body.insertBefore(this.createStage(), document.body.childNodes[0]);
        //document.body.append(this.createStage())
    }
    createStage(){
       const stage = document.createElement("canvas")
       stage.width = "600"
       stage.height="400"
       stage.context = stage.getContext("2d")
       return stage
  }
}
  

class Player {

}

class fallingObjects {
    constructor(name){
        this.name = name
    }

}

class objectFactory{
    objects = []
}
let newGame = new Game()
newGame.startGame()
// STEPS
// 1. create objects that fall randomly
// 2. create a container to catch the falling objects
// 3. Player should get to high score to move to the next level
// 4. some levels should have objects that should be avoided
// 5. some levels should have faster moving objects
// 6. Game is won when all levels are passed
// 7. add a counter
// 8. add sound 


