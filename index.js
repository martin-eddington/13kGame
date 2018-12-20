kontra.init();
kontra.assets.imagePath = './img/';
kontra.assets.load('icicle.png').then(function(){
let icicle = kontra.assets.images.icicle;
kontra.assets.load('block.png').then(function(){
let block = kontra.assets.images.block;
kontra.assets.load('boom.png').then(function(){
let boom = kontra.assets.images.boom;
kontra.assets.load('sergei.gif').then(function() {
    let dead = false;
    let sprite = kontra.sprite({
  x: 0,        // starting x,y position of the sprite
  y: 0,
  image: kontra.assets.images.sergei,
  //dx: 2,          // move the sprite 2px to the right every frame
  update: function() {
    if (kontra.keys.pressed('left')){
        if(!isCollision(this.x-1, this.y, terrain) &&this.x > 0) this.x--;
    }
    else if (kontra.keys.pressed('right')) {
      // right arrow pressed
      if(!isCollision(this.x+1, this.y, terrain) && (this.x + this.width < kontra.canvas.width)) {
          this.x++;
      }
    }
    if (kontra.keys.pressed('up')) {
      // up arrow pressed
      if(!isCollision(this.x, this.y-1, terrain) && this.y > 0) this.y = this.y -2;
    }
    else if (kontra.keys.pressed('down')) {
      // down arrow pressed
      if (!isCollision(this.x, this.y+1, terrain) && (this.y <= (kontra.canvas.height - sprite.height))) {
          // allow downward movement
          this.y++;
      }
    }
  }
});

let isCollision = function(targetX, targetY, terrain){
    let blockNumber = parseInt((targetX + scrollIndex) / 50);
    let collision = false;
        let terrainBlockXOrig = (blockNumber * 50);
        let terrainBlockXEnd = (terrainBlockXOrig + 50);
        let terrainBlockYEnd = (kontra.canvas.height - ((terrain[blockNumber]+1) * 50))
        let terrainBlockYStart = (kontra.canvas.height - ((terrain[blockNumber+1]+1) * 50))
    
        if (targetY >= terrainBlockYEnd) {
            collision = true;
        };
        
        if (targetY-10 > (terrainBlockYStart)) {
            dead = true;
        };   

    return collision;
};

let terrain = [0,1,2,4,2,4,5,6,5,3,2,0,0,6,3,2];
let icicles = [0,0,0,0,0,1,2,2,3,3,2,5,3,2,0,0];
//let terrain = [3,3,6,5,5,5,4,4,4,3,3,3,2,2,2,0];
let ctx = kontra.canvas.getContext("2d");
let scrollIndex = 0;
let loop = kontra.gameLoop({
  update: function() {        // update the game state
    sprite.update();
    if(dead) {
        sprite.image = boom;
        this.stop();
    };
    if (sprite.y <= (kontra.canvas.height - sprite.height)) {
        if(!isCollision(sprite.x, sprite.y+1, terrain))
        {
            sprite.y++;
        }
    }
  },
  render: function() {
          // render the game state
          scrollIndex ++;
          if(scrollIndex % 50 == 0)
          {
              let oldItem = terrain.shift();
              terrain.push(oldItem);
              let oldIcicleItem = icicles.shift();
              icicles.push(oldIcicleItem);
              scrollIndex = 0;
          }
          let index = 0;
          for (var value of terrain) {
            ctx.drawImage(block,(50*index) - scrollIndex,kontra.canvas.height - 50 * value,50,50*value);
            ctx.drawImage(icicle,(50*index) - scrollIndex,0,50,50*icicles[index]);
            index++;
          };
    sprite.render();
  }
});

loop.start();    // start the game
});
});
});
});
