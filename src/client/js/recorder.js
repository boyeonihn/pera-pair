import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
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

const handleDownload = async () => {
  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load(); // ffmpeg - user is going to run software that has non-JS code
  // (it's heavy - need to wait) - user computer is the one who handles the burden

  // create file from recording.webm
  ffmpeg.FS('writeFile', 'recording.webm', await fetchFile(videoFile));

  await ffmpeg.run('-i', 'recording.webm', '-r', '60', 'output.mp4'); // usually run this on console/terminal but because we loaded on browser,
  // we can use same commands
  const mp4File = ffmpeg.FS('readFile', 'output.mp4');

  const mp4Blob = new Blob([mp4File.buffer], { type: 'video/mp4' });
  const mp4Url = URL.createObjectURL(mp4Blob);
  const videoLink = document.createElement('a');
  videoLink.href = mp4Url; // binary data
  videoLink.download = 'MyRecording.mp4';
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
