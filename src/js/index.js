import {initGame} from './game.js';

window.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.querySelector("#startBtn");
  const text = document.querySelector("#text")

  startBtn.addEventListener("click", (e) => {
    startBtn.remove();
    text.remove();
    initGame();
  });
})