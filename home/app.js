import { displayTrendy } from "./utils.js";
console.log("conected")

const entrance = document.querySelector('.fa-bars');
const tredning = document.querySelector('.fa-fire');

entrance.addEventListener('click', ()=>{
    tredning.style.display = 'flex';
    tredning.classList.add('entrance');

})

tredning.addEventListener('click', ()=>{
    const getData = async () => {
        try {
            let res = await fetch('https://discoveryprovider.audius.co/v1/tracks/trending?app_name=my_music_app');
            if(res.ok){
                let data = await res.json();
                displayTrendy(data); 
            }
            if(!res.ok){
                console.log('erroe', res)
            }
        } 
        catch(error){
            console.error('Error', error);
        }
    }
getData();
})