(function(window){
  var keys={
  	38:'top',
  	39:'right',
  	40:'down',
  	37:'left'
  };

  function Keyboard(){
    this.board;
  }
  Keyboard.prototype={
  	constructor:Keyboard,
  	init:function(board){
  		var self=this;
  		self.board=board;
  		document.addEventListener('keydown',function(e){
        self.processKeyDown(e);
  		});
  	},
  	processKeyDown:function(e){
      if(this.board.gameInst.state!=='playing'){
        return;
      }
      if(keys[e.keyCode]){
      	this.press(keys[e.keyCode]);
      }
  	},
  	press:function(key){
      var refresh=false;//是否要刷新
  		switch(key){
  			case 'top':
  			  this.board.shape.rotate();
          if(this.board.validMove(0,0)){
            refresh=true;
          }
  			break;
  			case 'right':
  			  if(this.board.validMove(1,0)){
            this.board.shape.x+=1;
            refresh=true;
  			  }
  			break;
  			case 'down':
  			  if(this.board.validMove(0,1)){
  			  	this.board.shape.y+=1;
            refresh=true;
  			  }
  			break;
  			case 'left':
  			  if(this.board.validMove(-1,0)){
  			    this.board.shape.x-=1;
            refresh=true;
  			  }
  			break;
  		}
      if(refresh){
        this.board.refresh();
        this.board.shape.draw(this.board.context);
        if(key==='down'){
          var self=this;
          window.clearInterval(window.TetrisConfig.intervalId);
          window.TetrisConfig.intervalId=setInterval(function(){
            self.board.tick();
          },TetrisConfig.speed);
        }
      }
  	}
  };
  window.Keyboard=Keyboard;
})(window);