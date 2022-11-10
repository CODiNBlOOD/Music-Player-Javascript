const music = new Audio("faded.mp3");

// create array

const song = [
    {
        id: "1",
        songName: `On My Way <br>
    <div class="subtitle text-muted ">Alan Walker</div>`,
        Poster: "/Images/1.jpeg",
    },
    {
        id: "2",
        songName: `Alen-Faded<br>
    <div class="subtitle text-muted ">Alan Walker </div>`,
        Poster: "/Images/2.jpeg",
    },

    {
        id: "3",
        songName: `Daniel-Cartoon<br>
    <div class="subtitle text-muted ">FT . Daniel Levi</div>`,
        Poster: "/Images/3.jpeg",
    },
    {
        id: "4",
        songName: `Dance Monkey<br>
    <div class="subtitle text-muted ">Tones & i</div>`,
        Poster: "/Images/4.jpeg",
    },
    {
        id: "5",
        songName: `Serena-Safari<br>
    <div class="subtitle text-muted ">SERENA</div>`,
        Poster: "/Images/5.jpeg",
    },
    {
        id: "6",
        songName: `Ed-Perfect<br>
    <div class="subtitle text-muted ">ED Sheeran</div>`,
        Poster: "/Images/6.jpeg",
    },
    {
        id: "7",
        songName: `Jitni Dafa<br>
    <div class="subtitle text-muted ">Yasser Desai</div>`,
        Poster: "/Images/7.jpeg",
    },
    {
        id: "8",
        songName: `Tera Hua<br>
    <div class="subtitle text-muted ">Atif Aslam</div>`,
        Poster: "/Images/8.jpeg",
    },
    {
        id: "9",
        songName: `Tumko Chahunga <br>
    <div class="subtitle text-muted ">Arijit Singh</div>`,
        Poster: "/Images/9.jpeg",
    },
    {
        id: "10",
        songName: `Thodi Jagah<br>
    <div class="subtitle text-muted ">Arijit Singh</div>`,
        Poster: "/Images/10.jpeg",
    },
    {
        id: "11",
        songName: `Kaun Tujhea<br>
    <div class="subtitle text-muted ">Amaal Mallik Palak</div>`,
        Poster: "/Images/11.jpeg",
    },
    {
        id: "12",
        songName: `Baarish Ban Jana<br>
    <div class="subtitle text-muted ">Hina Khan, Shaheer Sheikh</div>`,
        Poster: "/Images/12.jpeg",
    },
    {
        id: "13",
        songName: `Raataan Lambiyan<br>
    <div class="subtitle text-muted "> Tanishk B| Jubin Nautiyal</div>`,
        Poster: "/Images/13.jpeg",
    }


];

Array.from(document.getElementsByClassName("songItem")).forEach(
    (element, i) => {
        element.getElementsByTagName("img")[0].src = song[i].Poster;
        element.getElementsByTagName("h5")[0].innerHTML = song[i].songName;
    }
);

let masterplay = document.getElementById("masterplay");
let wave = document.getElementsByClassName("wave")[0];

masterplay.addEventListener("click", () => {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        masterplay.classList.remove("bi-play-fill");
        masterplay.classList.add("bi-pause-fill");
        wave.classList.add("active2");
    } else {
        music.pause();
        masterplay.classList.add("bi-play-fill");
        masterplay.classList.remove("bi-pause-fill");
        wave.classList.remove("active2");
    }
});

// Action for all 

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("playlistplaybtn")).forEach(
        (element) => {
            element.classList.add("bi-play-circle-fill");
            element.classList.remove("bi-pause-circle-fill");
        }
    );
};

const makeAllBackground = () => {
    Array.from(document.getElementsByClassName("songItem")).forEach(
        (element) => {
            element.style.background = "rgb(105,105,170,.0)";
        }
    );
};


// action  single element 
let index = 0;
let Poster_for_masterplay = document.getElementById('Poster_for_masterplay');
let title = document.getElementById('master-play-title');

Array.from(document.getElementsByClassName("playlistplaybtn")).forEach(
    (element) => {
        element.addEventListener("click", (e) => {
            index = e.target.id;
            makeAllPlays();
            e.target.classList.remove("bi-play-circle-fill");
            e.target.classList.add("bi-pause-circle-fill");
            music.src = `audio/${index}.mp3`;
            Poster_for_masterplay.src = `Images/${index}.jpeg`;
            music.play();

            let song_title = song.filter((ele) => {
                return ele.id == index;
            })
            song_title.forEach(ele => {
                let { songName } = ele;
                title.innerHTML = songName;
            })
            masterplay.classList.remove("bi-play-fill");
            masterplay.classList.add("bi-pause-fill");
            wave.classList.add("active2");

            music.addEventListener('ended', () => {
                masterplay.classList.add("bi-play-fill");
                masterplay.classList.remove("bi-pause-fill");
                wave.classList.remove("active2");
            })
            makeAllBackground();
            Array.from(document.getElementsByClassName("songItem"))[`${index - 1}`].style.background = "rgb(105,105,170,.1)";
        });
    }
);


