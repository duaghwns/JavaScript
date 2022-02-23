const $scrollHere = document.querySelector('.scrollHere');
const $normal = document.querySelector('#normal');
const $throttled = document.querySelector('#throttling');

console.log($scrollHere)

const throttle = (callback, delay) => {
    let timer;
    return event => {
        if(timer) return;
        timer = setTimeout(() =>{
            callback(event);
            timer = null;
        }, delay, event);
    }
}

let Count = { normalCount:0, throttlingCount:0};

$scrollHere.addEventListener('scroll', ()=>{
    console.log(123)
    $normal.textContent = ++Count.normalCount;
});

$scrollHere.addEventListener('scroll', throttle(()=>{
    console.log(123)
    $throttled.textContent = ++Count.throttlingCount;
},100));