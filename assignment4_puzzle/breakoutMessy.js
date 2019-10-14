
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");  //create a ctx variable to store the 2D rendering context — the tool that can be used to paint on the Canvas.
var x = canvas.width/2;    
var y = canvas.height-30;  //position: width的一半，height長度減30
var dx = 2;
var dy = -2;  //add a small value to x y after every frame has been drawn to make it appear that the ball is moving
var ballRadius = 10;
var paddleHeight = 10;   //define a controllable paddle to hit the ball
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;  //its starting point on x axis

/*var rightPressed = false;   //define the press button innitialized with false, because they are not pressed at the beginning.
var leftPressed = false; */

var brickRowCount = 1;   
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;   // some space from the left and top edge
var brickOffsetLeft = 30;
  
var bricks =[];                            //use array to create a "brick container"~
for (var c=0; c < brickColumnCount;c++){    // ++ 自增，將操作數的值加一. 如果放在操作數前面(++x), 則返回加一後的值; 如果放在操作數後面(x++), 則返回操作數原值,然後再將操作數加一
    bricks[c] = [];    //
    for (var r=0; r<brickRowCount; r++){
        bricks[c][r] = {x:0, y:0, status:1};   //brick rows and columns, and xy position of each brick；xy是这个数组的属性，注意写法
    }                                          //status property defines whether the bricks is shouwn on the screen --> collision--> status changes 
}   

var score = 0;

    /*document.addEventListener("keydown", keyDownHandler, false);   //keydown event is fired when any keys are pressed. and when the keydown event is fired, the ketDownHandler() function wil be executed.
    document.addEventListener("keyup", keyUpHandler, false);  */     //addEventListener(event, function, useCapture)其中useCapture選填，是Booleen，指定事件是否 在捕獲或冒泡階段執行：ture--捕獲階段，false--冒泡階段

    document.addEventListener("mousemove",mouseMoveHandler,false);  //add an event listener, addEventListener("事件名称",函数名,响应时间)false表示该元素在事件的“冒泡阶段”（由内向外传递时）响应时间，事件绑定在冒泡阶段可以最大限度兼容各大浏览器

    /*function keyDownHandler(e){                         //e represents event, key holds the information about the key that was pressed.
        if(e.key =="Right" || e.key == "ArrowRight"){     //if left is pressed, the leftPressed variable is set to true; when released, leftPressed is set to false.
            rightPressed = true;
        }
        else if(e.key == "Left"|| e.key == "ArrowLeft"){
            leftPressed = true;
        }
    }
    function keyUpHandler(e) {
        if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
        }
    }*/

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
                    document.location.reload();
                    clearInterval(interval);  //for Chrome to end the game
                }
            }}
        }
    }}
    
    function drawBall(){        //draw a ball
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);  //start angle and end angle (what angle to start and finish drawing the circle, in radians)
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath(); 
    }

    function drawPaddle(){
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height-paddleHeight,paddleWidth,paddleHeight);     //the first two values specify the coordinate of the top left "x from the left and y from the top"
        ctx.fillstyle="#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function drawBricks() {
        for(var c=0; c<brickColumnCount; c++) {
            for(var r=0; r<brickRowCount; r++) {
                if (bricks[c][r].status == 1) {     //draw the brick when its status = 1
                    var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;  //the coordinate of every brick
                    var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                    bricks[c][r].x = brickX;
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

        /*if(rightPressed) {       //check if the left/right cursor is pressed when each frame is rendered. if pressed, the paddle will move 7px to left/right
            paddleX += 7;
            if (paddleX + paddleWidth > canvas.width){     //move the paddle within the canvas
                paddleX = canvas.width - paddleWidth;
            }
        }
        else if(leftPressed) {
            paddleX -= 7;
            if (paddleX < 0){
                paddleX = 0;
            }
        }*/

        x += dx;   //+= means x=x+dx
        y += dy;   //update x y with dx and dy on every frame so that the ball will be painted in new position
    }
     

    function mouseMoveHandler(e){
        var relativeX= e.clientX - canvas.offsetLeft;  //clientX 事件屬性返回當事件被觸發時鼠標指針相對於瀏覽器頁面（客戶區）的水平坐標; offsetLeft
        if(relativeX>0 && relativeX<canvas.width){     //if the mouse is inside the canvas...; && means "and"
        paddleX = relativeX - paddleWidth/2;}     
    }
   
    //setInterval(draw, 10);    //The draw() function will be executed within setInterval every 10 miliseconds. The draw() function will be called every 10 milliseconds forever, or until we stop it.  setTimeout:只運行一次

    var interval = setInterval(draw, 10);
 
