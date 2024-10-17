import Letter from "./Letter.js";

export default class App {
  constructor() {
    this.canvas;
    this.ctx;
    // premier étape : créer le canvas
    this.createCanvas();
    //créer une lettre
    console.log();

    this.letter = new Letter(
      this.canvas.width / 2.05,
      200,
      this.canvas.width / 12
    );
    // initInteraction l'interaction click
    this.initInteraction();
    // dessiner le canvas
    this.draw();
  }

  // Crée un canva de la taille de la page web
  createCanvas(width = window.innerWidth, height = window.innerHeight) {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
    document.body.appendChild(this.canvas);
  }

  initInteraction() {
    document.addEventListener("click", (e) => {
      // function (evenement) {
      // récupérer la position du click
      // et l'appliquer au cercle

      this.letter.reset(this.canvas.width / 2.05, e.y);
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // desinne la lettre de la classe Letter
    this.letter.update();
    this.letter.dessine(this.ctx);

    requestAnimationFrame(this.draw.bind(this));
  }
}