let currentStart = document.getElementById('currentStart');

let currentEnd = document.getElementById('currentEnd');

let seek = document.getElementById('seek');

let bar2 = document.getElementById('bar2');

let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate', () => {
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur / 60);
    let sec = Math.floor(music_dur % 60);

    if (sec < 10) {
        sec = `0${sec}`;
    }
    currentEnd.innerText = `${min}:${sec}`;

    let min1 = Math.floor(music_curr / 60);
    let sec1 = Math.floor(music_curr % 60);
    if (sec1 < 10) {
        sec1 = `0${sec1}`
    }

    currentStart.innerText = `${min1}:${sec1}`;


    let progressBar = parseInt((music.currentTime/music.duration)*100);
    seek.value=progressBar;
    let seekBar=seek.value;
    bar2.style.width=`${seekBar}%`
    dot.style.left=`${seekBar}%`; 


})

seek.addEventListener('change',()=>{
    music.currentTime=seek.value*music.duration/100;
})

music.addEventListener('ended',()=>{
    masterplay.classList.add("bi-play-fill");
    masterplay.classList.remove("bi-pause-fill");
    wave.classList.remove("active2");
})



let vol_icon = document.getElementById('vol_icon');

let vol = document.getElementById('vol');

let vol_bar = document.getElementsByClassName('vol_bar')[0];

let vol_dot = document.getElementById('vol_dot');


vol.addEventListener('change', ()=>{
if (vol.value == 0){
    vol_icon.classList.remove('bi-volume-down-fill');
    vol_icon.classList.add('bi-volume-mute-fill');
    vol_icon.classList.remove('bi-volume-up-fill');

}
if (vol.value > 0){
    vol_icon.classList.add('bi-volume-down-fill');
    vol_icon.classList.remove('bi-volume-mute-fill');
    vol_icon.classList.remove('bi-volume-up-fill');

}
if (vol.value > 50){
    vol_icon.classList.remove('bi-volume-down-fill');
    vol_icon.classList.remove('bi-volume-mute-fill');
    vol_icon.classList.add('bi-volume-up-fill');

}

let vol_a = vol.value;
vol_bar.style.width = `${vol_a}%`
vol_dot.style.left = `${vol_a}%`
music.volume=vol_a/100;
})



let pre = document.getElementById('pre');
let next = document.getElementById('next');

pre.addEventListener('click',()=>{
    index-=1;
    if(index<1){
        index=Array.from(document.getElementsByClassName('songItem')).length;

    }
    music.src = `audio/${index}.mp3`;
    Poster_for_masterplay.src = `Images/${index}.jpeg`;
    music.play();

    let song_title = song.filter((ele) => {
        return ele.id == index;
    })
    song_title.forEach(ele => {
        let { songName } = ele;
        title.innerHTML = songName;
    })
    makeAllPlays();

    document.getElementById(`${index}`).classList.remove("bi-play-fill");
    document.getElementById(`${index}`).classList.add("bi-pause-fill");
    makeAllBackground();
    Array.from(document.getElementsByClassName("songItem"))[`${index - 1}`].style.background = "rgb(105,105,170,.1)";
})



next.addEventListener('click',()=>{
    index-=0;
    index+=1;
    if(index > Array.from(document.getElementsByClassName('songItem')).length){
        index=1;

    }
    music.src = `audio/${index}.mp3`;
    Poster_for_masterplay.src = `Images/${index}.jpeg`;
    music.play();

    let song_title = song.filter((ele) => {
        return ele.id == index;
    })
    song_title.forEach(ele => {
        let { songName } = ele;
        title.innerHTML = songName;
    })
    makeAllPlays();

    document.getElementById(`${index}`).classList.remove("bi-play-fill");
    document.getElementById(`${index}`).classList.add("bi-pause-fill");
    makeAllBackground();
    Array.from(document.getElementsByClassName("songItem"))[`${index - 1}`].style.background = "rgb(105,105,170,.1)";
})

let left_scroll=document.getElementById('left-scroll');
let right_scroll=document.getElementById('right-scroll');

let pop_song =document.getElementsByClassName('pop_song')[0];

left_scroll.addEventListener('click',()=>{
    pop_song.scrollLeft-=330;
})

right_scroll.addEventListener('click',()=>{
    pop_song.scrollLeft+=330;
})


let left_scrolls=document.getElementById('left-scrolls');
let right_scrolls=document.getElementById('right-scrolls');

let item =document.getElementsByClassName('item')[0];

left_scrolls.addEventListener('click',()=>{
    item.scrollLeft-=330;
})

right_scrolls.addEventListener('click',()=>{
    item.scrollLeft+=330;
})
