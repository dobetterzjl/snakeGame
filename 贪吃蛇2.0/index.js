(function(){
	//操场对象
	var ground = {
		dom:document.getElementById('ground'),
		createFood:function(){
		return new Food();	
		}
	};
	//蛇对象
	var snake = {
		snakeBody:[],
		speed:300,
		direction:'right',
		move:function(){
			this.snakeHead = this.snakeBody[0];
				if(this.direction== 'left'){
					this.nextPos = {
						left: this.snakeHead.offsetLeft - 20,
						top: this.snakeHead.offsetTop
					};
				}else if(this.direction == 'top'){
					this.nextPos = {
						left: this.snakeHead.offsetLeft,
						top: this.snakeHead.offsetTop - 20
					};
				}else if(this.direction == 'right'){
					this.nextPos = {
						left: this.snakeHead.offsetLeft + 20,
						top: this.snakeHead.offsetTop
					};
				}else if(this.direction == 'down'){
					this.nextPos = {
						left: this.snakeHead.offsetLeft,
						top: this.snakeHead.offsetTop + 20
					};
				}
				if(this.nextPos.left == ground.food.pos.left && this.nextPos.top == ground.food.pos.top){
					this.eat();
				}else{
					for(var i=0; i<this.snakeBody.length; i++){
						var nowPos = {
							left: this.snakeBody[i].offsetLeft,
							top: this.snakeBody[i].offsetTop
						};
						this.snakeBody[i].style.left = this.nextPos.left + 'px';
						this.snakeBody[i].style.top = this.nextPos.top + 'px';
						this.nextPos = nowPos;
					}
				}	
			for(var i=4; i<this.snakeBody.length; i++){
					if(this.snakeBody[i].offsetLeft == this.snakeHead.offsetLeft && this.snakeBody[i].offsetTop == this.snakeHead.offsetTop){
						this.die();
					}
				}


			if (this.snakeHead.offsetTop<0||this.snakeHead.offsetTop>480||this.snakeHead.offsetLeft<0||this.snakeHead.offsetLeft>980) {
					this.die();
				}
		},
		eat:function(){
					ground.food.dom.className = 'block snake-block';
					ground.food.dom.style.left = this.snakeHead.offsetLeft + 'px';
					ground.food.dom.style.top = this.snakeHead.offsetTop + 'px';
					this.snakeHead.style.left = this.nextPos.left + 'px';
					this.snakeHead.style.top = this.nextPos.top + 'px';
					snake.snakeBody.splice(1,0,ground.food.dom);
					ground.food=ground.createFood();
		},
		grow:function(){

		},
		die:function(){
			alert('Game over!');
			clearInterval(game.timer);
		}
	};
	var Food=function(){
				do{
					var bFlag = true;//一个标识位，true代表找到合适的食物坐标
					this.pos={
						left : parseInt(Math.random() * 50) * 20,//0-980
						top : parseInt(Math.random() * 25) * 20
					}
					
					for(var i=0; i<snake.snakeBody.length; i++){
						if(snake.snakeBody[i].offsetLeft == this.pos.left && snake.snakeBody[i].offsetTop == this.pos.top){
							bFlag = false;
						}
					}
				}
				while(!bFlag);
				this.dom = document.createElement('div');
				this.dom.className = 'block food-block';
				this.dom.style.left = this.pos.left + 'px';
				this.dom.style.top = this.pos.top + 'px';
				ground.dom.appendChild(this.dom);
	};
	var game = {
		timer:null,
		init:function(){
			//创建蛇
			for(var i=0; i<3; i++){
				var oDiv = document.createElement('div');
				oDiv.className = 'block snake-block';
				oDiv.style.left = (3 - i) * 20 + 'px';
				ground.dom.appendChild(oDiv);
				snake.snakeBody.push(oDiv);
			}
			ground.food = ground.createFood();
			//给document注册onkeydown事件
			document.onkeydown = function(e){
				e = e || window.event;
				var keyCode = e.which || e.keyCode;
				if(keyCode ==  37){//left
					if(snake.direction != 'right'){
						snake.direction = 'left';
					}
				}else if(keyCode ==  38){//top
					if(snake.direction != 'down'){
						snake.direction = 'top';
					}

				}else if(keyCode ==  39){//right
					if(snake.direction != 'left'){
						snake.direction = 'right';
					}

				}else if(keyCode ==  40){//down
					if(snake.direction != 'top'){
						snake.direction= 'down';
					}

				}
				snake.move();
			};
			var oBtnStart = document.getElementById('btn-start');
			oBtnStart.onclick = function(){
				game.start();
			};
			var oBtnPause = document.getElementById('btn-pause');
			oBtnPause.onclick = function(){
				game.pause();
			};
	
		},
		start:function(){
			game.timer = setInterval(function(){
					snake.move();
					
				}, snake.speed);
		},
		pause:function(){
			clearInterval(game.timer);
		},
		countScore:function(){

		}
	}
	game.init();
})();