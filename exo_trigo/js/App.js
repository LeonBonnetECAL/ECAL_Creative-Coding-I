import BaseApp from "./BaseApp.js";
import Utils from "./Utils.js";
import Easing from "./Easing.js";
import Circle from "./Circles.js";
import Axe from "./Axe.js";

export default class App extends BaseApp {
  constructor() {
    super();
    this.time = 0;
    this.amplitude = 60;
    this.frequency = 0.002;
    this.isPaused = false;
    this.transition = 0.3;
    this.pathProgress = 0;
    this.ctx.lineWidth = 1;

    setTimeout(() => {
      location.reload();
    }, 15000);

    Utils.loadSVG("letter04.svg").then((letter) => {
      this.letter = letter;
      this.calculateCenter();
      this.canvas.addEventListener("mousedown", () => (this.isPaused = true));
      this.canvas.addEventListener("mouseup", () => {
        this.isPaused = false;
      });
      this.animate();
    });

    this.circle = new Circle(this.width / 2, this.height / 2, 10);
    this.circle.color = "Black";

    this.axe = new Axe(this.width / 2, this.height / 2);
    this.draw();
  }

  calculateCenter() {
    const bounds = Utils.calculateBounds(this.letter);
    this.centerX = this.width / 2 - (bounds.minX + bounds.width / 2);
    this.centerY = this.height / 2 - (bounds.minY + bounds.height / 2);
  }

  animate() {
    this.time += 0.01;
    this.pathProgress = (this.time % 1) * this.letter[0].length;

    //suivi de la lettre
    const point = this.getPointOnPath(this.letter[0], this.pathProgress);
    this.circle.center.x = this.centerX + point.x;
    this.circle.center.y = this.centerY + point.y;

    //lettre
    this.ctx.save();
    this.ctx.translate(this.centerX, this.centerY);
    this.ctx.beginPath();
    this.letter.forEach(this.drawPath.bind(this));
    // this.ctx.stroke();
    this.ctx.restore();

    requestAnimationFrame(this.animate.bind(this));
  }

  getPointOnPath(path, progress) {
    const index = Math.floor(progress) % path.length;
    return path[index];
  }

  drawPath(path) {
    path.forEach((point, i) => {
      const { x, y } = this.getOffsetPoint(point, i);
      this.ctx[i ? "lineTo" : "moveTo"](x, y);
    });
  }

  draw() {
    this.axe.draw(this.ctx);

    //cecrle
    this.circle.move();
    this.circle.draw(this.ctx);

    requestAnimationFrame(this.draw.bind(this));
  }

  draw() {
    this.axe.draw(this.ctx);

    //cecrle
    this.circle.move();
    this.circle.draw(this.ctx);

    requestAnimationFrame(this.draw.bind(this));
  }

  draw() {
    this.axe.draw(this.ctx);

    //cecrle
    this.circle.move();
    this.circle.draw(this.ctx);

    requestAnimationFrame(this.draw.bind(this));
  }

  getOffsetPoint(point, i) {
    const angle = this.time + i * this.frequency;
    const easing = Easing.easeInOutCubic(this.transition);
    const offset = Math.sin(angle) * this.amplitude * easing;
    return {
      x: point.x + offset,
      y: point.y + offset * 0.8 * Math.cos(angle + Math.PI / 2),
    };
  }
}
