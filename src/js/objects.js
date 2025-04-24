export class FallingObjects {
    constructor(canvas, type, image) {
        this.xposition = Math.floor(Math.random() * canvas.width); //random x position
        this.yposition = -10; //y position
        this.width = 40;
        this.height = 40;
        this.speed = Math.floor(Math.random() * 3) + 1; //falling speed
        this.type = type; //type of the falling object (fruit or explosive)
        this.image = image;

    }
    //Define method to draw falling object on canvas
    draw(ctx) {
        ctx.drawImage(this.image, this.xposition, this.yposition, this.width, this.height);
    }
    //Define method to update the position of the falling object
    update() {
        this.yposition += this.speed; //update y position based on speed
    }

}