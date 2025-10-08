let grade = 0,
    active = false,
    interval;

const rotate = () => {
    const cubes = document.querySelectorAll('.cube');
    Array.from(cubes).forEach(cube => cube.style.transform = `rotateY(${grade}deg)`);
}

const changePlayPause = () => {
    const icon = document.querySelector('.play-pause i');
    const iconClass = icon.classList[1];
    if (iconClass === 'fa-play') {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    } else {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }
}
const playPause = () => {
    if (!active) {
        interval = setInterval(() => {
            grade -= 90;
            rotate();
        }, 1000);
        changePlayPause();
        active = true;
    } else {
        clearInterval(interval);
        changePlayPause();
        active = false;
    }

}
document.querySelector('.left-arrow').addEventListener('click', () => {
    grade += 90;
    rotate();
    if (active) {
        playPause;
    }
});

document.querySelector('.left-arrow').addEventListener('mouseover', () => {
    grade += 25;
    rotate();
});

document.querySelector('.left-arrow').addEventListener('mouseout', () => {
    grade -= 25;
    rotate();
});



document.querySelector('.right-arrow').addEventListener('click', () => {
    grade -= 90;
    rotate();
    if (active) {
        playPause;
    }
});

document.querySelector('.right-arrow').addEventListener('mouseover', () => {
    grade -= 25;
    rotate();
});

document.querySelector('.right-arrow').addEventListener('mouseout', () => {
    grade += 25;
    rotate();
});

document.querySelector('.play-pause').addEventListener('click', () => {
    playPause();
});
