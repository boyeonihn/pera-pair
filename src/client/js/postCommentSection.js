const form = document.getElementById('postCommentForm');
const textarea = form.querySelector('textarea');
const submitBtn = form.querySelector('button');
const postContainer = document.getElementById('postContainer');
const postComments = document.querySelectorAll('.video__comment');
const postId = postContainer.dataset.id;

const handleViewCount = () => {
  fetch(`/api/posts/${postId}/view`, {
    method: 'POST',
  });
};

handleViewCount();
const deleteComment = async (event) => {
  const clickedEl = event.target;
  if (clickedEl.tagName.toLowerCase() === 'i') {
    const targetCommentEl = clickedEl.closest('li.post__comment');
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
  //   const postComments = document.querySelector('.posts__comments ul');
  //   const comment = document.createElement('li');
  //   comment.classList.add('post__comment');
  //   comment.dataset.id = commentInfo.commentId;
  //   comment.innerHTML = `
  //   <span>
  //   <a href="/users/${commentInfo.id}">${commentInfo.name}</a>
  //   </span>
  //   <span>${commentInfo.createdAt}</span>
  //   <span><i class="fa-solid fa-delete-left"></i></span>
  //   <p>${commentInfo.text}</p>
  //   `;
  //   comment.addEventListener('click', deleteComment);
  //   postComments.prepend(comment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  if (form.dataset.login === '') {
    alert('Please Login First');
    return;
  }
  const text = textarea.value;
  console.log(text, 'text');

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
      createdAt: currentTime.toISOString(),
      user: id,
      name,
      commentId,
    };
    // addComment(commentInfo);
  }
};

form.addEventListener('submit', handleSubmit);
postComments.forEach((comment) =>
  comment.addEventListener('click', deleteComment)
);
