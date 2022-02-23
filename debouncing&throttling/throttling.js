const $scrollHere = document.querySelector('.scrollHere');
const $normal = document.querySelector('#normal');
const $throttled = document.querySelector('#throttling');

console.log($scrollHere)
console.log($normal)
console.log($throttled)

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

let Count = { normalCount:0, throttlingCount:0};

$scrollHere.addEventListener('scroll', ()=>{
    $normal.textContent = ++Count.normalCount;
});

const colr = ['red','yellow','green','blue','blueviolet'];
let cnt = 0;
$scrollHere.addEventListener('scroll', throttle(()=>{
    $throttled.textContent = ++Count.throttlingCount;
    
    if(Count.throttlingCount % 2==0){
        $scrollHere.style.backgroundColor = colr[cnt++];
        if(cnt==5) cnt = 0;
    }
},100));