/*
 * runstant
 */

phina.globalize();

var ASSETS = {
  image:{
        //'umbrella': 'https://www.illust-box.jp/db_img/sozai/00010/108866/watermark.jpg',
     'umbrella': 'https://kohacu.com/wp-content/uploads/2018/05/kohacu.com_000102_20170830-300x300.png',
      // 'thunder':'https://www.sozailab.jp/db_img/sozai/13085/9e5baae2f2a6c96a62655fc3bdd8d10c.png'
      'thunder' : 'https://chicodeza.com/wordpress/wp-content/uploads/kaminari-illust2.png',
      'bg':$("#bg_path").text()
  },

  sound: {
    //"bgm": "https://rawgit.com/alkn203/phina_js_tips/master/assets/sounds/se_maoudamashii_chime14.mp3",
    "bgm": "https://raw.githubusercontent.com/omatoro/phina.js_tutorial_avoidgame/master/rsc/Comical01_Koya_short2.mp3",
    //"bgm": "../bgm/rain_bgm.mp3",
  },
};

// the size of kaminari
var THUNDER_WIDTH = 64;
var THUNDER_HEIGHT = 74;
var THUNDER_WIDTH = 100;
var THUNDER_HEIGHT = 110;
var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 960;
var UMBRELLA_WIDTH = 75;
var UMBRELLA_HEIGHT = 80;

//ライフ傘のサイズ
var LIFE_UMBRELLA_WIDTH = 40;
var LIFE_UMBRELLA_HEIGHT = 50;

//当たり判定 
var bool_enemy = true;
var bool_life_umbrella = false;
//スコア
var RESULT_PARAM ={
  score: 0
};

//円判定の円
var HIT_RADIUS = 35;
//ライフ傘の円判定の円
var HIT_RADIUS2 = 25;
//傘のライフ
var life = 1;
var time;
var wind_move = 0;

