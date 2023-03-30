//Define Game class
class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }
  start() {}
  // reset() {
  //   const ctx = this.ctx;
  //   ctx.font = "30px Arial";
  //   ctx.fillText("Start", 180, 180);
  // }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  update(newPlayer, newObject, check) {
    
    this.clear();
    if(check === true){
      newPlayer.draw();
    }else{
    newObject.draw();
    newPlayer.draw();
  }
  }
}

//Define Player class - Player is a sqauare bowl
class Player {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.width = 80; //player width
    this.height = 40; //player height
    this.xposition = 0; // x position
    this.yposition = 560; //y position
    this.color = "blue";

    //add event listener to move player everytime the left and right arrows are pressed
    window.addEventListener("keydown", (event) => this.move(event));
  }

  draw() {
    const ctx = this.ctx;

    ctx.fillStyle = this.color;
    ctx.fillRect(this.xposition, this.yposition, this.width, this.height);
  }

  //Define move method to move player in response to left and right arrow key press
  move(event) {
    if (event.key === "ArrowLeft" && this.xposition > 0) {
      // Left arrow
      this.xposition -= 10;
    } else if (event.key === "ArrowRight" && this.xposition < this.canvas.width - this.width) {
      // Right arrow
      this.xposition += 10;
    }
    this.draw();
  }
}

//Define Objects class - objects are falling circles
class Objects {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.xposition = 25; //x position
    this.yposition = 25; //y position
    this.start = 0; //start angle in radian
    this.end = 2 * Math.PI; //end angle in radian
    this.radius = 20; //radius
    this.color = "red";
    this.dy = 2 //change y direction by this value to create a motion effect
  }
  draw() {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(this.xposition, this.yposition, this.radius, this.start, this.end);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    this.yposition += 1;
  }
  collisionCheck(paddleX, paddleY, paddleWidth, paddleHeight){
 
    if (this.yposition + this.dy >= canvas.height - 2*this.radius) {
      if(this.xposition >= paddleX && this.xposition  <= paddleX + paddleWidth && this.yposition){
        return true
      }else{
        return false
      }
    }else{
      return false
    }
  }
}

class objectFactory {
  constructor(){
    this.objectsArray = [];
  }

  generateObjects(){
     let newObjects = new Objects(canvas)
     let objects = newObjects.draw()
     this.objectsArray.push(objects)
     return this.objectsArray
  }
 

}

//Variable declaration
const canvas = document.querySelector("#canvas");

let newGame = new Game(canvas);

let newPlayer = new Player(canvas);
let newObject = new Objects(canvas);
//console.log(newObject)
function gameLoop() {
  requestAnimationFrame(gameLoop);
let check = newObject.collisionCheck(newPlayer.xposition, newPlayer.yposition, newPlayer.width, newPlayer.height)
 
  newGame.clear();
  newGame.update(newPlayer, newObject, check);
  
}

gameLoop();
