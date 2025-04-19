import { contentBox, values, loader, title } from "./app.js";

let whichEven = 0; // 1 being for diplaying trendy tracks & 2 being for searched tracks


// playing track logic and tracks css 

let currentTrack = null;
let audio = null;
let diplay = (item) => {

    let eachContainer = document.createElement('div');
    eachContainer.className = 'each-contanier';
    contentBox.appendChild(eachContainer);

    let image = document.createElement('img');
    image.src = item.user.cover_photo?.["640x"] || "../utils/Capture d’écran 2024-04-09 à 11.33.56.png";
    image.className = 'image-style';
    eachContainer.appendChild(image)

    let playBtn = document.createElement('button');
    playBtn.className = 'play-btn';
    let icon = document.createElement('i');
    icon.className = "fa-solid fa-play"
    playBtn.appendChild(icon);
    eachContainer.appendChild(playBtn);

    let factContainer = document.createElement('div');
    factContainer.classList = 'fact-container';
    eachContainer.appendChild(factContainer)

    let title = document.createElement('div');
    title.className = 'song-name';
    title.textContent = item.title;
    factContainer.appendChild(title)

    let handler = document.createElement('div');
    handler.className = 'handler';
    handler.textContent = item.user.handle;
    factContainer.appendChild(handler)

    let description = document.createElement('div');
    description.className = 'description';
    description.textContent = item.description ? item.description : "No description";
    factContainer.appendChild(description)


    let likesCount = document.createElement('div');
    likesCount.className = 'like-count';
    factContainer.appendChild(likesCount);

    let likeIcon = document.createElement('i');
    likeIcon.className = "fa-solid fa-heart"
    likesCount.appendChild(likeIcon);

    let likes = document.createElement('div')
    likes.className = 'likes'
    likes.innerHTML = item.favorite_count;
    likesCount.append(likes)



    eachContainer.addEventListener('mouseover', () => {
        playBtn.style.visibility = 'visible';
    })

    eachContainer.addEventListener('mouseleave', () => {
        playBtn.style.visibility = 'hidden';
    })

    // playing tracks logic
    let isPlaying = false;
    let id = item.id;
    playBtn.addEventListener('click', () => {
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

}

// diplaying trendy 

let collection = { // used to keep track of pages
    currentPage: 0,
    itemsPerPage: 10
}

const displayTrendy = () => {
    if (whichEven != 1) {
        whichEven = 1;
        contentBox.innerHTML = '';
    }
    let start = collection.currentPage * collection.itemsPerPage;
    let end = start + collection.itemsPerPage;
    let allData = JSON.parse(localStorage.getItem('wholeData'));
    let dataArray = Object.values(allData);
    let pageData = dataArray[0].slice(start, end);

    console.log(pageData)
    pageData.forEach(item => {
        diplay(item);
    });

    collection.currentPage++;
}


// diplay search result
let pages = { page: 0 }
let limit = 5;
let offSet = 5 * pages.page;
let currentSearch = null;
let isFetching = false
const searchResult = async () => {
    if(isFetching) {
        return
    }
    isFetching = true;
    try {
        loader.style.visibility = 'visible';
        if (currentSearch === null) {
            currentSearch = values.value;
        } else if (currentSearch != values.value) {
            currentSearch = values.value;
            pages.page = 0;
            offSet = 5 * pages.page;
        } else if (currentSearch === values.value) {
            pages.page++;
            offSet = pages.page * 5;
        }
        let res = await fetch(`https://discoveryprovider.audius.co/v1/tracks/search?query=${currentSearch}&limit=${limit}&offset=${offSet}&app_name=my_music_app`)
        if (res.ok) {
            let data = await res.json();
            if (data.data.length === 0) {
                console.log("Nothing was found")
            } else {
                console.log(data);
                if (whichEven != 2) {
                    whichEven = 2;
                    collection.currentPage = 0;
                    contentBox.innerHTML = '';
                }
                data.data.forEach(item => {
                    diplay(item);
                })

            }
        }


        if (!res.ok) {
            console.log("400: Bad request")
        }
    } catch (error) {
        console.log("Error: Bad Internate connection", error)
    } finally {
        isFetching = false;
        loader.style.visibility = 'hidden';
        title.innerHTML = "searched for: " + currentSearch;

    }
}

export { displayTrendy, collection, searchResult, whichEven, pages };