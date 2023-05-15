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

const addComment = (commentInfo) => {
  const videoComments = document.querySelector('.video__comments ul');
  const comment = document.createElement('li');
  comment.classList.add('video__comment');
  comment.dataset.id = commentInfo.commentId;
  comment.innerHTML = `
  <span>
  <a href="/users/${commentInfo.id}">${commentInfo.name}</a>
  </span>
  <span>${commentInfo.createdAt}</span>
  <span><i class="fa-solid fa-delete-left"></i></span>
  <p>${commentInfo.text}</p>
  `;

  comment.addEventListener('click', deleteComment);
  videoComments.prepend(comment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  if (form.dataset.login === '') {
    alert('Please Login First');
    return;
  }
  const text = textarea.value;

  if (text === '') {
    return;
  }

  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  textarea.value = '';
  const json = await response.json();
  const commentId = json.newCommentId;

  if (response.status === 201) {
    const id = form.dataset.login;
    const name = form.dataset.name;
    const currentTime = new Date();
    const commentInfo = {
      text,
      createdAt: currentTime.toISOString(),
      user: id,
      name,
      commentId,
    };
    addComment(commentInfo);
  }
};

form.addEventListener('submit', handleSubmit);
videoComments.forEach((comment) =>
  comment.addEventListener('click', deleteComment)
);
