const entrance = document.querySelector('.fa-bars');
const tredning = document.querySelector('.fa-fire');

entrance.addEventListener('click', ()=>{
    tredning.style.display = 'flex';
    tredning.classList.add('entrance');

})