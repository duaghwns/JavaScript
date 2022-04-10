const autoButton = document.querySelector('#lotto');
const initialization = document.querySelector('#initialization');
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
        
        const active = document.querySelectorAll('.active');
        active.forEach( act =>{
            act.addEventListener('click',()=>{
                act.classList.remove('active');
            });
        });
    });
});




autoButton.addEventListener('click',excute);
initialization.addEventListener('click',()=>{
    numBox.forEach((i,j)=>{
        i.innerHTML = null;
    });
});