phina.define('MainScene', {
  superClass: 'CanvasScene',

  init: function() {
    this.superInit();

    var bg = Sprite('bg').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center()+60);
    bg.width = SCREEN_WIDTH;
    bg.height = SCREEN_HEIGHT;
    
    this.bgm = phina.asset.AssetManager.get("sound", "bgm");
    this.bgm.setLoop(true).play();

    // 傘を生成
    var umbrella = Sprite('umbrella').addChildTo(this);
    umbrella.x = this.gridX.center();
    umbrella.y = 800;

      umbrella.height = UMBRELLA_HEIGHT;
      umbrella.width = UMBRELLA_WIDTH;
      umbrella.padding = 0;
    this.player = umbrella;

    //ライフ傘グループの生成
      this.life_umbrella_Group = phina.display.CanvasElement().addChildTo(this);
      // var life_umbrella = Sprite(‘umbrella’).addChildTo(this);

    //thunder  group の生成
      this.thunderGroup = phina.display.CanvasElement().addChildTo(this);

      //thuner生成のための軸を生成
      this.timer = 0;

      //時間を計測するための準備
      var start_time = new Date();
      this.start_time = start_time;

      //最初のライフを１に設定
      this.life = 1;

      var wind = this.getParam("wind");
      if(!wind){
        wind="0";
      }
      if(start_time.getSeconds()%2 == 0){
        wind_move = parseInt(wind)*2;
      }
      else{
        wind_move = -1 * parseInt(wind)*2;
      }

      var band = RectangleShape({width:SCREEN_WIDTH, height:60}).addChildTo(this);
      band.x = SCREEN_WIDTH/2;
      band.y = 30;
      band.strokeWidth = -1;
      band.fill = 'skyblue';

      this.scoreLabel = Label({
        text: 'SCORE: 0'
      }).addChildTo(band);
      this.scoreLabel.x = -160;

      this.lifeLabel = Label({
        text: 'LIFE: 0'
      }).addChildTo(band);
      this.lifeLabel.x = 160;

      this.windLabel = Label("wind: " + wind + "m/s").addChildTo(this);
      this.windLabel.x = SCREEN_WIDTH/2;
      this.windLabel.y = 90;
  },

    update: function(app){
      // キーボードでの操作
      this.controllPlayer(app);
    ++this.timer;

    //thunderの生成,  30秒ごとにobjectを生成
    if(this.timer %30 === 0) {
      for(var i = 0, n = (this.timer/300); i <= n; ++i){
        var thunder = Thunder().addChildTo(this.thunderGroup);
        thunder.x = Math.randint(0, SCREEN_WIDTH);
        thunder.y = i*70 - SCREEN_HEIGHT;
        bool_enemy = true;
      }
    }

        //ライフ傘の生成
        if(this.timer % 200 === 0){
            var life_umbrella = Life_umbrella().addChildTo(this.life_umbrella_Group);
            life_umbrella.x =  Math.randint(0, SCREEN_WIDTH);
            life_umbrella.y = 0 - SCREEN_HEIGHT;
            bool_life_umbrella = true;
        }

    //当たり判定をする
    var self = this;
        
        if(bool_enemy) {
            self.hitTestEnemyPlayer();
        }
        
        if(bool_life_umbrella) {
            self.hitTestLifeUmbrella();
        }
    if(this.life === 0) {
        console.log("hit");
        app.replaceScene(EndScene(time));
    }

    this.TimeIsScore();

    //ライフの表示
    this.dispLife();
  },

    //ディスプレイ傘と雷の当たり判定を円でするメソッド
    hitTestEnemyPlayer : function()

    {
      var player = this.player;
      var self = this;

      this.thunderGroup.children.each(function(thunder){
          var c1 = Circle(player.x, player.y, HIT_RADIUS);
          var c2 = Circle(thunder.x, thunder.y , HIT_RADIUS);

          // 当たってるか判定
          if(Collision.testCircleCircle(c1,c2)){
              self.decreaseLife();
              bool_enemy = false;
              thunder.remove();
          }

      })

    },


    //ディスプレイ傘とライフ傘の当たり判定を円でするメソッド
    hitTestLifeUmbrella : function()

    {
        var player = this.player;
        var self = this;

        this.life_umbrella_Group.children.each(function(lifeumbrella){
            var c1 = Circle(player.x, player.y, HIT_RADIUS2);
            var c2 = Circle(lifeumbrella.x, lifeumbrella.y , HIT_RADIUS2);

            // 当たってるか判定
            if(Collision.testCircleCircle(c1,c2)){
                self.addLife(); 
                bool_life_umbrella = false;
                lifeumbrella.remove();
            }

        })

    },

    //プレイヤーを操作する関数
    controllPlayer :function(app){
      var tlit = parseFloat($("#tlit").text());
      var padding = this.player.width / 4;

      if ((tlit > 0.5 || app.keyboard.getKey('left')) && 0 + padding < this.player.x ){
        this.player.x -= 8;
      }
      else if ((tlit < -0.5 || app.keyboard.getKey('right')) && 640 - padding > this.player.x){
        this.player.x += 8;
      }
    },

    //時間をスコアに変換
    TimeIsScore :function(){
      var now = new Date();
      time = Math.floor((now - this.start_time)/1000);
      this.scoreLabel.text = "SCORE: "+time.toString();
      if(time == 5){
        this.windLabel.text = "";
      }
    },

    //ライフを増やす
    addLife: function(){
      this.life += 1;
    },

    //ライフを減らす
    decreaseLife: function(){
      if(this.life > 0) {
        this.life -= 1;
      }
      else {
        this.life = 0;
      }
    },

    //ライフの表示
    dispLife: function(){
      this.lifeLabel.text = "LIFE: " + this.life.toString();
    },

    //風
    getParam: function (name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

});

//ライフ傘オブジェクト生成
phina.define("Life_umbrella", {
    superClass: 'phina.display.Sprite',

    init : function() {
        this.superInit("umbrella");
        this.width = LIFE_UMBRELLA_WIDTH;
        this.height = LIFE_UMBRELLA_HEIGHT;
        this.speed = 7;
    },

    update: function(){
        this.y += this.speed * 2;
    }
});

//thunderのオブジェクトclass 生成
phina.define("Thunder",{
    superClass: 'phina.display.Sprite',

    init: function(){
        this.superInit("thunder");
        this.width =  THUNDER_WIDTH;
        this.height = THUNDER_HEIGHT;
        this.speed  = 7;
        this.reverseflag = false;
    },

    update: function(){
        this.y += this.speed;
        if(this.reverseflag){
          this.x += wind_move;
        }
        else{
          this.x -= wind_move;
        }
        if(this.x < 0 || this.x > 640){
          this.reverseflag = !this.reverseflag;
        }
}
});


//ゲーム終了時の画面表示
phina.define("EndScene",{
  superClass: "phina.game.ResultScene",

  init: function(time){

    RESULT_PARAM.score = "あなたのスコア" + time.toString();
    this.superInit(RESULT_PARAM);
  },
});




phina.main(function() {
  var app = GameApp({
    startLabel: 'main',
    assets: ASSETS,
  });

  app.run();
});
