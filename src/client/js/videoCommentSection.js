const form = document.querySelector('.video__add-comments > form');
const textarea = form.querySelector('textarea');
const submitBtn = form.querySelector('button');
const videoContainer = document.getElementById('videoContainer');
const videoComments = document.querySelectorAll('.comment__unit');
const videoId = videoContainer.dataset.id;
const cancelBtn = form.querySelector('.cancel__comment');

const deleteComment = async (event) => {
  const clickedEl = event.target;
  if (clickedEl.tagName.toLowerCase() === 'i') {
    const targetCommentEl = clickedEl.closest('li.comment__unit');
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
  const videoComments = document.querySelector('.comments__box ul');
  const comment = document.createElement('li');
  comment.classList.add('comment__unit');
  comment.dataset.id = commentInfo.commentId;
  const avatarUrl = form.dataset.avatar;
  const avatarPic = `<img class="avatar-mini" src=${avatarUrl} crossorigin />`;
  const createdAt = commentInfo.createdAt.join(' ').slice(0, 16);

  comment.innerHTML = `
    ${
      avatarUrl !== ''
        ? avatarPic
        : '<div class="avatar-default-mini><i class="fa-solid fa-user"></i></div>'
    }
    <section class="comment__owner-data">
    <div class="comment__owner-data__top">
    <span class="comment__owner-data__name">
    <a href="/users/${commentInfo.user}">@${commentInfo.name}</a>
    </span>
    <span class="comment__owner-data__date">${createdAt}</span>
    </div>
    <p>${commentInfo.text}</p>
    </section>
    <span class="delete-icon"><i class="fa-solid fa-delete-left"></i></span>
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
      createdAt: currentTime.toISOString().split('T'),
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
