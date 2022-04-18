const container = document.querySelector('.container');
const box = document.querySelector('.box');

const {width: containerWidth, height: containerHeight} = box.getBoundingClientRect();
const {width: boxWidth, height: boxHeight} = box.getBoundingClientRect();

let isDragging = null;
let originX = null;
let originY = null;
let originLeft = null;
let originTop = null;

box.addEventListener('mousedown', e =>{
    isDragging = true;
    originX = e.clientX;
    originY = e.clientY;
    originLeft = box.offsetLeft;
    originTop = box.offsetTop;
    console.log(`mouse pointer
    originX : ${originX}
    originY : ${originY}
    originLeft : ${originLeft}
    originTop : ${originTop}`)
})

document.addEventListener('mousemove', e =>{
    if(isDragging){
        const diffX = e.clientX - originX;
        const diffY = e.clientY - originY;

        box.style.left = originLeft + diffX + 'px';
        box.style.top = originTop + diffY + 'px';
    }
});

document.addEventListener('mouseup', e =>{
    isDragging = false;
})