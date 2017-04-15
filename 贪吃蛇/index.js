
		(function(){

			var direction = 'right';//蛇移动方向，初始向右
			var oFood;
			var timer = null;

			//1. 初始化草场
			var oGround = document.getElementById('ground');
			for(var i=0; i<50*25; i++){
				var oDiv = document.createElement('div');
				oDiv.className = 'block';
				oGround.appendChild(oDiv);
			}

			//2. 创建蛇
			var snakeBody = [];
			for(var i=0; i<3; i++){
				var oDiv = document.createElement('div');
				oDiv.className = 'block snake-block';
				oDiv.style.left = (3 - i) * 20 + 'px';
				oGround.appendChild(oDiv);
				snakeBody.push(oDiv);
			}

			//3. 创建食物
			function createFood(){
				do{
					var bFlag = true;//一个标识位，true代表找到合适的食物坐标
					var iLeft = parseInt(Math.random() * 50) * 20;//0-980
					var iTop = parseInt(Math.random() * 25) * 20;
					for(var i=0; i<snakeBody.length; i++){
						if(snakeBody[i].offsetLeft == iLeft && snakeBody[i].offsetTop == iTop){
							bFlag = false;
						}
					}
				}while(!bFlag);
				oFood = document.createElement('div');
				oFood.className = 'block food-block';
				oFood.style.left = iLeft + 'px';
				oFood.style.top = iTop + 'px';
				oGround.appendChild(oFood);
			}
			createFood();
			
			var oBtnStart = document.getElementById('btn-start');
			oBtnStart.onclick = function(){
				timer = setInterval(function(){
					move();
					
				}, 300);
			};

			

			






			//蛇移动的函数
			function move(){
				var snakeHead = snakeBody[0];
				var nextPos;
				if(direction == 'left'){
					nextPos = {
						left: snakeHead.offsetLeft - 20,
						top: snakeHead.offsetTop
					};
				}else if(direction == 'top'){
					nextPos = {
						left: snakeHead.offsetLeft,
						top: snakeHead.offsetTop - 20
					};
				}else if(direction == 'right'){
					nextPos = {
						left: snakeHead.offsetLeft + 20,
						top: snakeHead.offsetTop
					};
				}else if(direction == 'down'){
					nextPos = {
						left: snakeHead.offsetLeft,
						top: snakeHead.offsetTop + 20
					};
				}
				
				//4. 蛇吃食物和增长身体
				if(nextPos.left == oFood.offsetLeft && nextPos.top == oFood.offsetTop){
					oFood.className = 'block snake-block';
					oFood.style.left = snakeHead.offsetLeft + 'px';
					oFood.style.top = snakeHead.offsetTop + 'px';
					snakeHead.style.left = nextPos.left + 'px';
					snakeHead.style.top = nextPos.top + 'px';
					snakeBody.splice(1,0,oFood);
					createFood();
				}else{
					for(var i=0; i<snakeBody.length; i++){
						var nowPos = {
							left: snakeBody[i].offsetLeft,
							top: snakeBody[i].offsetTop
						};
						snakeBody[i].style.left = nextPos.left + 'px';
						snakeBody[i].style.top = nextPos.top + 'px';
						nextPos = nowPos;
					}
				}

				//5. 判断是否吃到自己和墙
				for(var i=4; i<snakeBody.length; i++){
					if(snakeBody[i].offsetLeft == snakeHead.offsetLeft && snakeBody[i].offsetTop == snakeHead.offsetTop){
						alert('Game over!');
						clearInterval(timer);
					}
				}
				if (snakeHead.offsetTop<0||snakeHead.offsetTop>480||snakeHead.offsetLeft<0||snakeHead.offsetLeft>980) {
					alert('Game over!');
						clearInterval(timer);
				}


			}
var oPause = document.getElementById('btn-pause');
oPause.onclick = function(){
	clearInterval(timer);
}
			//给document注册onkeydown事件
			document.onkeydown = function(e){
				e = e || window.event;
				var keyCode = e.which || e.keyCode;
				if(keyCode ==  37){//left
					if(direction != 'right'){
						direction = 'left';
					}
				}else if(keyCode ==  38){//top
					if(direction != 'down'){
						direction = 'top';
					}

				}else if(keyCode ==  39){//right
					if(direction != 'left'){
						direction = 'right';
					}

				}else if(keyCode ==  40){//down
					if(direction != 'top'){
						direction = 'down';
					}

				}
				move();
			};







		})();





