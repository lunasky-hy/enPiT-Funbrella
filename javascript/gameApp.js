/*
 * runstant
 */

phina.globalize();

var ASSETS = {
  image:{
    'umbrella': 'https://kohacu.com/wp-content/uploads/2018/05/kohacu.com_000102_20170830-300x300.png',
      'thunder':'https://www.sozailab.jp/db_img/sozai/13085/9e5baae2f2a6c96a62655fc3bdd8d10c.png'
  },
};

// the size of kaminari
var THUNDER_WIDTH = 100;
var THUNDER_HEIGHT = 155;
var SCREEN_WIDTH = 500;
var SCREEN_HEIGHT = 800;




phina.define('MainScene', {
  superClass: 'CanvasScene',
  
  init: function() {
    this.superInit(
       );
  
    // 傘を生成
    var umbrella = Sprite('umbrella').addChildTo(this);
    umbrella.x = this.gridX.center();
    umbrella.y =800;
    umbrella.scaleX = 0.3;
    umbrella.scaleY = 0.3;
    
    this.player = umbrella;
    
    //thunder  group の生成
      this.thunderGroup = phina.display.CanvasElement().addChildTo(this);
      
      //thuner生成notameno time
      this.timer = 0;
    

  },
  
    update: function(app){
      // キーボードでの操作
    var keyboard =app.keyboard;
      
    if(keyboard.getKey('left')){
    this.player.x -= 8;
    }
    
    if(keyboard.getKey('right')){
    this.player.x += 8;
    }

    ++this.timer;
    
    //thunderの生成
        if(this.timer %30 === 0) {
            var thunder = Thunder().addChildTo(this.thunderGroup);
            thunder.x = Math.randint(0, SCREEN_WIDTH);
            thunder.y = 0 - SCREEN_HEIGHT;
        }
  }
});

//thunderのオブジェクトclass seisei
phina.define("Thunder",{
    superClass: 'phina.display.Sprite',
    
    init: function(){
        this.superInit("thunder");
        this.width =  THUNDER_WIDTH;
        this.height = THUNDER_HEIGHT;
        this.speed  = 7;
    },
    
    update: function(){
        this.y += this.speed;
        
}
});




phina.main(function() {
  var app = GameApp({
    startLabel: 'main',
    assets: ASSETS,
  });
  
  app.run();
});
