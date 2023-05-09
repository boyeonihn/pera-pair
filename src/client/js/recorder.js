import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
const recordBtn = document.getElementById('recordBtn');
const video = document.getElementById('preview');

const recordStatus = {
  startText: 'Start Recording',
  stopText: 'Stop Recording',
  downloadText: 'Download Recording',
  transcodeText: 'Transcoding Video',
  recordAgain: 'Record Again',
};

let stream;
let recorder;
let videoFile;

const files = {
  input: 'recording.webm',
  output: 'output.mp4',
  thumb: 'thumbnail.jpg',
};

const downloadFile = (fileUrl, fileName) => {
  const link = document.createElement('a');
  link.href = fileUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
};

const startRecording = () => {
  recordBtn.innerText = recordStatus.stopText;
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
  recordBtn.innerText = recordStatus.downloadText;
  recorder.stop();
};

const handleDownload = async () => {
  recordBtn.innerText = recordStatus.transcodeText;
  recordBtn.disabled = true;

  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load(); // ffmpeg - user is going to run software that has non-JS code
  // (it's heavy - need to wait) - user computer is the one who handles the burden

  // create file from recording.webm
  ffmpeg.FS('writeFile', files.input, await fetchFile(videoFile));

  await ffmpeg.run('-i', files.input, '-r', '60', files.output); // usually run this on console/terminal but because we loaded on browser,
  // we can use same commands

  await ffmpeg.run(
    '-i',
    files.input,
    '-ss',
    '00:00:01',
    '-frames:v',
    '1',
    files.thumb
  );

  const mp4File = ffmpeg.FS('readFile', files.output);
  const thumbFile = ffmpeg.FS('readFile', files.thumb);

  const mp4Blob = new Blob([mp4File.buffer], { type: 'video/mp4' });
  const thumbBlob = new Blob([thumbFile.buffer], { type: 'image/jpg' });

  const mp4Url = URL.createObjectURL(mp4Blob);
  const thumbUrl = URL.createObjectURL(thumbBlob);

  downloadFile(mp4Url, 'MyRecording.mp4');
  downloadFile(thumbUrl, 'MyThumbnail.jpg');

  // deleting files - after they are downloaded
  ffmpeg.FS('unlink', files.input);
  ffmpeg.FS('unlink', files.output);
  ffmpeg.FS('unlink', files.thumb);

  URL.revokeObjectURL(thumbUrl);
  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(videoFile);

  recordBtn.disabled = false;
  recordBtn.innerText = recordStatus.recordAgain;
};
const handleRecording = () => {
  if (recordBtn.innerText === recordStatus.startText) {
    startRecording();
  } else if (recordBtn.innerText === recordStatus.stopText) {
    stopRecording();
  } else if (recordBtn.innerText === recordStatus.downloadText) {
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
