(function(window){
	var levelArr=(function(){
    var arr=[0];
	  for(var i=0;i<10;i++){
		  arr.push(Math.pow(2,i)*10);
	  }
	  return arr;
	})();
  function Level(){
    this.canvas=new Canvas('level',100,70);
    this.level=1;
    this.init();
  }
  Level.prototype={
  	constructor:Level,
  	init:function(){
      this.render();
  	},
  	render:function(){
      this.canvas.drawText('Level '+this.level);
  	},
  	checkLevel:function(score){
      if(score>=levelArr[this.level]){
      	this.level++;
      	this.render();
      	return this.level; 
      }
      return 0;
  	}
  };
  window.Level=Level;
})(window);