const recordBtn = document.getElementById('recordBtn');
const video = document.getElementById('preview');
const startText = 'Start Recording';
const stopText = 'Stop Recording';
const downloadText = 'Download Recording';

let stream;
let recorder;
let videoFile;

const init = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { width: 600, height: 400 },
    });
    video.srcObject = stream;
    video.play();
  } catch (err) {
    console.error(err);
  }
};

init();
