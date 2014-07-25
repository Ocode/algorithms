
// TEST



//Method_3(你可以扩展输出中间计算过程吗)
//如此实现，首先要实现逆波兰式（也叫后缀表达式，将运算符写在操作数之后）
//

/* 算法实现
将一个普通的中序表达式转换为逆波兰表达式的一般算法是：
首先需要分配2个栈，一个为符号栈operStack（含一个结束符号#），一个为输数字栈numsStack（空栈），operStack栈可先放入优先级最低的运算符#（注意，中缀式应以此最低优先级的运算符结束。可指定其他字符，不一定非#不可）。从中缀式的左端开始取字符，逐序进行如下步骤：
1. 若取出的字符是操作数，则分析出完整的运算数，直接送入数字栈numsStack。
2. 若取出的字符是运算符，则将该运算符与符号栈operStack栈顶元素比较，如果该运算符优先级大于符号栈operStack栈顶运算符优先级，则将该运算符进符号栈。否则，将符号栈operStack栈顶运算符弹出推入数字栈（运算时这个符号则弹出，并数字栈运算得的结果推入数字栈——每弹出一个运算符，就弹出两个数字参与运算）直至符号栈栈顶运算符低于（不包括等于）该运算符优先级，则将该运算符送入符号栈。
3. 若取出的字符是“（”，则直接送入符号栈栈顶。
4. 若取出的字符是“）”，则将距离符号栈栈顶最近的“（”之间的运算符，逐个出栈，依次送入数字栈，此时抛弃“（”。
5. 重复上面的1~4步，直至处理完所有的输入字符
6. 若取出的字符是“#”，则将符号栈内所有运算符（不包括“#”），逐个出栈，依次送入数字栈。
完成以上步骤，数字栈便为逆波兰式输出结果。不过S2应做一下逆序处理。便可以按照逆波兰式的计算方法计算了！

例：3+2*6-2
运算过程：
（1）首先扫描到一个数字3，直接入数栈
（2）继续扫描发现是一个+，现在符号栈是空的，直接入栈
（3）继续扫描发现是一个数字2，直接入数栈
（4）继续扫描发现是一个*，现在符号栈不为空，并且*大于当前符号栈栈顶+的运算优先级，直接入栈
（5）继续扫描发现是一个数字6，直接入数栈
（6）继续扫描发现是一个-，现在符号栈不为空，并且-小于当前符号栈栈顶*的运算优先级，则计算。怎么计算呢，从数栈弹出两个数，从符号栈弹出一个运算符。即从数栈弹出6和2，然后从符号栈弹出*，并用变量接收。注意此时两个栈的top的指向变化

**/

// 将算术表达式转化为后缀表达式
function turnRPN(input){
    // 传入用户输入的表达式 input = '3+2*6-5' '3+2*(6-5)';
    // 注意，以下方法会拆分二位以上数字
    //var str = input.replace(/\s/g,'').split(''),    //存储原算术表达式
    var str = input.replace(/\s/g,'').match(/\d+|\D/g),    //存储原算术表达式
        stack = ['#'],  //作为栈使用
        result = [],    //存储后缀表达式
        oper;           //操作符（非数字）
    var sum, i, j, t, top = 0;
    console.log("*******************************************\n"
            +   "*      输入一个求值的表达式，以#结束。    *\n"
            +   "*******************************************\n");
    //console.log("算数表达式：" + input.replace(/\s/g,'').split('').join(' '));
    console.log("算数表达式：" + input);
    console.log("原来表达式：");
    console.log(str);
    str.push("#");
    sum = str.length;
    i=0;
    oper = str[i];
    i++;
    while (oper != "#") {
        switch (oper) {
            case '(':
                /*判定为左括号*/
                stack.push(oper);
                top++;
                break;
            case ')':
                /*判定为右括号*/
                while (stack[top] != '(') {
                    result.push(stack.pop());
                    top--;
                }
                stack.pop()
                top--;
                break;
            case '+':
            case '-':
                /*判定为加减号*/
                while (top != 0 && stack[top] != '(') {
                    result.push(stack.pop());
                    top--;
                }
                top++;
                stack.push(oper);
                break;
            case '*':
            case '/':
                /*判定为乘除号*/
                while (stack[top] == '*' || stack[top] == '/') {
                    result.push(stack.pop());
                    top--;
                }
                top++;
                stack.push(oper);
                break;
            case '':
                break;
            default:
                if(oper >= '0' && oper <= '9'){
                    result.push(oper);
                }

                // while (oper >= '0' && oper <= '9') { /*判定为数字*/
                //     result.push(oper);
                //     oper = str[i];
                //     i++;
                // }
                // i--;
        }
        oper = str[i];
        i++;
    }

    while (top != 0) {
        result.push(stack.pop());
        top--;
    }
    //result[t] = '';
    console.log("逆波兰式：");
    console.log(result);
    return result;
}

