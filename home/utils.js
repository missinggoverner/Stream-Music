import { contentBox } from "./app.js";

// diplaying pages 

let currentPage = 0;
const itemsPerPage = 10;
let collection = {
    currentPage: currentPage,
    itemsPerPage: itemsPerPage
}
const displayTrendy = () => {

    let start = collection.currentPage * itemsPerPage;
    let end = start + itemsPerPage;
    let allData = JSON.parse(localStorage.getItem('wholeData'));
    let dataArray = Object.values(allData);
    let pageData = dataArray[0].slice(start, end);

    console.log(pageData)
    pageData.forEach(item => {
        let image = document.createElement('img');
        
        image.src = item.user.cover_photo?.["640x"] || "../utils/yellow-black-grunge-background-1.jpg";
        image.className = 'image-style';

        contentBox.appendChild(image)
    });

    collection.currentPage++;
}


export { displayTrendy, collection };