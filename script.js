//Define Game class
class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.interval = "";
    this.frameNo = 0;
    this.score = 0
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  everyinterval(n) {
    if ((this.frameNo / n) % 1 == 0) {
      return true;
    }
    return false;
  }
  update(newPlayer, fallingObjects) {
    
    for (let i = 0; i < fallingObjects.length; i += 1) {
      if (newPlayer.collisionCheck(fallingObjects[i])) {
        fallingObjects.splice(i, 1);
        this.score++
      }
    }
    this.clear();
    this.frameNo += 1;
        if (this.frameNo == 1 || this.everyinterval(100)) {
          fallingObjects.push(new Objects(this.canvas));
    //newPlayer.draw();
        }
        for (let i = 0; i < fallingObjects.length; i += 1) {
          fallingObjects[i].yposition += 1;
          fallingObjects[i].draw();
        }
        newPlayer.draw();
        const ctx = canvas.getContext("2d");
ctx.font = "20px Arial";
ctx.fillText(`Score:${this.score}`, 2, 20);
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
    window.addEventListener("keydown", (e) => this.move(e));
  }

  draw() {
    const ctx = this.ctx;

    ctx.fillStyle = this.color;
    ctx.fillRect(this.xposition, this.yposition, this.width, this.height);
  }
  collisionCheck(object) {
    var myleft = this.xposition;
    var myright = this.xposition + this.width;
    var mytop = this.yposition;
    var mybottom = this.yposition + this.height;
    var otherleft = object.xposition - object.radius;
    var otherright = object.xposition + object.radius;
    var othertop = object.yposition;
    var otherbottom = object.yposition + object.radius;
    
    var crash = true;
    if ( mybottom < othertop || mytop > otherbottom ||  myright < otherleft ||  myleft > otherright
    ) {
      crash = false;
    }
    return crash;
  

  }

  //Define move method to move player in response to left and right arrow key press
  move(e) {
    if (e.key === "ArrowLeft" && this.xposition > 0) {
      // Left arrow
      this.xposition -= 10;
    } else if (
      e.key === "ArrowRight" &&
      this.xposition < this.canvas.width - this.width
    ) {
      // Right arrow
      this.xposition += 10;
    }
    this.draw();
  }
}

//Define Objects class 
class Objects {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.xposition = Math.floor(Math.random() * canvas.width); //random x position
    this.yposition = 25; //y position
    this.start = 0; //start angle in radian
    this.end = 2 * Math.PI; //end angle in radian
    this.radius = 20; //radius
    this.color = "red";
    this.dy = 2; //change y direction by this value to create a motion effect
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


}



//Variable declaration
let canvas = document.querySelector("#canvas");

let newGame = new Game(canvas);
let fallingObjects = [];
let newPlayer = new Player(canvas);

function gameLoop() {
  requestAnimationFrame(gameLoop);
  newGame.interval = setInterval(newGame.update(newPlayer, fallingObjects), 2000);
}

gameLoop();
