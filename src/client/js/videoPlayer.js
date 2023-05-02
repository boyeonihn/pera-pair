const video = document.querySelector('video');
const playBtn = document.getElementById('play');
const muteBtn = document.getElementById('mute');
const currentTime = document.getElementById('currentTime');
const totalTime = document.getElementById('totalTime');
const volumeRange = document.getElementById('volume');
const timeline = document.getElementById('timeline');
const fullscreenBtn = document.getElementById('fullscreen');
const videoContainer = document.getElementById('videoContainer');
const videoControls = document.getElementById('videoControls');

let userVolume = 0.5;
video.value = userVolume;
const handlePlay = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }

  play.innerText = video.paused ? 'Pause' : 'Play';
};

const handleMute = (event) => {
  if (!video.muted) {
    video.muted = true;
  } else {
    video.muted = false;
  }

  muteBtn.innerText = video.muted ? 'Unmute' : 'Mute';
  volumeRange.value = video.muted ? 0 : userVolume;
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;

  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = 'Mute';
  }
  userVolume = value;
  video.volume = value;
};

playBtn.addEventListener('click', handlePlay);
muteBtn.addEventListener('click', handleMute);
volumeRange.addEventListener('input', handleVolumeChange);
