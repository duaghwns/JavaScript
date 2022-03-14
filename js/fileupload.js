const box = document.querySelector('.box');
const file = document.querySelector(`#file`)
const files = file.files;

console.log(files)

handleChangeFile = e => {
    e.preventDefault();
    console.log(e)
}