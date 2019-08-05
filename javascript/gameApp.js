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
    umbrella.y = 800;
    umbrella.scaleX = 0.5;
    umbrella.scaleY = 0.5;
    
    this.player = umbrella;
  },
  
    update: function(app){
      var tlit = parseFloat($("#tlit").text());
      var padding = this.player.width / 4;

      if ((tlit > 1.5 || app.keyboard.getKey('left')) && 0 + padding < this.player.x ){
        this.player.x -= 8;
      }
      else if ((tlit < -1.5 || app.keyboard.getKey('right')) && 640 - padding > this.player.x){
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
