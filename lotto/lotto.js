const autoButton = document.querySelector('#lotto');
const numBox = document.querySelectorAll('.lotto');

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
    numBox.forEach((i,j,k,n)=>{
        i.innerHTML = array[j];
    });
}

autoButton.addEventListener('click',excute);