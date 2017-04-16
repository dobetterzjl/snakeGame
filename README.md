# snakeGame
一个JavaScript贪吃蛇小游戏，面向过程版
[DEMO](https://dobetterzjl.github.io/snakeGame/贪吃蛇1.0)

面向对象与面向过程主要区别：
分析问题的方式和代码写法

难点：

1.创建的食物位置：由于食物不能与蛇身体任一节重合，所以用了do while 循环，同时设置了一个标志位，用来标志位置是否创建成功

2.让蛇动：首先让蛇头向下一位置移动，设置其水平动，只需取到当前位置left值加20，每一节位置到上一节位置，但是会出现一个问题，每节都会到原来蛇头位置，
所以在移动前先将变量缓存

3.解决按键盘上下左右键后蛇的移动方向有延迟问题：（由于键盘事件中，只处理了方向的改变，所以方向改变真正执行是在下一次定时器事件执行时）
在键盘的onkeydown 事件中 添加调用一次move（）函数，即：在方向改变后立即执行函数

4.在面向对象时，主要时自定义对象与dom对象间函数区别，面向对象时，可以在对象中添加一个自定义属性，取名dom,在属性内取到其dom对象


