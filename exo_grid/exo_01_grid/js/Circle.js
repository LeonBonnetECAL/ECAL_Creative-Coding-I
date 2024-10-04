export default class Circle {
  constructor(context) {
    this.ctx = context;
  }

  draw(x, y, fontSize) {
    this.ctx.beginPath();

    this.ctx.font = `${fontSize}px Arial`;
    this.ctx.fillStyle = 'black';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle'; 

    this.ctx.fillText('A', x, y);
  }
}
