const recordBtn = document.getElementById('recordBtn');
const video = document.getElementById('preview');
const startText = 'Start Recording';
const stopText = 'Stop Recording';
const downloadText = 'Download Recording';

let stream;
let recorder;
let videoFile;

