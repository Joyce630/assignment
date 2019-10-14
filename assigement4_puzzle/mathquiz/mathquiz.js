        
    let num1 = Math.floor(Math.random()*(100-10)+10);   //let声明局部变量，只在let命令所在的代码块内有效；var声明全局变量；Math.floor() 返回小于或等于一个给定数字的最大整数
    let num2 = Math.floor(Math.random()*(100-10)+10);   //math.random 返回[0，1) 的一个随机数; Math.random()*(n-m)+m) 返回指定范围(m,n)随机数


    document.getElementById('v1').value = num1;
    document.getElementById('v2').value = num2;

    let answ = num1 * num2;   

    const Quiz = () => {      //const 声明一个只读的常量，一旦声明，常量的值就不能改变;=> 在語法上是常規函數表達式的緊湊選擇，儘管沒有與this，arguments，super或new.target關鍵字的綁定。箭頭函數表達式不適合用作方法，並且不能用作構造函數。
        var usera = document.getElementById('answer').value;

        if(usera == answ) {
             alert('You are right! Well done!');
        } else {
             alert("The corret answer is "+ answ + ". Try Again ~ "); 
        }

        document.getElementById('answer').value = "";
        num1 = Math.floor(Math.random()*(100-10)+10);
        num2 = Math.floor(Math.random()*(100-10)+10);

        document.getElementById('v1').value = num1;
        document.getElementById('v2').value = num2;

        answ = num1 * num2;
    }

   