async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const link = document.querySelector('input[name="link"]').value;
    const content = document.querySelector('input[name="content"]').value;
    
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        link,
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      console.log("===============================================")
      console.log(response);
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
    
  };
  

document.querySelector('#new-post-form').addEventListener('submit', newFormHandler);