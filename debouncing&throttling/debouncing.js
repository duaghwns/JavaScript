const $input = document.querySelector('#debounce')
const $msg = document.querySelector('.msg')

const debounce = (callback, delay) => {
    let timer;
    // debounce 함수는 timer를 기억하는 클로저를 반환한다.
    return event => {
        if(timer) clearTimeout(timer);
        timer = setTimeout(callback, delay, event);
    };
}

$input.oninput = debounce(e =>{
    $msg.textContent = e.target.value;
    console.log($msg); // console.log가 한번만 찍히는 것을 확인할 수 있다.
},300);