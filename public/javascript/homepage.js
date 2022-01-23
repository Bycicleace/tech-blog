async function loadPost(event) {
    event.preventDefault();
    const postId = this.dataset.postId;
    location.replace(`/post/${postId}`);
};

document.querySelectorAll("[data-post-id]").forEach(element => element.addEventListener("click",loadPost));