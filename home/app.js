 import { displayTrendy } from "./utils.js";


const entrance = document.querySelector('.fa-bars');
const tredning = document.querySelector('.fa-fire');
const search = document.querySelector('.search')
const trendContainer = document.querySelector('.trend');
const loader = document.querySelector('.loader');
const range = document.querySelector('#range');
const perviousBtn = document.querySelector('.pre-btn');
const nextBtn = document.querySelector('.next-btn');

let period = range.value;
// Adds the animation and dipalys trends and search
entrance.addEventListener('click', ()=>{
    trendContainer.style.display = 'flex'
    search.style.display = 'flex';
    search.classList.add('entrance')
    trendContainer.classList.add('entrance');

})


tredning.addEventListener('click', ()=>{
    loader.style.display = 'flex';
    const getData = async () => {
        try {
            let res = await fetch(`https://discoveryprovider.audius.co/v1/tracks/trending?time_range=${period}&app_name=my_music_app`);
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
        finally{
            loader.style.display = 'none';
        }
    }
getData();
})