async function handleNewPostSubmit(event) {
    event.preventDefault();
    
    const postTitle = document.querySelector('#new-title').value.trim();
    const postBody = document.querySelector('#new-body').value.trim();

    if (postTitle && postBody) {
        const response = await fetch('/api/posts', {
            method: 'post',
            body: JSON.stringify({ title: postTitle, body: postBody }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            console.error(response.statusText);
        }
    }
}

document.querySelector('#new-post-form').addEventListener('submit', handleNewPostSubmit);