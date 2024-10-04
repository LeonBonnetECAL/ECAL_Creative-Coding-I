import Circle from "./Circle.js";

export default class App {
  constructor() {
    this.canvas;
    this.ctx;
  }
  createCanvas(width, height) {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = width;
    this.canvas.height = height;
    document.body.appendChild(this.canvas);
  }

  circle(x, y, radius) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    // this.ctx.stroke();
    this.ctx.fill();
  }

  createGrid() {
    const monCercle = new Circle(this.ctx);
    let stepX = 30;
    let stepY = 30;
    let radius = 5;
    let spaceX = window.innerWidth / stepX;
    let spaceY = window.innerHeight / stepY;

    for (let i = 0; i < stepX; i++) {
      for (let j = 0; j < stepY; j++) {
        // do something
        monCercle.draw(i * spaceX - radius/2 , j * spaceY + radius/2, radius);
        // monCercle.drawCross(i * spaceX, j * spaceY, +radius);
      }
    }
  }
}
