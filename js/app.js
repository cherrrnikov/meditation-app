const app = () => {
    const song = document.querySelector(".song");
    const playBtn = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");
    const timeSelect = document.querySelectorAll(".time-btn");
    const timeInput = document.querySelector(".time-input");

    //Sounds
    const sounds = document.querySelectorAll(".sound-picker button");
    //Time display
    const timeDisplay = document.querySelector(".player-time");
    //Get the length of the outline
    const outlineLength = outline.getTotalLength();

    //Duration
    let duration = 0;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //Check setTime
    let checkedTime = false;

    //Create the function specific to stop and play the sounds
    const checkPlaying = function (song) {
        if (song.paused) {
            song.play();
            video.play();
            playBtn.src = "./svg/pause.svg";
        } else {
            song.pause();
            video.pause();
            playBtn.src = "./svg/play.svg";
        }
    };

    //play sound
    playBtn.addEventListener("click", () => {
        if (checkedTime) {
            checkPlaying(song);
        }
    });

    const setTime = function (duration) {
        let seconds = Math.floor(duration % 60);
        let minutes = Math.floor(duration / 60);
        timeDisplay.textContent = `${minutes}:${
            seconds < 10 ? "0" + seconds : seconds
        }`;
    };

    //Select time
    timeSelect.forEach((btn) => {
        btn.addEventListener("click", function () {
            checkedTime = true;
            song.pause();
            video.pause();
            playBtn.src = "./svg/play.svg";
            duration = this.getAttribute("data-time");
            song.currentTime = 0;
            setTime(duration);
        });
    });

    //Select sound
    sounds.forEach((btn) => {
        btn.addEventListener("click", function () {
            video.src = this.getAttribute("data-video");
            song.src = this.getAttribute("data-sound");
            checkPlaying(song);
        });
    });

    //We can animate circle with check the time duration and song time
    song.ontimeupdate = function () {
        let currentTime = song.currentTime;
        let elapsedTime = duration - currentTime;
        setTime(elapsedTime);

        //Animate progress circle bar
        let progress = outlineLength - (currentTime / duration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        if (currentTime >= duration) {
            song.pause();
            video.pause();
            song.currentTime = 0;
            playBtn.src = "./svg/play.svg";
        }
    };
};
app();
