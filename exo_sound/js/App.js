import BaseApp from "../js/BaseApp";
import Particle from "../js/Particle";

export default class App extends BaseApp {
  constructor() {
    super();
    this.audioFile = "./Audio_File_01.mp3";
    this.audio = new Audio(this.audioFile);
    document.body.appendChild(this.audio);
    this.isPlaying = false;
    this.particles = [];
    this.numParticles = 50;
    this.sensitivityFactor = 1.5;

    this.velociterParticule = 1;
    this.colors = ["#343132", "#495055", "#ff5100", "#209BDD", "#EEE4D4"];

    this.init();
  }

  init() {
    document.addEventListener("click", (e) => {
      if (!this.audioContext) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();
        this.setup();
      }

      const position_souris_x = e.clientX;
      const pourcentage = position_souris_x / window.innerWidth;
      this.audio.currentTime = this.audio.duration * pourcentage;
      if (this.isPlaying == true) {
        this.audio.pause();
        this.isPlaying = false;
      } else {
        this.audio.play();
        this.isPlaying = true;
      }

      // this.createParticles(e.clientX, e.clientY);
    });

    document.addEventListener("mousemove", (e) => {
      this.updateVelociterParticule(e.clientX);
      this.updateSizeParticule(e.clientY);
    });
  }

  updateVelociterParticule(mouseX) {
    const maxVelociter = 100; // Valeur maximale pour velociterParticule
    const offsetX = window.innerWidth * 0.5; // Décalage de 25% de la largeur du canvas
    const adjustedMouseX = mouseX - offsetX; // Ajuster la position de la souris
    this.velociterParticule =
      1 +
      (adjustedMouseX / (window.innerWidth - offsetX)) *
        (maxVelociter - 1) *
        this.sensitivityFactor;
    if (this.velociterParticule === 1) {
      this.velociterParticule = 1;
    }
  }

  updateSizeParticule(mouseY) {
    const minFontSize = 7.5;
    const maxFontSize = 40;
    const adjustedMouseY = mouseY / window.innerHeight;
    this.fontSize = minFontSize + adjustedMouseY * (maxFontSize - minFontSize);
  }

  createParticles(x, y) {
    for (let i = 0; i < this.numParticles; i++) {
      const color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      }, 1)`;
      const particle = new Particle(x, y, color, fontSize);
      this.fontSizes.push(fontSize);
      this.addParticle(particle);
    }
  }

  addParticle(particle) {
    this.particles.push(particle);
  }

  setup() {
    // on récupère le contexte audio
    this.audioContext = new AudioContext();
    // on crée un noeu source
    this.source = this.audioContext.createMediaElementSource(this.audio);
    // on  crée un noeu d'analyse
    this.analyser = this.audioContext.createAnalyser();
    // on crée un noeu destination
    this.destination = this.audioContext.destination;
    // on connecte le noeu source à l'analyseur
    this.source.connect(this.analyser);
    this.analyser.connect(this.destination);
    // on défini la taille du buffer ("résolution du son")
    this.analyser.fftSize = 2048;
    // on crée un tableau de donnée pour l'analyse de fréquences
    this.dataArray = new Uint8Array(this.analyser.fftSize);
    this.waveArray = new Uint8Array(this.analyser.fftSize);

    this.draw();
  }

  analyseFrequencies() {
    this.analyser.getByteFrequencyData(this.dataArray);
  }

  analyseWaveform() {
    this.analyser.getByteTimeDomainData(this.waveArray);
  }

  draw() {
    this.analyseFrequencies();
    this.analyseWaveform();

    this.ctx.clearRect(0, 0, this.width, this.height);

    // visualisation de la waveform
    const waveSpace = this.width / this.waveArray.length;
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.height / 1);
    for (let i = 0; i < this.waveArray.length; i++) {
      const y = (this.waveArray[i] / 100) * this.height - this.height / 100;
      this.ctx.lineTo(i * waveSpace, y);

      // Créer des particules le long de la ligne noire
      if (i % Math.floor(this.velociterParticule) === 0) {
        // Utilisez velociterParticule pour contrôler la fréquence des particules
        const color =
          this.colors[Math.floor(Math.random() * this.colors.length)];
        const particle = new Particle(i * waveSpace, y, color, this.fontSize);
        this.addParticle(particle);
      }
    }

    // this.ctx.lineWidth = 5;
    // this.ctx.strokeStyle = "black";
    // this.ctx.stroke();

    // Mettre à jour et dessiner les particules
    this.particles = this.particles.filter((particle) => particle.isAlive());
    this.particles.forEach((particle) => {
      particle.update();
      particle.draw(this.ctx);
    });

    requestAnimationFrame(this.draw.bind(this));
  }
}
