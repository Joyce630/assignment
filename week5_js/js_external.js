<!--two ways to get input and return output-->

function show_topic() {
    var x = 0;   <!--不明-->
    var y = 0;
    z= get_input(x,y);
    var my_answer = document.getElementById("demo");   <!--这一行怎么理解-->
    my_answer.style.fontSize = "25px";
    my_answer.style.color = "red";
    my_answer.style.background="green";
    document.getElementById("demo").innerHTML="<center><h1 style='color:yellow;'>The answer is: "+ z +"</h1></center>"
    <!--显示了运算出来的z的值,而且用js改变了demo这个元素的style,注意前提是html里有id为demo的元素-->
}

function show_topic2(){
    var x = 0;  
    var y = 0;
    z= get_input2(x,y);
    var my_answer = document.getElementById("demo");   <!--这一行怎么理解-->
    my_answer.style.fontSize = "25px";
    my_answer.style.color = "red";
    my_answer.style.background="green";
    document.getElementById("demo").innerHTML="<center><h1 style='color:yellow;'>The answer is: "+ z +"</h1></center>"
}

function get_input(x,y) {
    x = parseInt(prompt("Enter x:"));
    y = parseInt(prompt("Enter y:"));
    return x+y;
 }

 function get_input2(x,y) {
    var x = parseInt(document. forms["inputform"]["x"].value);
    var y = parseInt(document. forms["inputform"]["y"].value);
    return x+y;
 }



 