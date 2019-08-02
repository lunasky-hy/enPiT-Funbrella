/*
 * runstant
 */

phina.globalize();

var ASSETS = {
  image:{
    'umbrella': 'https://kohacu.com/wp-content/uploads/2018/05/kohacu.com_000102_20170830-300x300.png',
  },
};



phina.define('MainScene', {
  superClass: 'CanvasScene',
  
  init: function() {
    this.superInit();
    
    
  
    var umbrella = Sprite('umbrella').addChildTo(this);
    umbrella.x = this.gridX.center();
    umbrella.y =800;
    umbrella.scaleX = 0.5;
    umbrella.scaleY = 0.5;
    
    this.player = umbrella;
    
    
    
    var label = Label('Hello, phina.js!').addChildTo(this);
    label.x = 500;
    label.y = this.gridY.center();
    label.fontSize = 32;
    var shape = CircleShape({fill:'yellow'}).addChildTo(this);
    shape.setPosition(200, 100);
    

  },
  
    update: function(app){
    var keyboard =app.keyboard;
      
    if(keyboard.getKey('left')){
    this.player.x -= 8;
    }
    
    if(keyboard.getKey('right')){
    this.player.x += 8;
    }
    
  }
});




phina.main(function() {
  var app = GameApp({
    startLabel: 'main',
    assets: ASSETS,
  });
  
  app.run();
});
