import { displayTrendy } from "./utils.js";


const search = document.querySelector('.search')
const loader = document.querySelector('.loader');
const title = document.querySelector('.title-container');
const perviousBtn = document.querySelector('.pre-btn');
const nextBtn = document.querySelector('.next-btn');

// Adding Even Listening to ranges
const week = document.querySelector('.week');
const month = document.querySelector('.month');
const year = document.querySelector('.year');

let ranges = [week, month, year];

ranges.forEach(range => {

    range.addEventListener('click', () => {
        loader.style.display = 'flex';
        let period = range.innerHTML;
        const getData = async () => {
            try {
                let res = await fetch(`https://discoveryprovider.audius.co/v1/tracks/trending?time=${period}&app_name=my_music_app`);
                if (res.ok) {
                    let data = await res.json();
                    displayTrendy(data);
                }
                if (!res.ok) {
                    console.log('erroe', res)
                }
            }
            catch (error) {
                console.error('Error', error);
            }
            finally {
                loader.style.display = 'none';
                window.scrollTo({ top: 0, behavior: "smooth" });
                title.innerHTML = `${period}'s 100 tending`;
                // nextBtn.style.display = 'flex';
                // perviousBtn.style.display = 'flex';

            }
        }
        getData();

    })
});


// adding a border when scroling to the windows 

let header = document.querySelector('.headers');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        header.classList.add('scroll');
    } else {
        header.classList.remove('scroll');
    }
})

export {};