function compvalue(){
    
}

//var input  = '3+2*(6-5)-1';
//var input  = '2 + 3*4/2 -3*3';
//var output1 = turnRPN(input);

//console.log(output);



// @@
// Evaluate Reverse Polish Notation
//

/* intro

Evaluate the value of an arithmetic expression in Reverse Polish Notation.
Valid operators are +, -, *, /. Each operand may be an integer or another expression.

Some examples:
  ["2", "1", "+", "3", "*"] -> ((2 + 1) * 3) -> 9
  ["4", "13", "5", "/", "+"] -> (4 + (13 / 5)) -> 6

**/

//计算
function evalRPN(tokens){
    var returnValue = 0,
        operators = "+-*/",
        numsStack = [];
    for(i=0,len = tokens.length;i<len;i++){
        var t = tokens[i];
        if(operators.indexOf(t)==-1){
            //当前非运算符，则存入，否则弹出两个数字做运算并存入
            numsStack.push(parseInt(t,10));
            //console.log(t);
        }else{
            var a = parseInt(numsStack.pop(),10),
                b = parseInt(numsStack.pop(),10);
            switch(t){
                case "+":
                    numsStack.push(a+b);
                    break;
                case "-":
                    numsStack.push(b-a);
                    break;
                case "*":
                    numsStack.push(a*b);
                    break;
                case "/":
                    if (a != 0){
                        numsStack.push(b/a);
                    }else{
                        console.log("除零错误");
                        return;
                    }
                    break;
            }
            //resultHTML += ('='+  +'<br>');
            //console.log(numsStack);
        }
    }

    returnValue = parseInt(numsStack.pop(),10);
    return returnValue;
}
// var input = ["2", "1", "+", "3", "*"];
// var input = ["3", "4", "2", "*", "+" ,"6", "-"];//3+4*2-6
// var input = ["3", "2", "6", "5", "-" ,"*", "+"];//3+4*2-6
// var output = evalRPN(output1);
// console.log(output);


function prnToInfix(prn){
    //逆波兰式转为中缀表达式
    var infixEq = {
        "prn" : prn,
        "stepPrn" : [],
        "stepEqs" : [],
        "result" : 0
    };

    var returnValue = 0,
        tokens = prn,
        operators = "+-*/",
        numsStack = [];
    infixEq.stepEqs.push(prnToEq(prn));
    for(var i=0,j=0,len = tokens.length;i<len;i++){
        var t = tokens[i];
        if(operators.indexOf(t)==-1){
            //当前非运算符，则存入，否则弹出两个数字做运算并存入
            numsStack.push(parseInt(t,10));
            //console.log(t);
        }else{
            var a = parseInt(numsStack.pop(),10)||0,
                b = parseInt(numsStack.pop(),10)||0;
            switch(t){
                case "+":
                    numsStack.push(a+b);
                    break;
                case "-":
                    numsStack.push(b-a);
                    break;
                case "*":
                    numsStack.push(a*b);
                    break;
                case "/":
                    if (a != 0){
                        numsStack.push(b/a);
                    }else{
                        console.log("除零错误");
                        return;
                    }
                    break;
            }
            j++;
            //var index = function(){return i};
            (function(i,j,tt){
                //console.log(tokens.slice(arg))
                infixEq.stepPrn[j] = numsStack.concat(tokens.slice(i+1));
                infixEq.stepEqs.push(prnToEq(infixEq.stepPrn[j],tt))
                //console.log(infixEq.stepPrn);
                //console.log(infixEq.stepEqs);
            })(i,j,t);
            
            //resultHTML += ('='+  +'<br>');
            //console.log(numsStack);
        }
    }
    infixEq.result = parseInt(numsStack.pop(),10);
    return infixEq;
}

