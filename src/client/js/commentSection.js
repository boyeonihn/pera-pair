const form = document.getElementById('commentForm');
const textarea = form.querySelector('textarea');
const submitBtn = form.querySelector('button');
const videoContainer = document.getElementById('videoContainer');

const addComment = (event) => {
  event.preventDefault();
  if (form.dataset.login === 'false') {
    alert('Please Login First');
    return;
  }
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;

  if (text === '') {
    return;
  }

  fetch(`/api/videos/${videoId}/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });
  textarea.value = '';
};
form.addEventListener('submit', addComment);
