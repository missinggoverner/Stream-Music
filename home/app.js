import { displayTrendy, collection} from "./utils.js";


const search = document.querySelector('.search')
const loader = document.querySelector('.loader');
const title = document.querySelector('.title-container');
const perviousBtn = document.querySelector('.pre-btn');
const nextBtn = document.querySelector('.next-btn');
const contentBox = document.querySelector('.content-box')

// Adding Even Listening to ranges
const week = document.querySelector('.week');
const month = document.querySelector('.month');
const year = document.querySelector('.year');

let ranges = [week, month, year];

ranges.forEach(range => {

    range.addEventListener('click', () => {
        loader.style.display = 'flex';
        let period = range.innerHTML;
        window.scrollTo({ top: 0, behavior: "smooth" });
        contentBox.innerHTML = ' ';
        localStorage.removeItem('wholeData')
        collection.currentPage = 0;
        const getData = async () => {
            try {
                let res = await fetch(`https://discoveryprovider.audius.co/v1/tracks/trending?time=${period}&app_name=my_music_app`);
                if (res.ok) {
                    let wholeData = await res.json();
                    localStorage.setItem('wholeData', JSON.stringify(wholeData))

                    displayTrendy();
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


// loading more data while scrolling 

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight) {

        let allData = JSON.parse(localStorage.getItem('wholeData'))
        let arrayAllData = Object.values(allData)

        if (collection.currentPage * collection.itemsPerPage < arrayAllData[0].length && collection.currentPage != 0) {
            displayTrendy();
        }
    }
});
// searching 

document.addEventListener('keydown' ,(e) => {
    if(e.key === 'Enter'){
        // something
    }
})
export { contentBox }