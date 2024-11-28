export default class BaseApp {
  constructor() {
    this.color = "white";
    this.addEventListeners();
  }

  addEventListeners() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "a" || event.key === "A") {
        console.log("La touche A a été pressée !");
        this.toggleColor(); // Bascule entre 'white' et 'black'
      }
    });
  }

  // Méthode pour basculer entre les couleurs 'white' et 'black'
  toggleColor() {
    if (this.color === "white") {
      this.color = "blue";
    } else {
      this.color = "white";
    }
    console.log(`Couleur modifiée : ${this.color}`);
  }

  getColor() {
    return this.color;
  }
}
