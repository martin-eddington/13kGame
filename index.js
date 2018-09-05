kontra.init();
kontra.assets.imagePath = './img/';
kontra.assets.load('block.png').then(function(){
let block = kontra.assets.images.block;
kontra.assets.load('boom.png').then(function(){
let boom = kontra.assets.images.boom;
kontra.assets.load('sanj.png').then(function() {
    let dead = false;
    let sprite = kontra.sprite({
  x: 0,        // starting x,y position of the sprite
  y: 249,
  image: kontra.assets.images.sanj,
  //dx: 2,          // move the sprite 2px to the right every frame
  update: function() {
    if (kontra.keys.pressed('left')){
      if(this.x > 0) this.x--;
    }
    else if (kontra.keys.pressed('right')) {
      // right arrow pressed
      if(!isCollision(this.x, this.y, terrain) && (this.x + this.width < kontra.canvas.width)) {
          this.x++;
      }
    }

    if (kontra.keys.pressed('up')) {
      // up arrow pressed
      if(this.y > 0) this.y = this.y -2;
    }
    else if (kontra.keys.pressed('down')) {
      // down arrow pressed
      console.log (isCollision(this.x, this.y, terrain));
      if (!isCollision(this.x, this.y, terrain) && (this.y <= (kontra.canvas.height - sprite.height))) {
          // allow downward movement
          this.y++;
      }
      //dead = true;
    }
  }
});

let isCollision = function(targetX, targetY, terrain){
    let blockNumber = 0
    let collision = false;
    for (var terrainBlock of terrain) {
        //console.log('calculating terrain' + terrainBlock);
        //if(targetY >= (kontra.canvas.height - 50 * terrainBlock,50,50*terrainBlock)){
        let terrainBlockXOrig = (blockNumber * 50);
        let terrainBlockXEnd = (terrainBlockXOrig + 50);
        let terrainBlockYEnd = (kontra.canvas.height - ((terrainBlock) * 50))

        //console.log(targetX, terrainBlockXEnd);
        if (targetY >= terrainBlockYEnd) {
            collision = true;
            //console.log('Y collision!');
        }
        if (targetX >= terrainBlockXEnd) {
            collision = true;
            //console.log('X collision!');
        }
        blockNumber++;
    return collision;
    };

    return false;
};

let terrain = [1,1,2,4,2,2,1,0,0,0,1,2];
let ctx = kontra.canvas.getContext("2d");
let scrollIndex = 0;
let loop = kontra.gameLoop({
  update: function() {        // update the game state
    sprite.update();
    if(dead) {
        sprite.image = boom;
        this.stop();
    };
    // wrap the sprites position when it reaches
    // the edge of the screen
    if (sprite.y <= (kontra.canvas.height - sprite.height)) {
        // if(!isCollision(sprite.x, sprite.y, terrain))
        // {
        //     //sprite.y++;
        // }
    }
  },
  render: function() {
          // render the game state
          scrollIndex = 1;
          if(scrollIndex % 50 == 0)
          {
              let oldItem = terrain.shift();
              terrain.push(oldItem);
              scrollIndex = 0;
          }
          let index = 0;
          for (var value of terrain) {
            ctx.drawImage(block,50*index - scrollIndex,kontra.canvas.height - 50 * value,50,50*value);
            index++;
          };
    sprite.render();
  }
});

loop.start();    // start the game
});
});
});
