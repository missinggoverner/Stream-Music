import { contentBox } from "./app.js";

// diplaying pages 

let currentPage = 0;
const itemsPerPage = 10;
let collection = {
    currentPage: currentPage,
    itemsPerPage: itemsPerPage
}


let currentTrack = null;
let audio = null;

const displayTrendy = () => {

    let start = collection.currentPage * itemsPerPage;
    let end = start + itemsPerPage;
    let allData = JSON.parse(localStorage.getItem('wholeData'));
    let dataArray = Object.values(allData);
    let pageData = dataArray[0].slice(start, end);

    console.log(pageData)
    pageData.forEach(item => {

        let eachContainer = document.createElement('div');
        eachContainer.className = 'each-contanier';
        contentBox.appendChild(eachContainer);

        let image = document.createElement('img');
        image.src = item.user.cover_photo?.["640x"] || "../utils/yellow-black-grunge-background-1.jpg";
        image.className = 'image-style';
        eachContainer.appendChild(image)

        let playBtn = document.createElement('button');
        playBtn.className = 'play-btn';
        let icon = document.createElement('i');
        icon.className = "fa-solid fa-play"
        playBtn.appendChild(icon);
        eachContainer.appendChild(playBtn);


        eachContainer.addEventListener('mouseover', () => {
            playBtn.style.visibility = 'visible';
        })

        eachContainer.addEventListener('mouseleave', () => {
            playBtn.style.visibility = 'hidden';
        })
        
        
        let isPlaying = false;
        let id = item.id;

        playBtn.addEventListener('click', async () => {
            const playing = async () => {
                try {
                    if (currentTrack === null || currentTrack === id) {
                        if (!audio) {
                            let streamUrl = `https://discoveryprovider.audius.co/v1/tracks/${id}/stream?&app_name=my_music_app`;
                            audio = new Audio(streamUrl);
                            currentTrack = id;
                        }

                        if (isPlaying === false) {
                            audio.play();
                            icon.className = "fa-solid fa-pause";
                            isPlaying = true;
                        } else {
                            audio.pause();
                            icon.className = "fa-solid fa-play";
                            isPlaying = false;
                        }
                    }
                    else {
                        currentTrack = null;
                        audio.currentTime = 0;
                        audio.pause();
                        audio = null;
                        document.querySelectorAll('.play-btn i').forEach(i => i.className = "fa-solid fa-play");
                        isPlaying = false;
                        playing();
                    }

                } catch (error) {
                    console("connection error")
                }
            }
            playing();
        })
    });


    collection.currentPage++;
}


export { displayTrendy, collection };