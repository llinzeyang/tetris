(function(window){
  function Score(){
    this.canvas=new Canvas('score',100,70);
    this.score=0;
    this.init();
  }
  Score.prototype={
  	constructor:Score,
  	init:function(){
      this.render();
  	},
  	render:function(){
      this.canvas.drawText(this.score);
  	},
  	addScore:function(value){
      this.score+=value;
      this.render();
      return this.score;
  	}
  };
  window.Score=Score;
})(window);