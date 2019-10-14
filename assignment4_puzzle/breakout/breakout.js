var canvas = document.getElementById("myCanvas");  //在"myCanvas"中，为canvas元素获取对象
var ctx = canvas.getContext("2d");  //用canvas元素的getcontext方法来渲染上下文并绘制
var x = canvas.width/2;    
var y = canvas.height-30;  //position: width的一半，height長度減30
var dx = 2;
var dy = -2;  //add a small value to x y after every frame has been drawn to make it appear that the ball is moving
var ballRadius = 10;
var paddleHeight = 10;   //define a controllable paddle to hit the ball
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;  //its starting point on x axis

var brickRowCount = 1;   
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;   // some space from the top and left edge
var brickOffsetLeft = 30;
  
var bricks =[];                            //use array to create a "brick container"~
for (var c=0; c < brickColumnCount;c++){    // ++ 自增，將操作數的值加一. 如果放在操作數前面(++x), 則返回加一後的值; 如果放在操作數後面(x++), 則返回操作數原值,然後再將操作數加一
    bricks[c] = [];    //
    for (var r=0; r<brickRowCount; r++){
        bricks[c][r] = {x:0, y:0, status:1};   //brick rows and columns, and xy position of each brick；xy是这个数组的属性，注意写法
    }                                          //status property defines whether the bricks is shouwn on the screen --> collision--> status changes 
}   

var score = 0;

document.addEventListener("mousemove",mouseMoveHandler,false); 
/*addEventListener("事件名称",函数名,响应时间),
false表示该元素在事件的“冒泡阶段”（由内向外传递时）响应时间。addEventListener其实对capture或者bubble都无影响，因为都是监听在document之上，不管鼠标多快、不管是不是超出目标元素的范围，mousemove事件都会发生。
用capture阶段(true)只是比bubble调用处理函数快了，依旧会出现目标元素更不上的情况;而把事件绑定在bubble阶段可以最大限度兼容各大浏览器*/

function collisionDetection() {
for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
        var b = bricks[c][r];     //use b to store the brick object in every loop of the collision detection
        if(b.status == 1){ 
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {   //when collision occurs (the ball's center is inside a brick)
            dy = -dy;   //change the ball's direction 
            b.status = 0;  //change the status
            score++; 
            if (score == brickColumnCount*brickRowCount){     //use score to detect whether all the bricks have been cleared
                alert("You've cleared all the bricks! Congratulations!");
                document.location.reload();  //location.reload() 刷新页面方法,方法只有一个参数,当参数值为 false 或者未传参时,浏览器从缓存中读取页面,而当参数为 true 时,强制浏览器从服务器加载页面资源; location对象包含当前URL的信息
                clearInterval(interval);  //for Chrome to end the game
            }
        }}
    }
}}
    
function drawBall(){       //draw a ball
    ctx.beginPath();      
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);  //(xy coordinate of center, radius, start angle, end angle (what angle to start and finish drawing the circle, Math.PI是弧度制的180度)）
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath(); 
}

function drawPaddle(){
    ctx.beginPath();   
    ctx.rect(paddleX, canvas.height-paddleHeight,paddleWidth,paddleHeight);     //the first two values are the coordinate of the top left "x from the left and y from the top"
    ctx.fillstyle="#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if (bricks[c][r].status == 1) {     //draw the brick when its status = 1
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;  
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;  //the coordinate of every brick
                bricks[c][r].y = brickY;
                ctx.beginPath();  
                ctx.rect(brickX, brickY, brickWidth, brickHeight);  
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }   
    }
}

function draw(){    //make the ball move
    ctx.clearRect(0 , 0, canvas.width, canvas.height);  //This is a rectangle and the whole area covered by it (the canvas) will be cleared off before each frame, so the moving ball wont leave a trail. 
    drawBall();  //dont forget to call drawBall here.
    drawPaddle();  //actually draw the paddle
    collisionDetection();  //activate the detection
    drawBricks();  //actually draw the bricks
    /*if(y + dy > canvas.height-ballRadius ||y + dy < ballRadius){   //when the edge of the ball touch the bottom/top (the coordinate system starts from the top left ); if use 0 instead of ballRadius, it will be the center of the ball that hit the edge, so half of the ball goes out of the edge
    dy = -dy;       //move opposite
    }*/

    if(y + dy < ballRadius){
    dy = -dy;  
    } else if (y + dy > canvas.height-ballRadius){       //if the ball touch the bottom of canvas... (觸底又可以分成碰到了paddle & 碰到paddle以外的地方)
        if(x >= paddleX && x <= paddleX + paddleWidth){    //"if in if"; To detect whether the paddle hit the ball (whether x is within the left and right ends of paddle)
            dy = -dy;
        }
        else {
            alert("Opps! Game Over");
            document.location.reload();  //reload the page to restart the game
            clearInterval(interval);   //needed for Chrome to end the game. facing some "browser differences"
        }
      } 

    if (x + dx > canvas.width-ballRadius || x + dx < ballRadius){   //when touching the right and left edge; || means "or", use it to merge two statement into one.
        dx=-dx;
    }


    x += dx;   //+= means x=x+dx
    y += dy;   //update x y with dx and dy on every frame so that the ball will be painted in new position
}
     

    function mouseMoveHandler(e){
        var relativeX= e.clientX - canvas.offsetLeft;  //clientX 事件屬性返回當事件被觸發時鼠標指針相對於瀏覽器頁面（客戶區）的水平坐標; offsetLeft
        if(relativeX>0 && relativeX<canvas.width){     //if the mouse is inside the canvas...; && means "and"
        paddleX = relativeX - paddleWidth/2;}     
    }
   
    var interval = setInterval(draw, 10);
    //The draw() function will be executed within setInterval every 10 miliseconds. The draw() function will be called every 10 milliseconds forever, or until we stop it.  setTimeout:只運行一次
 
