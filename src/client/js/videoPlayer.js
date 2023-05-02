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
let controlsTimeout = null;

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

const formatTime = (seconds) => {
  return new Date(seconds * 1000).toISOString().substring(11, 19);
};

const handleLoadedMetadata = () => {
  const totalTimeSeconds = Math.floor(video.duration);
  timeline.max = Math.floor(video.duration);
  let hours = Math.floor(totalTimeSeconds / (60 * 60));
  let minutes = Math.floor((totalTimeSeconds % 3600) / 60);
  let seconds = Math.floor(totalTimeSeconds % 60);

  minutes = hours > 0 ? String(minutes).padStart(2, 0) : minutes;
  seconds = String(seconds).padStart(2, 0);

  if (hours === 0) {
    totalTime.innerText = `${minutes}:${seconds}`;
  } else {
    totalTime.innerText = `${hours}:${minutes}:${seconds}`;
  }
};

const handleTimeUpdate = () => {
  timeline.value = Math.floor(video.currentTime);
  const currentFormattedTime = formatTime(Math.floor(video.currentTime));
  const timeSplitArray = currentFormattedTime.split(':');

  let [hours, minutes, seconds] = timeSplitArray;
  minutes = hours === '00' ? minutes[1] : minutes;

  if (hours === '00') {
    currentTime.innerText = `${minutes}:${seconds}`;
  } else if (Number(hours) < 10) {
    currentTime.innerText = `${hours[1]}:${minutes}:${seconds}`;
  } else {
    currentTime.innerText = `${hours}:${minutes}:${seconds}`;
  }
};

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;

  video.currentTime = value;
};

const handleFullscreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    fullscreenBtn.innerText = 'Enter Fullscreen';
    document.exitFullscreen();
  } else {
    videoContainer.requestFullscreen();
    fullscreenBtn.innerText = 'Exit Fullscreen';
  }
};

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  videoControls.classList.add('showing');
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(
    () => videoControls.classList.remove('showing'),
    2000
  );
};
playBtn.addEventListener('click', handlePlay);
muteBtn.addEventListener('click', handleMute);
volumeRange.addEventListener('input', handleVolumeChange);
video.addEventListener('loadedmetadata', handleLoadedMetadata);
video.addEventListener('timeupdate', handleTimeUpdate);
timeline.addEventListener('input', handleTimelineChange);
fullscreenBtn.addEventListener('click', handleFullscreen);
video.addEventListener('mousemove', handleMouseMove);
video.addEventListener('mouseleave', handleMouseLeave);
