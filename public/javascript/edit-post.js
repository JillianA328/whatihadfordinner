async function editFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value.trim();
  const link = document.querySelector('input[name="link"]').value.trim();
  const content = document.querySelector('input[name="content"]').value.trim();

  //console.log(title);
  //console.log(content);

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      post_id: id,
      title,
      link,
      content
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }

}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);