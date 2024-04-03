const $scrollHere = document.querySelector('.scrollHere');
const $normal = document.querySelector('#normal');
const $throttled = document.querySelector('#throttling');

const throttle = (callback, delay) => {
    let timer;
    return event => {
        if(timer) return;
        timer = setTimeout(() =>{
            callback(event);
            timer = null;
        }, delay, event);
    };
};

const count = { normal:0, throttling:0};

$scrollHere.addEventListener('scroll', ()=>{
    $normal.textContent = ++count.normal;
});

const colr = ['red','yellow','green','blue','blueviolet'];
let cnt = 0;
$scrollHere.addEventListener('scroll', throttle(()=>{
    $throttled.textContent = ++count.throttling;
    
    if(Count.throttlingCount % 2==0){
        $scrollHere.style.backgroundColor = colr[cnt++];
        if(cnt==5) cnt = 0;
    }
},100));