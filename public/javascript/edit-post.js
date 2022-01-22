async function updatePost(event) {
    event.preventDefault();
    const postTitle = document.querySelector('#edit-title').value.trim();
    const postBody = document.querySelector('#edit-body').value.trim();
    
    const form = document.querySelector('#edit-post-form');
    const postId = form.dataset.postId;

    if (postTitle && postBody && postId) {
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'put',
            body: JSON.stringify({ title: postTitle, body: postBody }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            console.error(response.statusText);
        }
    }
};

async function cancel(event) {
    event.preventDefault();
    document.location.replace('/dashboard');
};

document.querySelector('#edit-post-form').addEventListener('submit', updatePost);
document.querySelector('#edit-cancel').addEventListener('click', cancel);
