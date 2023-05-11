const form = document.getElementById('commentForm');
const textarea = form.querySelector('textarea');
const submitBtn = form.querySelector('button');
const videoContainer = document.getElementById('videoContainer');
const videoComments = document.querySelectorAll('.video__comment');
const videoId = videoContainer.dataset.id;

const deleteComment = async (event) => {
  const clickedEl = event.target;
  if (clickedEl.tagName.toLowerCase() === 'i') {
    const targetCommentEl = clickedEl.closest('li.video__comment');
    const id = targetCommentEl.dataset.id;

    await fetch(`/api/videos/${videoId}/comment`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    targetCommentEl.remove();
  }
};

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
videoComments.forEach((comment) =>
  comment.addEventListener('click', deleteComment)
);
