const btns = document.querySelectorAll('button');
const num = document.querySelectorAll('.num');
const actions = document.querySelectorAll('.action');
const spot = document.querySelector('.spot');
const result = document.querySelector('.result');
const input = document.querySelector('#inputbox');

let beforeVal="";
let afterVal="";
let sign;
let rst;
let isInnerSign = true;
let isInnerSpot = false;

const resetBtn = () => {
    beforeVal = "";
    afterVal = "";
    isInnerSign = true;
    isInnerSpot = false;
    rst = 0;
    input.value = rst;
    console.log(`reset`)
}

const $before = e => {
    if(input.value.includes('.') && e.target.innerHTML=='.'){
        return;
    }
    beforeVal += e.target.innerHTML;
    input.value = beforeVal;
    console.log(`before : ${beforeVal}`);
}

const $after = e => {
    if(input.value.includes('.') && e.target.innerHTML=='.'){
        return;
    }
    afterVal += e.target.innerHTML;
    input.value = afterVal;
    console.log(`after : ${afterVal}`);
}

num.forEach(item => {
    item.addEventListener('click', e =>{
        if(isInnerSign){
            if((input.value.charAt(0)==0||input.value.charAt(0)=='.') && e.target.innerHTML==0){
                e.preventDefault();
            } else {
                $before(e);
            }
        } else {
            $after(e);
        }
    });
});

actions.forEach(action =>{
    action.addEventListener('click', e =>{
        if(sign!=null){
            resultValue();        
        }

        switch(e.target.innerHTML){
            case 'AC': resetBtn(); return;
            case 'X': sign = '*'; break;
            case '/': sign = '/'; break;
            case '+': sign = '+'; break;
            case '-': sign = '-'; break;
            default: sign;
        }
        isInnerSign = false;
    });
});

const resultValue = () => {
    switch(sign){
        case 'AC': resetBtn(); return ;
        case '*': rst = parseFloat(beforeVal) * parseFloat(afterVal); break;
        case '/': rst = parseFloat(beforeVal) / parseFloat(afterVal); break;
        case '+': rst = parseFloat(beforeVal) + parseFloat(afterVal); break;
        case '-': rst = parseFloat(beforeVal) - parseFloat(afterVal); break;
    }
    beforeVal = parseFloat(rst);
    afterVal = "";
    sign = null;
    spotCnt = 0;
    isInnerSign = true;
    isInnerSpot = false;
    input.value = rst;
    console.log(`result : ${rst}`)
}

result.addEventListener('click', resultValue);