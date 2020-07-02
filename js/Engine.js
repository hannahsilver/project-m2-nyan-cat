// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
  // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot) {
    // We need the DOM element every time we create a new enemy so we
    // store a reference to it in a property of the instance.
    this.root = theRoot;
    // We create our hamburger.
    // Please refer to Player.js for more information about what happens when you create a player
    this.player = new Player(this.root);
    this.text = new Text(this.root, 20);
    this.score = 0;

    console.log(this.player);
    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains instances of the Enemy class
    this.enemies = [];
    this.fries = [];
    console.log(this.enemies);
    console.log(this.fries);
    // We add the background image to the game
    addBackground(this.root);
  }

  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {
    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
    this.text.update(this.score);

    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();
    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });

    // // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // // We use filter to accomplish this.
    // // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    // // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      //   // We find the next available spot and, using this spot, we create an enemy.
      //   // We add this enemy to the enemies array
      const spot = nextSpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }

    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)
    if (this.isPlayerDead()) {
      let div = document.createElement("div");
      div.style.color = "white";
      div.style.zIndex = 2000;
      div.style.font = "bold 50px Impact";
      div.style.fontSize = "82px";
      div.style.position = "absolute";
      div.style.top = "180px";
      div.innerText = "GAME OVER";
      document.body.appendChild(div);

      return;

      // window.alert("Game over");
    }

    this.fries.forEach((fry) => {
      fry.update(timeDiff);
    });

    this.fries = this.fries.filter((fry) => {
      return !fry.destroyed;
    });

    while (this.fries.length < MAX_FRY) {
      const spot = nextSpot(this.fries);
      this.fries.push(new Fry(this.root, spot));
    }

    if (this.catchFry()) {
      let point = document.querySelector(".point");
      point.play();
    }

    // console.log(this.isPlayerDead);

    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);
  };

  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  isPlayerDead = () => {
    let playerIsDead = false;
    this.enemies.forEach((enemy) => {
      //  console.log(this.player.x);
      //  console.log(this.enemies[0]);

      // console.log(enemy.y);
      // console.log(this.player.y);

      if (enemy.x === this.player.x && enemy.y + ENEMY_HEIGHT > this.player.y) {
        console.log("hello");
        playerIsDead = true;
      }
    });

    return playerIsDead;
  };

  catchFry = () => {
    let fryCaught = false;
    this.fries.forEach((fry) => {
      if (fry.x === this.player.x && fry.y + FRY_HEIGHT > this.player.y) {
        fry.destroy();
        fryCaught = true;
        this.score++;
        return this.score;
      }
    });
    console.log(this.score);
    return fryCaught;
  };
}

//  Player {x: 150, domElement: img}
// Enemy {root: div#app, spot: 3, x: 225, y: 497.45848373773805, destroyed: false, …
