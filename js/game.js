import { Paddle } from "./paddle.js";
import { FallingObjects } from "./objects.js";
import { isColliding, preloadImages } from "./utils.js";

//Define image paths for the falling objects
const fruitsPath = [
    "./assets/images/fruits/strawberry.png",
    "./assets/images/fruits/blueberry.png",
    "./assets/images/fruits/cherry.png",
    "./assets/images/fruits/grape.png",
    "./assets/images/fruits/orange.png",
    "./assets/images/fruits/pear.png",
];
const explosivesPath = [
    "./assets/images/explosives/bomb.png",
    "./assets/images/explosives/dynamite.png",
    "./assets/images/explosives/tnt.png",
];
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
//initialize variables
let paddle;
let fallingObjects = [];
let score = 0;
let gameInterval;

//Define function to initialize the game
export async function initGame() {
    canvas.style.display = "block"; // Show the canvas
    try {
        const fruitImages = await Promise.all(fruitsPath.map(preloadImages));
        const explosiveImages = await Promise.all(explosivesPath.map(preloadImages));

        paddle = new Paddle(canvas); // Create a new paddle instance

        document.addEventListener("keydown", handleKey);
        document.addEventListener("touchstart", handleTouch);
        gameInterval = setInterval(() => {
            updateGame(fruitImages, explosiveImages)
        }, 50); // 
    }
    catch (error) {
        console.log("Error loading images:", error); // Log any errors that occur during image loading
        alert(error); // Alert the user if image loading fails
    }
}
//function to handle key events for paddle movement
function handleKey(event) {
    if (event.key === "ArrowLeft") {
        paddle.move("left");
    } else if (event.key === "ArrowRight") {
        paddle.move("right");
    }
}

//function to handle touch events for paddle movement   
function handleTouch(event) {
    const touchX = event.touches[0].clientX;
    if (touchX < canvas.width / 2) {
        paddle.move("left");
    } else {
        paddle.move("right");
    }
}

//function to spawn falling objects
function spawnFallingObjects(fruitImages, explosiveImages) {
    const type = Math.random() < 0.5 ? "fruit" : "explosive"; // Randomly choose between fruit and explosive
    const images = type === "fruit" ? fruitImages : explosiveImages;
    const randomImage = images[Math.floor(Math.random() * images.length)];
    fallingObjects.push(new FallingObjects(canvas, type, randomImage)); // Create a new falling object and add it to the array
}

//function to update the game state
function updateGame(fruitImages, explosiveImages) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    paddle.draw(ctx);// Draw the paddle

    // Update and draw falling objects
    for (let i = fallingObjects.length - 1; i >= 0; i--) {
        const object = fallingObjects[i];
        object.update();
        object.draw(ctx);

        // Check for collision with the paddle
        if (isColliding(object, paddle)) {
            score += object.type === "fruit" ? 10 : -5; // Increase/decrease score as appropriate
            fallingObjects.splice(i, 1); // Remove the object after collision
            continue; // Skip to the next iteration
        }

        // Remove objects that have fallen off the screen
        if (object.yposition > canvas.height) {
            fallingObjects.splice(i, 1);
        }
    }
    drawScore(); // Draw the score on the canvas


    // Display game over message if score is negative
    if (score < 0) {
        displayGameOver();
        clearInterval(gameInterval); // Stop the game loop
        return;
    }
    //Spawn rate of falling objects
    if (Math.random() < 0.03) {
        spawnFallingObjects(fruitImages, explosiveImages); // Spawn a new falling object
    }
}

//function to draw the score on the canvas
function drawScore() {
    ctx.fillStyle = "#000000";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 20);
}
//function to display the game over message
function displayGameOver() {
    ctx.fillStyle = "#ff0000";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 70, canvas.height / 2);
    clearInterval(gameInterval); // Stop the game loop
}
