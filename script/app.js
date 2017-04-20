(function(document){
  var gameInst;
	function DomObject(dom){
		this.dom=dom;
	}
	DomObject.prototype.get=function(){
		return this.dom;
	}
	DomObject.prototype.on=function(eventName,eventHandler){
		this.get().addEventListener(eventName,eventHandler);
	}
  DomObject.prototype.css=function(styleKey,styleValue){
  	this.get().style[styleKey]=styleValue;
  }
  function $(selector,context){
  	return new DomObject((context||document).querySelector(selector));
  }
  function startGame(){
  	ResourceManager.onResourceLoaded=function(){
  	  gameInst=new Tetris();
      gameInst.startGame();
  	};
  	ResourceManager.init();
  }

	function init(){
    $('#btn-start').on('click',function(e){
      $('.start-container').css('display','none');
      $('.game-container').css('display','block');
      startGame();
    });
    $('#btn-game-pause').on('click',function(e){
      var el=e.target;
      if(el.innerText==='暂停'){
        el.innerText='继续';
        gameInst.pause();
      }else{
        el.innerText='暂停';
        gameInst.resume();
      }
    });
	}
	document.addEventListener('DOMContentLoaded',function(e){
		init();
	});
})(document);