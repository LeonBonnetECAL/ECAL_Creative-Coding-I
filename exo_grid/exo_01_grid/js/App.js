import Circle from "./Circle.js";

export default class App {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.time = 0;
  }

  createCanvas(width, height) {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = width;
    this.canvas.height = height;
    document.body.appendChild(this.canvas);

    this.animate();
  }

  animate() {
    this.clearCanvas();
    this.createGrid();

    this.time += 0.05;

    requestAnimationFrame(this.animate.bind(this));
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  createGrid() {
    const monCercle = new Circle(this.ctx);
    let stepX = 30;
    let stepY = 30;
    let startTextX = 10;
    let startTextY = 20;
    let spaceX = window.innerWidth / stepX;
    let spaceY = window.innerHeight / stepY;

    for (let i = 0; i < stepX; i++) {
      for (let j = 0; j < stepY; j++) {
        const oscillation = 20 + Math.sin(this.time) * 10;

        monCercle.draw(
          i * spaceX + startTextX,
          j * spaceY + startTextY,
          oscillation
        );
      }
    }
  }
}
