(function(window){
  function HighScore(){
    this.canvas=new Canvas('highscore',100,70);
    this.highScore=0;
    this.init();
  }
  HighScore.prototype={
  	constructor:Score,
  	init:function(){
      this.highScore=this.getScore();
      this.render();
  	},
  	render:function(){
      this.canvas.drawText(this.highScore);
  	},
    getScore:function(){
      return window.localStorage.getItem('high-score')||0;
    },
    setScore:function(value){
      window.localStorage.setItem('high-score',value);
    },
  	checkScore:function(score){
      if(score>this.highScore){
        this.highScore=score;
        this.setScore(score);
        this.render();
      }
    }
  };
  window.HighScore=HighScore;
})(window);