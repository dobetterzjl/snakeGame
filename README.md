# snakeGame
一个JavaScript贪吃蛇小游戏，面向过程版
难点：
1.创建的食物位置：由于食物不能与蛇身体任一节重合，所以用了do while 循环，同时设置了一个标志位，用来标志位置是否创建成功
2.让蛇动：首先让蛇头向下一位置移动，设置其水平动，只需取到当前位置left值加20，每一节位置到上一节位置，但是会出现一个问题，每节都会到原来蛇头位置，
所以在移动前先将变量缓存
