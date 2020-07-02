class Fry {
  constructor(theRoot, frySpot) {
    this.root = theRoot;
    this.spot = frySpot;

    this.x = frySpot * FRY_WIDTH;

    this.y = -FRY_HEIGHT;
    this.destroyed = false;

    this.domElement = document.createElement("img");

    this.domElement.src = "/images/fries.png";
    this.domElement.style.position = "absolute";
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = `${this.y}px`;
    this.domElement.style.transform = "scale(0.8)";
    this.domElement.style.height = FRY_HEIGHT;
    this.domElement.style.width = FRY_WIDTH;
    this.domElement.style.zIndex = 5;

    theRoot.appendChild(this.domElement);
    this.speed = Math.random() / 2 + 0.25;
  }

  destroy() {
    this.root.removeChild(this.domElement);
    this.destroyed = true;
  }

  update(timeDiff) {
    this.y = this.y + timeDiff * this.speed;
    this.domElement.style.top = `${this.y}px`;

    if (this.y > GAME_HEIGHT) {
      this.root.removeChild(this.domElement);

      this.destroyed = true;
    }
  }
}
