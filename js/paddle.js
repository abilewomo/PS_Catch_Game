export class Paddle {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = 80; 
        this.height = 20;
        this.xposition = (canvas.width - this.width) / 2; // Center the paddle
        this.yposition = canvas.height - this.height - 10; // 10 pixels from the bottom
        this.speed = 10; // Speed of paddle movement
        

    }
    //Define method to draw paddle on canvas
    draw(ctx) {
        ctx.fillStyle = "#b9b15b";
        ctx.fillRect(this.xposition, this.yposition, this.width, this.height);
    }

    //Define method to move paddle in response to left and right arrow key presses
    move(direction) {
        if (direction === "left") {
            this.xposition -= this.speed;
        } else if (direction === "right") {
            this.xposition += this.speed;
        }
        // Prevent paddle from going out of bounds
        if (this.xposition < 0) {
            this.xposition = 0;
        } else if (this.xposition + this.width > this.canvas.width) {
            this.xposition = this.canvas.width - this.width;
        }
    }

  
  }