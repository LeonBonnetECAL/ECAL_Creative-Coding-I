export default class Texte {
  constructor(context) {
    this.ctx = context;
  }

  getRandomFontSize(min = 10, max = 50) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  draw(x, y) {
    this.ctx.beginPath();
    const fontSize = this.getRandomFontSize(10, 40);
    this.ctx.font = `${fontSize}px Arial`;
    this.ctx.fillText("A", x, y);
    this.ctx.fill();
  }

  drawCross(x, y, radius) {
    this.ctx.beginPath();
    this.ctx.moveTo(x - radius, y);
    this.ctx.lineTo(x + radius, y);
    this.ctx.moveTo(x, y - radius);
    this.ctx.lineTo(x, y + radius);
    this.ctx.stroke();
  }
}
