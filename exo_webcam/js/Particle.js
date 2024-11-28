export default class Particle {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.size = 5;
    this.alpha = 0.8;
    this.speed = 2 + Math.random() * 2;
    this.angle = Math.random() * Math.PI * 2;
    this.fadeSpeed = 0.08;
    this.color = "red";
    this.letter = "A";

    // this.letter = String.fromCharCode(65 + Maht.floor(Math.random() * 26)); // A -> Z lettre rdm
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.alpha -= this.fadeSpeed;
    return this.alpha > 0;
  }

  // draw() {
  //   this.ctx.save();
  //   this.ctx.globalAlpha = this.alpha;

  //   // ctx.rotate(this.angle + Math.PI / 2);
  //   // ctx.font = "15px Arial";
  //   // ctx.fillStyle = this.color;
  //   // ctx.fillText("嘿", 0, 0);

  //   // this.ctx.beginPath();
  //   this.ctx.fillText("a", 0, 0);
  //   this.ctx.fillStyle = "red";

  //   // this.ctx.beginPath();
  //   // this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  //   // this.ctx.fill();
  //   this.ctx.restore();
  // }

  draw() {
    this.ctx.save();
    this.ctx.globalAlpha = this.alpha; // Appliquer la transparence

    // Configurer le texte (police, taille, couleur, alignement)
    this.ctx.font = "300px monospace"; // Assurez-vous d'utiliser une taille de police appropriée
    this.ctx.fillStyle = this.color;
    this.ctx.textAlign = "center"; // Centrer le texte autour des coordonnées
    this.ctx.textBaseline = "middle"; // Alignement vertical du texte

    // Dessiner la lettre à la position de la particule
    this.ctx.fillText(this.letter, this.x, this.y);

    this.ctx.restore();
  }
}
