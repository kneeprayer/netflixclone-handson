import "./styles.css";
const app = document.getElementById("app");
var alarmcount = 1;
app.innerHTML =
  `
  <header class="js-header">
    <div class="inner">
      <div class="js-header__logo" alt="netflix">
        <svg viewBox="0 0 111 30" id="netflix-logo" width="100%" height="100%">
          <path d="M105.062 14.28L111 30c-1.75-.25-3.499-.563-5.28-.845l-3.345-8.686-3.437 7.969c-1.687-.282-3.344-.376-5.031-.595l6.031-13.75L94.468 0h5.063l3.062 7.874L105.875 0h5.124l-5.937 14.28zM90.47 0h-4.594v27.25c1.5.094 3.062.156 4.594.343V0zm-8.563 26.937c-4.187-.281-8.375-.53-12.656-.625V0h4.687v21.875c2.688.062 5.375.28 7.969.405v4.657zM64.25 10.657v4.687h-6.406V26H53.22V0h13.125v4.687h-8.5v5.97h6.406zm-18.906-5.97V26.25c-1.563 0-3.156 0-4.688.062V4.687h-4.844V0h14.406v4.687h-4.874zM30.75 15.593c-2.062 0-4.5 0-6.25.095v6.968c2.75-.188 5.5-.406 8.281-.5v4.5l-12.968 1.032V0H32.78v4.687H24.5V11c1.813 0 4.594-.094 6.25-.094v4.688zM4.78 12.968v16.375C3.094 29.531 1.593 29.75 0 30V0h4.469l6.093 17.032V0h4.688v28.062c-1.656.282-3.344.376-5.125.625L4.78 12.968z"></path>
        </svg>
      </div>
      <div class="js-header__menus">
        <ul class="js-header__menus-list">
          <li class="js-header__menus-item">Home</li>
          <li class="js-header__menus-item">TV Shows</li>
          <li class="js-header__menus-item">Movies</li>
          <li class="js-header__menus-item">Originals</li>
          <li class="js-header__menus-item">Recently Added</li>
          <li class="js-header__menus-item">My List</li>
        </ul>
      </div>
      <div class="js-header__others">
        <div class="js-header__others-search">
          <form class="js-search-form">
            <i class="fa fa-times js-header__others-closesearch"></i>
            <input class="js-search open" type="text" placeholder="Title, peple, genres" />
          </form>
          <i class="fas fa-search js-header__others-opensearch"></i>
        </div>
        <div class="js-header__others-kids">
          <span>kids</span>
        </div>
        <div class="js-header__others-alarm">
          <i class="fas fa-bell">
            <div class="js-header__others-alarm-number">` +
  alarmcount +
  `
            </div>
          </i>
        </div>
        <div class="js-header__ohters-profile">
          <img class="js-header__ohters-myprofile" src="https://avatars1.githubusercontent.com/u/13897753?s=40&amp;v=4"/>
          <i class="fas fa-sort-down"></i>
        </div>
      </div>
    </div>
  </header>
  <div class="video">
    <video id="homevideo" class="js-video" src="https://ia800602.us.archive.org/4/items/mov-bbb/mov_bbb.mp4">
    </video>
  </div>
  <button class="js-muteBtn">Mute</button>
  <button class="js-playBtn">Play</button>
  <input class="js-volumeRange" type="range" min="0" max="1" step="0.1">

  <div class="movie-info">
    <div class="movie-info__box">1</div>
    <div class="movie-info__box">2</div>
    <div class="movie-info__box">3</div>
    <div class="movie-info__box">4</div>
    <div class="movie-info__box">5</div>
  </div>
`;

const header = document.querySelector(".js-header"),
  video = document.getElementById("homevideo"),
  muteBtn = document.querySelector(".js-muteBtn"),
  playBtn = document.querySelector(".js-playBtn"),
  volumeRange = document.querySelector(".js-volumeRange"),
  search = document.querySelector(".js-search-form"),
  opensearch = document.querySelector(".js-header__others-opensearch"),
  closesearch = document.querySelector(".js-header__others-closesearch"),
  alarm = document.querySelector(".js-header__others-alarm"),
  alarmnumber = document.querySelector(".js-header__others-alarm-number"),
  boxes = document.querySelectorAll(".movie-info__box"),
  boxArray = Array.from(boxes);

