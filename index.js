kontra.init();
kontra.assets.imagePath = './img/';
kontra.assets.load('character_walk_sheet.png').then(function() {

    // create the sprite sheet and its animation
    window.spriteSheet = kontra.spriteSheet({
      image: kontra.assets.images.character_walk_sheet,
      frameWidth: 72,
      frameHeight: 97,
      animations: {
        walk: {
          frames: '0..10',  // frames 0 through 10
          frameRate: 30
        }
      }
    });

    window.sprite = kontra.sprite({
  x: 100,        // starting x,y position of the sprite
  y: 98,
  animations: spriteSheet.animations,
  //dx: 2,          // move the sprite 2px to the right every frame
  update: function() {
    if (kontra.keys.pressed('left')){
      if(this.x > 0) this.x--;
    }
    else if (kontra.keys.pressed('right')) {
      // right arrow pressed
      if(this.x + this.width < kontra.canvas.width) this.x++;
    }

    if (kontra.keys.pressed('up')) {
      // up arrow pressed
      if(this.y > 0) this.y = this.y -2;
    }
    else if (kontra.keys.pressed('down')) {
      // down arrow pressed
      if (this.y <= (kontra.canvas.height - sprite.height)) this.y++;
    }
  }
});
window.loop = kontra.gameLoop({  // create the main game loop
  update: function() {        // update the game state
    sprite.update();

    // wrap the sprites position when it reaches
    // the edge of the screen
    if (sprite.y <= (kontra.canvas.height - sprite.height)) {
      sprite.y++;
    }
  },
  render: function() {        // render the game state
    sprite.render();
  }
});
sprite.playAnimation('walk');
loop.start();    // start the game
});

