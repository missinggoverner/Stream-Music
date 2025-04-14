import { contentBox } from "./app.js";

// diplaying pages 
let currentPage = 0;
const itemsPerPage = 10;

const displayTrendy = () => {

    let start = currentPage * itemsPerPage;
    let end = start + itemsPerPage;
    let allData = JSON.parse(localStorage.getItem('wholeData'));
    let dataArray = Object.values(allData);
    let pageData = dataArray[0].slice(start, end);

    pageData.forEach(item => {
    console.log(currentPage)
    });

    currentPage++;
}


export { displayTrendy, currentPage, itemsPerPage };