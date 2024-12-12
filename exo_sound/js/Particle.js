export default class Particle {
  /**
   * Crée une nouvelle particule avec une position initiale
   * @param {number} x - Position x initiale
   * @param {number} y - Position y initiale
   * @param {string} color - Couleur de la particule
   */
  constructor(x, y, color, fontSize) {
    this.pos = { x, y };
    this.velocity = { x: 0, y: 0 }; // Vitesse initiale vers le bas
    this.radius = 5;
    this.color = color;
    this.lifetime = 20; // Durée de vie de la particule
    this.letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    this.fontSize = fontSize;
  }

  /**
   * Met à jour la position de la particule
   */
  update() {
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
    this.lifetime--;
  }

  /**
   * Dessine la particule sur le contexte canvas
   * @param {CanvasRenderingContext2D} ctx - Le contexte de rendu 2D du canvas
   */
  draw(ctx) {
    if (this.lifetime > 0) {
      ctx.beginPath();
      const randomLetter =
        this.letters[Math.floor(Math.random() * this.letters.length)];
      ctx.font = `${this.fontSize}px Arial`; // Augmenter la taille de la police
      ctx.fillText(randomLetter, this.pos.x, this.pos.y);
      ctx.measureText(randomLetter);
      // ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  /**
   * Vérifie si la particule est encore vivante
   * @returns {boolean} - True si la particule est vivante, sinon false
   */
  isAlive() {
    return this.lifetime > 0;
  }
}
