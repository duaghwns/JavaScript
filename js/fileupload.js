const box = document.querySelector('.box');
const file = document.querySelector(`#file`)
const files = file.files;
const handleChangeFile = e => {
    e.preventDefault();
    console.log(e)
    file.click();
    console.log(file.files)
}

const span = document.querySelector('.box > span');
console.log(span)

box.addEventListener('click', handleChangeFile);