const loadSettings = () => {
  const loadMute = localStorage.getItem("muted");
  volumeRange.value = video.volume;
  // Returned loadMute is not a boolean, it is a string!!
  if (loadMute === "true") {
    video.muted = true;
    volumeRange.value = 0;
    muteBtn.innerHTML = "Unmute";
  } else {
    video.muted = false;
    muteBtn.innerHTML = "mute";
  }
  video.play();
  video.onplay = () => {
    playBtn.innerHTML = "Pause";
  };
  search.style.display = "none";
  opensearch.style.display = "inherit";
};

video.onended = () => {
  playBtn.innerHTML = "Play";
};

const handleScroll = event => {
  const scrollHeight = window.scrollY;
  console.log(scrollHeight);
  if (scrollHeight > 20) {
    header.classList.add("black");
  } else {
    header.classList.remove("black");
  }

  if (scrollHeight > 300) {
    video.pause();
    playBtn.innerHTML = "Play";
  } else {
    video.play();
    video.onplay = () => {
      playBtn.innerHTML = "Pause";
    };
  }
};

const handleMute = () => {
  const isMute = video.muted;
  if (isMute) {
    // If is muted, change it to unmuted
    video.muted = false;
    muteBtn.innerHTML = "mute";
    volumeRange.value = video.volume;
    localStorage.setItem("muted", false);
  } else {
    // If is not muted, change it to muted

    video.muted = true;
    muteBtn.innerHTML = "Unmute";
    volumeRange.value = 0;
    localStorage.setItem("muted", true);
  }
};

const handlePlay = () => {
  const isPaused = video.paused;
  // console.log(isPaused);
  if (isPaused) {
    // Play the video, and change the play button text to pause
    video.play();
    playBtn.innerHTML = "Pause";
  } else {
    // Pause the video, and change the pause button text to play
    video.pause();
    playBtn.innerHTML = "Play";
  }
};

const handleVolume = event => {
  video.volume = event.target.value;
  // console.log(event.target.value);
};

const handleOpenSearch = event => {
  console.log(event.target);
  opensearch.style.display = "none";
  search.style.display = "inherit";
  const searchForm = document.querySelector(".js-search-form");
  searchForm.addEventListener("submit", handleSubmit);
};

const handleCloseSearch = event => {
  console.log(event.target);
  search.style.display = "none";
  opensearch.style.display = "inherit";
};

const handleSubmit = event => {
  event.preventDefault();
  console.log("search!");
};

const handleBoxMouseOver = event => {
  const box = event.target;
  const previousOne = box.previousElementSibling;
  const nextOne = box.nextElementSibling;
  if (previousOne) {
    previousOne.classList.add("previous");
  }
  if (nextOne) {
    nextOne.classList.add("next");
  }
};

const handleBoxMouseLeave = event => {
  const box = event.target;
  const previousOne = box.previousElementSibling;
  const nextOne = box.nextElementSibling;
  if (previousOne) {
    previousOne.classList.remove("previous");
  }
  if (nextOne) {
    nextOne.classList.remove("next");
  }
};

const handleAlarmCount = event => {
  if (alarmcount >= 9) {
    alarmcount = 0;
  }
  alarmnumber.innerHTML = ++alarmcount;
};

loadSettings();
muteBtn.addEventListener("click", handleMute);
playBtn.addEventListener("click", handlePlay);
volumeRange.addEventListener("change", handleVolume);
opensearch.addEventListener("mouseover", handleOpenSearch);
closesearch.addEventListener("click", handleCloseSearch);
alarm.addEventListener("click", handleAlarmCount);
header.addEventListener("mouseleave", handleCloseSearch);
window.addEventListener("scroll", handleScroll);
boxArray.forEach(box => {
  box.addEventListener("mouseover", handleBoxMouseOver);
  box.addEventListener("mouseleave", handleBoxMouseLeave);
});
