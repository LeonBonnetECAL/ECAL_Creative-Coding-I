import BaseApp from "./BaseApp";
import Letter from "./Letter";
import Webcam from "./Webcam";
import Particle from "./Particle";
import ColorChange from "./colorChange"; // Assure-toi d'utiliser la bonne casse pour la classe

export default class App extends BaseApp {
  constructor() {
    super();
    this.ctx.willReadFrequently = true;
    this.ctx.font = `14px monospace`;
    this.letters = [];

    // change couleur
    this.colorChange = new ColorChange(); // Correcte la casse ici aussi
    this.checkColor();

    this.particles = [];
    this.maxParticles = 100;
    this.pixelColors = [];
    this.init();
  }

  checkColor() {
    // Ici tu peux vérifier la couleur actuelle si nécessaire
    const currentColor = this.colorChange.getColor();
    console.log(`L'état actuel de la couleur est : ${currentColor}`);
  }

  loadImage(src) {
    return new Promise((resolve) => {
      this.image = new Image();
      this.image.onload = resolve;
      this.image.src = src;
    });
  }

  loadWebcam() {
    this.webcam = new Webcam();
  }

  async init() {
    await this.loadWebcam();
    // store the letters in an array
    // it must be an array of 100 letters "O"
    for (let i = 0; i < this.width; i++) {
      for (let j = 10; j < 90; j++) {
        this.letters.push(new Letter(this.ctx, "X", i * 10, j * 10));
      }
    }
    this.draw();
  }

  createParticles(x, y) {
    const particleCount = 1;

    // Vérifier si le nombre de particules est inférieur à la limite
    if (this.particles.length < this.maxParticles) {
      for (let i = 0; i < particleCount; i++) {
        this.particles.push(new Particle(this.ctx, x, y));
      }
    }
  }

  draw() {
    this.ctx.drawImage(this.webcam.video, 0, 0, 800, 800);
    const pixels = this.ctx.getImageData(0, 0, 1200, 1500).data;

    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.letters.forEach((letter) => {
      const i = (letter.y * 1000 + letter.x) * 4;
      // letter.color = `rgb(${pixels[i]}, ${pixels[i + 1]}, ${pixels[i + 2]})`;
      letter.scale = this.getLuminance([
        pixels[i],
        pixels[i + 1],
        pixels[i + 2],
      ]);
      if (letter.scale > 0.97) {
        // letter.color = "red";
        this.createParticles(letter.x, letter.y);
      } else {
        // letter.color = "white";
      }

      // Appliquer la couleur actuelle de colorChange à fillStyle
      letter.color = this.colorChange.getColor();
      letter.draw();
    });

    // Update and draw particles if they are alive
    this.particles = this.particles.filter((particle) => {
      const isAlive = particle.update();
      if (isAlive) {
        particle.draw();
      }
      return isAlive;
    });

    requestAnimationFrame(this.draw.bind(this));
  }

  // get luminosity calculated from rgb of a color
  // https://www.w3.org/TR/WCAG20/#relativeluminancedef
  getLuminance(rgb) {
    // 0.2126 * R + 0.7152 * G + 0.0722 * B;
    return (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
  }
}
