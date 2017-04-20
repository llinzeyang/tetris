(function(window){
function Board(gameInst){
	this.gameInst=gameInst;
	this.blockSize=30;
	this.rows=TetrisConfig.rows;//方块数
	this.cols=TetrisConfig.cols;
	this.canvas=new Canvas('c_game_main',this.cols*this.blockSize,this.rows*this.blockSize);
	this.context=this.canvas.context;
	this.boardList=[];
	this.shape=new window.Shape();
	this.init();

	var b=ResourceManager.getResource('blocks');
  console.log(b);
}

Board.prototype={
	constructor:Board,
	init:function(){
		this.buildGridData();
		this.initGrid();

		this.shape.draw(this.context);
		var self=this;
		setTimeout(function(){
	  	self.buildNextShape();
		})
	},
	//下一方块
	buildNextShape:function(){
    this.nextShape=new window.Shape();
    this.nextShape.setPosition(this.gameInst.nextshape.cols,this.gameInst.nextshape.rows);
    this.gameInst.nextshape.render(this.nextShape);
	},
	buildGridData:function(){
		for(var i=0;i<this.rows;i++){
			this.boardList[i]=[];
			for(var j=0;j<this.cols;j++){
				this.boardList[i][j]=0;
			}
		}
	},
	initGrid:function(){
    this.context.strokeStyle='green';
    this.context.lineWidth=0.5;
    //绘制线条
    for(var i=0;i<=this.rows;i++){
    	this.context.moveTo(0,i*this.blockSize);
    	this.context.lineTo(this.canvas.width,i*this.blockSize);
    }
    for(var i=0;i<=this.cols;i++){
    	this.context.moveTo(i*this.blockSize,0);
    	this.context.lineTo(i*this.blockSize,this.canvas.height);
    }
    this.context.stroke();
    //缓存数据
    this.gridImageData=this.context.getImageData(0,0,this.canvas.width,this.canvas.height);
	},
	tick:function(){
		if(this.validMove(0,1)){
		  this.shape.y+=1;
	  }else{
      this.addShapeToBoardList();
      if(this.gameInst.state==='over'){
      	this.gameInst.endGame();
      	return;
      }
      this.clearFullRows();
      this.shape=this.nextShape;
      this.shape.setPosition(this.cols,this.rows,true);
      this.buildNextShape();
	  }
		this.refresh();
		this.shape.draw(this.context);
	},
	refresh:function(){
		this.canvas.clear();
		this.context.putImageData(this.gridImageData,0,0);
    this.drawBlocks();
	},
	//边界检测
	validMove:function(moveX,moveY){
    //下一步位置
    var nextX=this.shape.x+moveX;
    var nextY=this.shape.y+moveY;
    for(var y=0;y<this.shape.layout.length;y++){
    	for(var x=0;x<this.shape.layout[y].length;x++){
    		if(this.shape.layout[y][x]){
    			if(typeof this.boardList[nextY+y]==='undefined' || typeof this.boardList[nextY+y][nextX+x]==='undefined'||this.boardList[nextY+y][nextX+x]||nextX+x<0||nextX+x>=this.cols||nextY+y>=this.rows){//找不到行||找不到列||当前位置已有方块||超出左边界||超出右边界||超出下边界
    				return false;
    			}
    		}
    	}
    }
    return true;
	},
	addShapeToBoardList:function(){
		for(var y=0;y<this.shape.layout.length;y++){
			for(var x=0;x<this.shape.layout[y].length;x++){
				if(this.shape.layout[y][x]){
					var boardX=this.shape.x+x;
					var boardY=this.shape.y+y;
					if(this.boardList[boardY][boardX]){
						//gameover
            this.gameInst.state='over';
            return;
					}else{
						this.boardList[boardY][boardX]=this.shape.blockType;
					}
				}
			}
		}
	},
	drawBlocks:function(){
    for(var y=0;y<this.rows;y++){
    	for(var x=0;x<this.cols;x++){
    		if(this.boardList[y][x]){
    			this.shape.block.draw(this.context,x,y,this.boardList[y][x]);
    		}
    	}
    }
	},
	createEmptyRow(){
    var emptyArr=[];
    for(var i=0;i<this.cols;i++){
    	emptyArr.push(0);
    }
    return emptyArr;
	},
	//方块消除
	clearFullRows:function(){
		var lines=0;
    for(var y=this.rows-1;y>=0;y--){
    	var filled=this.boardList[y].filter(function(item){return item>0;}).length===this.cols;
    	if(filled&&y){
    		this.boardList.splice(y,1);
    		this.boardList.unshift(this.createEmptyRow());
    	  y++;
    	  lines++;
    	}
    }
    //计算得分
    var score=lines*10*lines;
    var totalScore=this.gameInst.score.addScore(score);
    this.gameInst.highscore.checkScore(totalScore);
    var currentLevel=this.gameInst.level.checkLevel(totalScore);
    if(currentLevel){
    	window.TetrisConfig.speed=Math.floor(window.TetrisConfig.constSpeed*(1-(currentLevel-1)/10));
    }

	}
};
window.Board=Board;
})(window);

