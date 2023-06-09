const form = document.querySelector('.post__add-comments > form');
const textarea = form.querySelector('textarea');
const submitBtn = form.querySelector('button');
const postContainer = document.getElementById('postContainer');
const postComments = document.querySelectorAll('.comment__unit');
const postId = postContainer.dataset.id;
const cancelBtn = form.querySelector('.cancel__comment');

const handleViewCount = () => {
  fetch(`/api/posts/${postId}/view`, {
    method: 'POST',
  });
};

handleViewCount();

const deleteComment = async (event) => {
  const clickedEl = event.target;
  if (clickedEl.tagName.toLowerCase() === 'i') {
    const targetCommentEl = clickedEl.closest('li.comment__unit');
    const id = targetCommentEl.dataset.id;

    await fetch(`/api/posts/${postId}/comment`, {
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
  const postComments = document.querySelector('.comments__box ul');
  const comment = document.createElement('li');
  comment.classList.add('comment__unit');
  comment.dataset.id = commentInfo.commentId;
  const avatarUrl = form.dataset.avatar;
  const createdAt = commentInfo.createdAt.join(' ').slice(0, 16);

  if (avatarUrl !== '') {
    comment.innerHTML = `
    <img class="avatar-mini" src=${avatarUrl} crossorigin />
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
  } else {
    comment.innerHTML = `
    <div class="avatar-default-mini><i class="fa-solid fa-user"></i></div>
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
  }

  comment.addEventListener('click', deleteComment);
  postComments.prepend(comment);
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

  const response = await fetch(`/api/posts/${postId}/comment`, {
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

const handleClearComment = () => {
  form.querySelector('textarea').value = '';
};
form.addEventListener('submit', handleSubmit);
cancelBtn.addEventListener('click', handleClearComment);
postComments.forEach((comment) =>
  comment.addEventListener('click', deleteComment)
);
