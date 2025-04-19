import { displayTrendy, collection, searchResult, whichEven, pages } from "./utils.js";

const loader = document.querySelector('.loader');
const title = document.querySelector('.title-container');
const contentBox = document.querySelector('.content-box')
// const wide = document.querySelector('.placeholder')

// Adding Even Listening to ranges
const week = document.querySelector('.week');
const month = document.querySelector('.month');
const year = document.querySelector('.year');

let ranges = [week, month, year];

ranges.forEach(range => {

    range.addEventListener('click', () => {
        loader.style.visibility = 'visible';
        let period = range.innerHTML;
        window.scrollTo({ top: 0, behavior: "smooth" });
        localStorage.removeItem('wholeData')
        contentBox.innerHTML = '';
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

                loader.style.visibility = 'hidden';
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

// searching 
const search = document.querySelector('.search-input')
let values = { value: null};
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.activeElement === search) {
        values.value = search.value;
        if (values.value != '') {
            contentBox.innerHTML = '';
            pages.page = 0;
            searchResult();
        } else {
            search.placeholder = "Input something first";
            setTimeout(() => {
                search.placeholder = "What do you want to listen too?";
            }, 2000)
        }
    }
})

// loading more data while scrolling for trendy songs

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        if (whichEven === 1) {
            let allData = JSON.parse(localStorage.getItem('wholeData'))
            let arrayAllData = Object.values(allData)

            if (collection.currentPage * collection.itemsPerPage < arrayAllData[0].length && collection.currentPage != 0) {
                displayTrendy();
            }
        } else if (whichEven === 2) {
            values.value = search.value;
            searchResult();
        }

    }
});


export { contentBox, values, loader, title }