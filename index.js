kontra.init();
kontra.assets.imagePath = './img/';
Promise.resolve().then(async () => {
  await kontra.assets.load('santa.png')
  let santa = kontra.assets.images.santa;
  await kontra.assets.load('icicle.png')
  let icicle = kontra.assets.images.icicle;
  await kontra.assets.load('block.png')
  let block = kontra.assets.images.block;
  await kontra.assets.load('boom.png')
  let boom = kontra.assets.images.boom;
  await kontra.assets.load('sergei.gif')
  let dead = false;
  let sprite = kontra.sprite({
    x: 0,        // starting x,y position of the sprite
    y: (kontra.canvas.height/2),
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

    let icicleBlockXOrig = (blockNumber * 50);
    let icicleBlockXEnd = (icicleBlockXOrig + 50);
    let icicleBlockYEnd = ((icicles[blockNumber]) * 50)
    let icicleBlockYStart = ((icicles[blockNumber+1]+1) * 50)

    if (targetY >= terrainBlockYEnd) {
      collision = true;
    };
    
    if (targetY-10 > terrainBlockYStart || targetY+10 < icicleBlockYEnd) {
      dead = true;
    };   

    return collision;
  };

  let terrain = [0,1,2,3,2,3,4,5,4,3,2,0,0,1,3,5,0,0];
  let icicles = [0,0,0,1,1,0,0,0,1,1,2,4,3,0,0,0,0,0];
  let santas =  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
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
        if(!isCollision(sprite.x, sprite.y+1, terrain)) {
          sprite.y++;
        }
      }
    },
    render: function() {
      // render the game state
      scrollIndex ++;
      if(scrollIndex % 50 == 0) {
        let oldItem = terrain.shift();
        terrain.push(oldItem);
        let oldIcicleItem = icicles.shift();
        icicles.push(oldIcicleItem);
		let oldSantaItem = santas.shift();
        santas.push(oldSantaItem);
        scrollIndex = 0;
      }
      let index = 0;
      for (var value of terrain) {
        ctx.drawImage(block,(50*index) - scrollIndex,kontra.canvas.height - 50 * value,50,50*value);
        ctx.drawImage(icicle,(50*index) - scrollIndex,0,50,50*icicles[index]);
		ctx.drawImage(santa,(50*index) - scrollIndex,kontra.canvas.height - 50,50,50*santas[index]);
        index++;
      };
      sprite.render();
    }
  });


  loop.start();    // start the game
});
