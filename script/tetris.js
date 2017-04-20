(function(window){

  function Tetris(){
    this.board=new Board(this);
    this.score=new Score();
    this.timer=new Timer();
    this.level=new Level();
    this.nextshape=new NextShape();
    this.highscore=new HighScore();
    this.state='playing';//游戏状态
    (new Keyboard()).init(this.board);
  }

  Tetris.prototype={
    constructor:Tetris,
    stateTick:function(){
      var self=this;
      window.TetrisConfig.intervalId=window.setInterval(function(){
        self.board.tick();
      },TetrisConfig.speed);
    },
    stopTick:function(){
      window.clearInterval(window.TetrisConfig.intervalId);
    },
    startGame:function(){
      this.stateTick();
    },
    endGame:function(){
      //game over
      this.stopTick();
      this.timer.stop();
      alert('GameOver')
    },
    //暂停
    pause:function(){
      if(this.state==='over'){
        return;
      }
      this.state='pause';
      this.stopTick();
      this.timer.pause();
    },
    //继续
    resume:function(){
      if(this.state==='over'){
        return;
      }
       this.state='playing';
       this.stateTick();
       this.timer.resume();
    }
  };
  window.Tetris=Tetris;
})(window);