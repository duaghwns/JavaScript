const autoButton = document.querySelector('#lotto');
const numBox = document.querySelectorAll('.lotto');
const numbers = document.querySelectorAll('.numbers');
const choiceNum = document.querySelectorAll('.choiceNum');


const makeNumbers = () => {
    let array = new Array();
    for(let i = 0; i < 6; i++) {
        array[i] = Math.ceil(Math.random()*45);
        for(let j = 0; j < i; j++) {
            if(i>=0 && array[i]==array[j]){
                i--;
            }
        }
    }
    return array.sort((a,b)=>{return a - b});
};

const excute = () => {
    const array = makeNumbers();
    numBox.forEach((i,j)=>{
        i.innerHTML = array[j];
    });
}


numbers.forEach(num => {
    let cnt = 0;
    num.addEventListener('click',()=>{
        num.classList.add('active');
        choiceNum[cnt].value = num.innerHTML;
        console.log(num.innerHTML)
        console.log(choiceNum[cnt])
        const active = document.querySelector('.active');
        active.addEventListener('click',()=>{
            active.classList.remove('active');
        });
    });
})
autoButton.addEventListener('click',excute);