//Method_2(脱式计算，即递等式计算，把计算过程完整写出来的运算，也就是脱离竖式的计算。)
//var calculation = '2+4*3';


function getTags(tags){
    return document.getElementsByTagName(tags);
}
function getId(id){
    return document.getElementById(id);
}

var inputBox = getTags('input');
var equal = getTags('button');
var outBox = getId('result');
var resultHTML = '';

//输入公式
//原始等式

equal[0].onclick = function(){
    var input = inputBox[0].value || '(12*2-(5+1))/2*3+(11-2*3) ';//'22-4*(6-(2+1))+1';//'3+4*2-6';//3+2*(6-5)-1
    var oriEq = input;
    //转为逆波兰式
    var prnEq = turnRPN(input);
    resultHTML += ('&nbsp;');
    //计算逆波兰式
    //var result = evalRPN(prnEq);
    
    //逆波兰式转为中缀表达式,并计算中间步骤
    //console.log(prnToInfix(prnEq).stepEqs)
    resultHTML += (prnToInfix(prnEq).stepEqs.join('<br>=')+'<br><br>');

    //resultHTML += ('=' + result + '<br><br>');
    outBox.innerHTML = resultHTML;
}




//逆波兰式转为中缀表达式
function prnToEq(prn){
    var prn = prn; //|| ["12", "2", "*", "5", "-", "1", "+", "12", "/", "13", "*", "11", "2", "3", "*", "-", "+"] ;
    //["11", "2", "*", "100", "-", "1", "+", "12", "/", "13", "*", "11", "2", "3", "*", "-", "+"] 
    //["2", "3", "1", "-", "*", "4", "+"];   
    //["3", "4", "2", "*", "+", "6", "-"];
    //console.log(prn);
    var returnValue = 0,
        operators = "+-*/",
        numsStack = [];
    //var status = [];
    for(i=0,len = prn.length;i<len;i++){
        var t = prn[i];
        if(operators.indexOf(t)==-1){
            //当前非运算符，则存入，否则弹出两个数字做运算并存入
            numsStack.push(String(t));
            //console.log(t);
        }else{
            var a = numsStack.pop()||0,
                b = numsStack.pop()||0;
                var temp = getOperLevel(t);
                a = (getOperLevel(a) >= temp) ? ('('+ a +')') : a;
                b = (getOperLevel(b) > temp) ? ('('+ b +')') : b;
                //console.log(b);
            switch(t){
                case "+":
                    numsStack.push(b+ '+' +a);
                    break;
                case "-":
                    numsStack.push(b+ '-' +a);
                    break;
                case "*":
                    numsStack.push(b+ '*' +a);
                    break;
                case "/":
                    numsStack.push(b+ '/' +a);
                    break;
            }
            //resultHTML += ('='+  +'<br>');
            //console.log(numsStack);
        }
    }

    var result = numsStack.pop();
    return result;
}

function getOperLevel(str,oper){
    var level = 0;
    //运算符等级
    var operLevel = {
        '(': 1,
        ')': 1,
        '{': 1,
        '}': 1,
        '[': 1,
        ']': 1,
        '*': 4,
        '/': 4,
        '%': 5,
        '+': 6,
        '-': 6,
        //'&&': 12,
        //'||': 13,
        '=': 15,
        '#': 20
    };

    if(str.length == 1){
        level = operLevel[str];
        return !oper ? level : (level > operLevel[oper]) ? true : false;
    }
    var opers = str.replace(/\s|\d|\(.+\)/g,'').split('');

    for(var i=0,len = opers.length;i<len;i++){
        var temp = operLevel[opers[i]]
        if(level < temp){
            level = temp;
        }
    }
    if(oper){
        return (level > operLevel[oper]) ? true : false;
    }else{
        return level;
    }
}

var aaa = '(12*2-(5+1))/2*3+(11-2*3)';
var aaa = turnRPN(aaa)
console.log(prnToEq(aaa));

