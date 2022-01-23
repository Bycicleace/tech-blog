async function addComment(event) {
    event.preventDefault();

    const postId = document.querySelector('#comment-form').dataset.postId;
    const comment = document.querySelector('#comment-body').value.trim();

    if (postId && comment) {
        const response = await fetch('/api/comments', {
            method: 'post',
            body: JSON.stringify({ body: comment, post_id: postId}),
            headers: { 'Content-Type': 'application/json' }
        })

        if (response.ok) {
            location.reload();
        } else {
            console.error(response.statusText);
        }
    }
}

document.querySelector('#comment-form').addEventListener('submit', addComment);