//Define Game class
class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
  }
  startGame() {}
  reset() {
    const ctx = this.ctx;
    ctx.font = "30px Arial";
    ctx.fillText("Start", 180, 180);
  }
  // clear(canvas){
  //     const ctx = this.ctx
  //     ctx.clearRect(0, 0, canvas.width, canvas.height)
  // }
  update() {
    const ctx = this.ctx;
  }
}

//Define Player class
class Player {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.xposition = 0;
    this.yposition = 560;
    this.draw();
	window.addEventListener('keydown', (event) => this.move(event));
  }

  draw() {
    const ctx = this.ctx;
    ctx.fillStyle = "blue";

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillRect(this.xposition , this.yposition, 80, 40);
  }
  move(event) {
    if (event.key === "ArrowLeft" && this.xposition > 0) {
      // Left arrow
      this.xposition -= 10;
    }else if (event.key === "ArrowRight" && this.xposition < 700) {
      // Right arrow
      this.xposition += 10;
    }else if (event.key === "ArrowUp") { // Up arrow
        this.yposition -= 10;
    } else if (event.key === "ArrowDown") { // Down arrow
        this.yposition += 10;
    }

    this.draw();
  }
}

//Define Objects class
class Objects {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
  }
  draw() {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(25, 25, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
  }
}

class objectFactory {
  objects = [];
}
//Variable declaration
const canvas = document.querySelector("#canvas");

let newGame = new Game(canvas);
let newPlayer = new Player(canvas);
let newObject = new Objects(canvas);
newPlayer.draw();
//newObject.draw();

//document.addEventListener("load", newGame.reset());
//window.addEventListener("keydown", newPlayer.move);

//
// STEPS
// 1. create objects that fall randomly
// 2. create a container to catch the falling objects
// 3. Player should get to high score to move to the next level
// 4. some levels should have objects that should be avoided
// 5. some levels should have faster moving objects
// 6. Game is won when all levels are passed
// 7. add a counter
// 8. add sound
