const recordBtn = document.getElementById('recordBtn');
const video = document.getElementById('preview');
const startText = 'Start Recording';
const stopText = 'Stop Recording';
const downloadText = 'Download Recording';

let stream;
let recorder;
let videoFile;

const startRecording = () => {
  recordBtn.innerText = stopText;
  recorder = new window.MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data); // URL created by the browser - to access a file (on the memory of the browser)
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };
  recorder.start();
};

const stopRecording = () => {
  recordBtn.innerText = downloadText;
  recorder.stop();
};

const handleDownload = () => {
  const videoLink = document.createElement('a');
  videoLink.href = videoFile;
  videoLink.download = 'MyRecording.webm';
  document.body.appendChild(videoLink);
  videoLink.click();
};
const handleRecording = () => {
  if (recordBtn.innerText === startText) {
    startRecording();
  } else if (recordBtn.innerText === stopText) {
    stopRecording();
  } else if (recordBtn.innerText === downloadText) {
    handleDownload();
  }
};

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
recordBtn.addEventListener('click', handleRecording);
