
(function(window){
    //方块类型
  var shapeLayouts=[
    [[0,1,0],[1,1,1]],
    [[1,1,1,1]],
    [[1,1],[1,1]],
    [[0,1],[1,1],[1,0]],
    [[1,0],[1,1],[0,1]],
    [[1,0,1],[1,1,1]],
    [[0,1],[1,1]],
    [[1,1]],
    [[1,1],[1,0],[1,0]],
    [[1,1],[0,1],[0,1]]
  ];
    //随机生成方块颜色
  var random=function(minValue,maxValue){
    return minValue+Math.floor(Math.random()*maxValue);
  };
  var styleCount=7;//方块颜色

  function Shape(){
    this.block=new Block(5);
    this.x=0;
    this.y=0;
    this.blockType=random(1,styleCount);
    this.block=new Block(this.blockType);
    this.layout=shapeLayouts[random(0,shapeLayouts.length)];
  }

  Shape.prototype={
  	constructor:Shape,
  	draw:function(context,size){
  		for(var i=0;i<this.layout.length;i++){
  			for(var j=0;j<this.layout[i].length;j++){
  				if(this.layout[i][j]){
  					this.block.draw(context,j+this.x,i+this.y,undefined,size);
  				}
  			}
  		}
  	},
  	//翻转
  	rotate:function(){
  		var newLayout=[];
  		for(var y=0;y<this.layout[0].length;y++){
  			newLayout[y]=[];
  			for(var x=0;x<this.layout.length;x++){
  				newLayout[y][x]=this.layout[this.layout.length-1-x][y];
  			}
  		}
  		this.layout=newLayout;

      this.setlayout();
  	},
    //验证方块是否在合理位置
    setlayout:function(){
      if(this.x<0){
        this.x=0;
      }
      if(this.y<0){
        this.y=0;
      }
      if(this.x+this.layout[0].length>TetrisConfig.cols){
        this.x=TetrisConfig.cols-this.layout[0].length;
      }
      if(this.y+this.layout.length>TetrisConfig.rows){
        this.y=TetrisConfig.rows-this.layout.length;
      }
    },
    getMaxCols:function(){
      var max=0;
      for(var y=0;y<this.layout.length;y++){
        max=Math.max(max,this.layout[y].length);
      }
      return max;
    },
    getMaxRows:function(){
      return this.layout.length;
    },
    //定位
    setPosition:function(cols,rows,ignoreRows){
      this.x=Math.floor((cols-this.getMaxCols())/2);
      if(!ignoreRows){
        this.y=Math.floor((rows-this.getMaxRows())/2);
      }
    }
    
  };
  window.Shape=Shape;
})(window);