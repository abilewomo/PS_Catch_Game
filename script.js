6; //Define Game class
class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.interval = "";
    this.frameNo = 0;
    this.score = 0;
    this.scoreIncreament = 1
    this.time = 900000;
    this.level = 1
    this.msg = ""
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
        this.score += this.scoreIncreament;
      }
    }

    this.clear();
    this.frameNo += 1;
    if (this.frameNo == 1 || this.everyinterval(100)) {
      fallingObjects.push(new Objects(this.canvas));
    }
    for (let i = 0; i < fallingObjects.length; i += 1) {
      fallingObjects[i].yposition += 1;
      fallingObjects[i].draw();
    }
    newPlayer.draw();
    const ctx = canvas.getContext("2d");

    var seconds = Math.floor((this.time % (1000 * 60 * 60)) / (1000 * 60));

    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${this.score}`, 2, 20);


    ctx.fillText(`Time: ${seconds}s`, 2, 50)

    ctx.fillText("Level 1", 550, 20)

    ctx.font = "14px Arial";
    ctx.fillText("Catch 20 balls before time runs out", 550, 50)
    if (this.time === 0 && this.score < 20) {
      this.msg = "Game Over"
      this.scoreIncreament = 0

      return false
    }
    this.time -= 1000;
    return true

  }
  end(msg) {
    clearInterval(this.interval);
    this.ctx.font = "20px Arial";
    this.ctx.fillText(msg, 350, 300);

    return
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

    var collision = true;
    if (
      mybottom < othertop ||
      mytop > otherbottom ||
      myright < otherleft ||
      myleft > otherright
    ) {
      collision = false;
    }
    return collision;
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
    this.yposition = -10; //y position
    this.start = 0; //start angle in radian
    this.end = 2 * Math.PI; //end angle in radian
    this.radius = Math.floor(Math.random() * 10) + 12; //radius
    this.objColorArray = ["#b4d7bd", "#bfb264", "#8b5d7d"];
    this.objColor = this.objColorArray[Math.floor(Math.random() * this.objColorArray.length)]
    this.dy = 4; //change y direction by this value to create a motion effect
  }
  draw() {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(this.xposition, this.yposition, this.radius, this.start, this.end);
    ctx.fillStyle = this.objColor;
    ctx.fill();
    ctx.closePath();
    this.yposition += 1;
  }
}
//end class definitions

let startBtn = document.querySelector("#startBtn");

startBtn.addEventListener("click", (e) => {
  startBtn.remove();
  let canvas = document.createElement("canvas");
  canvas.setAttribute("id", "canvas");
  canvas.width = "800";
  canvas.height = "600";
  document.body.insertBefore(canvas, document.body.childNodes[0]);
  let newGame = new Game(canvas);
  let fallingObjects = [];
  let newPlayer = new Player(canvas);

  function gameLoop() {
    requestAnimationFrame(gameLoop);
    newGame.interval = setInterval(newGame.update(newPlayer, fallingObjects), 1000);
  }

    gameLoop()

});
