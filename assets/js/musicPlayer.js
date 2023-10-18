const customAudioPlayer = document.getElementById('customAudioPlayer');
const playPauseButton = document.getElementById('play');
const currentTimeDisplay = document.querySelector('.begin');
const totalTimeDisplay = document.querySelector('.end');
const progressBar = document.querySelector('.lineFilled');
const porgressBarHolder = document.querySelector('.line');

const removePopup = document.querySelector('.AllSelector');
const playPauseButton2 = document.querySelector('.play2');

const fastForward = document.getElementById('forwards');
const fastBackward = document.getElementById('backwards');

var clickCount = 0;
var clickCount2 = 0;

const audio = new Audio('/assets/mp3/S1E1-DeMagischePodcast.mp3');

audio.addEventListener('loadedmetadata', () => {
    totalTimeDisplay.innerText = formatTime(audio.duration);

    document.querySelector('.endAll').innerText = formatTime(audio.duration);
    document.querySelector('.end2').innerText = formatTime(audio.duration);

});

removePopup.addEventListener('click', () => {

    audio.pause();
    playPauseButton.innerText = 'Play';
    clickCount = 0;
    clearInterval(backwardInterval);

    document.getElementsByClassName('loading')[0].style.opacity = '0';


    document.getElementsByClassName('playSelector')[0].src = '/assets/svg/icons/play.svg';
    document.getElementsByClassName('playSelector2')[0].src = '/assets/svg/icons/play.svg';


})

playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.innerText = 'Pause';
        clickCount = 0;
        clearInterval(backwardInterval);

        document.getElementsByClassName('loading')[0].style.opacity = '1';

        document.getElementsByClassName('playSelector')[0].src = '/assets/svg/icons/pause.svg';
        document.getElementsByClassName('playSelector2')[0].src = '/assets/svg/icons/pause.svg';

    } else {
        audio.pause();
        playPauseButton.innerText = 'Play';
        clickCount = 0;
        clearInterval(backwardInterval);

        document.getElementsByClassName('loading')[0].style.opacity = '0';

        document.getElementsByClassName('playSelector2')[0].src = '/assets/svg/icons/play.svg';
        document.getElementsByClassName('playSelector')[0].src = '/assets/svg/icons/play.svg';
    }
});

playPauseButton2.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseButton2.innerText = 'Pause';
        clickCount = 0;
        clearInterval(backwardInterval);

        document.getElementsByClassName('loading')[0].style.opacity = '1';

        document.getElementsByClassName('playSelector')[0].src = '/assets/svg/icons/pause.svg';
        document.getElementsByClassName('playSelector2')[0].src = '/assets/svg/icons/pause.svg';

    } else {
        audio.pause();
        playPauseButton2.innerText = 'Play';
        clickCount = 0;
        clearInterval(backwardInterval);

        document.getElementsByClassName('loading')[0].style.opacity = '0';

        document.getElementsByClassName('playSelector2')[0].src = '/assets/svg/icons/play.svg';
        document.getElementsByClassName('playSelector')[0].src = '/assets/svg/icons/play.svg';
    }
});


audio.addEventListener('ended', () => {
    playPauseButton.innerText = 'Play';
    document.getElementsByClassName('playSelector')[0].src = '/assets/svg/icons/play.svg';
    document.getElementsByClassName('playSelector2')[0].src = '/assets/svg/icons/play.svg';

    const playElements = document.querySelectorAll('.play');

    playElements.forEach((element) => {
        element.classList.remove('play');
    });

    document.getElementById('play').classList.add('play');

    document.querySelector('.MediaPlayerBox').style.display = 'none';


});

audio.addEventListener('playing', () => {
    playPauseButton.innerText = 'Pause';
    updateAudio(1);

    document.querySelector('.MediaPlayerBox').style.display = 'grid';

    clickCount = 0;

});

audio.addEventListener('pause', () => {
    playPauseButton.innerText = 'Play';
    updateAudio(1);

    document.querySelector('.MediaPlayerBox').style.display = 'none';

    const playElements = document.querySelectorAll('.play');

    playElements.forEach((element) => {
        element.classList.remove('play');
    });

    document.getElementById('play').classList.add('play');

});

audio.addEventListener('timeupdate', () => {
    currentTimeDisplay.innerText = formatTime(audio.currentTime);

    document.querySelector('.beginAll').innerText = formatTime(audio.currentTime);
    document.querySelector('.begin2').innerText = formatTime(audio.currentTime);


    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;

    document.querySelector('.AllFilled').style.width = `${progress}%`;
    document.querySelector('.lineFilled2').style.width = `${progress}%`;

});

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    console.log(clickCount2);

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

}

function updateAudio(speed) {

    audio.playbackRate = speed;

}

fastForward.addEventListener('click', function() {;
    playPauseButton.innerText = 'Play';
    clickCount++;
    clearInterval(backwardInterval);

    if (audio.currentTime == 0) {

        console.log('i')

        audio.play();
        playPauseButton.innerText = 'Pause';
        clickCount = 0;
        clearInterval(backwardInterval);

        document.getElementsByClassName('playSelector2')[0].src = '/assets/svg/icons/pause.svg';
        document.getElementsByClassName('playSelector')[0].src = '/assets/svg/icons/pause.svg';

    }

    if (clickCount === 1) {

        const playElements = document.querySelectorAll('.play');

        playElements.forEach((element) => {
            element.classList.remove('play');
        });

        document.getElementById('forwards').classList.add('play');

        updateAudio(3)

    } else if (clickCount === 2) {

        updateAudio(1)

        const playElements = document.querySelectorAll('.play');

        playElements.forEach((element) => {
            element.classList.remove('play');
        });

        document.getElementById('play').classList.add('play');

        console.log(clickCount);

        clickCount = 0;
    }

});

let backwardInterval;

fastBackward.addEventListener('click', function() {
    playPauseButton.innerText = 'Play';
    clickCount2++;
    clickCount = 0;
    updateAudio(0)

    if (clickCount2 === 1) {
        const playElements = document.querySelectorAll('.play');
        playElements.forEach((element) => {
            element.classList.remove('play');
        });

        document.getElementById('backwards').classList.add('play');

        backwardInterval = setInterval(fastBackward2, 1000 / 3);
    }
    if (clickCount2 === 2) {
        clearInterval(backwardInterval);

        console.log('i');

        fastBackward2();

        const playElements = document.querySelectorAll('.play');
        playElements.forEach((element) => {
            element.classList.remove('play');
        });

        document.getElementById('play').classList.add('play');

        clickCount2 = 0;
    }
});

function fastBackward2() {
    if (audio.currentTime <= 0.3) {
        clearInterval(backwardInterval);
        resetAudio();

        const playElements = document.querySelectorAll('.play');
        playElements.forEach((element) => {
            element.classList.remove('play');
        });

        document.getElementById('play').classList.add('play');

    } else {
        audio.currentTime -= 1;
    }
}

function resetAudio() {
    audio.currentTime < 0.3;
    audio.pause();
    updateAudio(1);

    const playElements = document.querySelectorAll('.play');
    playElements.forEach((element) => {
        element.classList.remove('play');
    });

    document.getElementById('play').classList.add('play');
    document.getElementsByClassName('playSelector')[0].src = '/assets/svg/icons/play.svg';
    document.getElementsByClassName('playSelector2')[0].src = '/assets/svg/icons/play.svg';


    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;

    currentTimeDisplay.innerText = formatTime(audio.currentTime);
}