async function goToNewPost(event) {
    event.preventDefault();
    document.location.replace('/dashboard/new-post');
};

async function goToEditPost(event) {
    event.preventDefault();
    const postId = this.dataset.postId;
    document.location.replace(`/dashboard/post/${postId}`);
}

document.querySelector('#create-new-post').addEventListener('click', goToNewPost);
const list = document.querySelectorAll('[data-post-id]').forEach(element => element.addEventListener('click', goToEditPost));