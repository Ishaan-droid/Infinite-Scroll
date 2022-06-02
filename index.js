const postContainer = document.querySelector('.post-container');

(async function () {
  let number = 1;
  const data = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${number}`);
  const posts = await data.json();

  renderPosts(posts);
  infiniteScroll(posts, number);
})();

function renderPosts(posts) {
  const renderHTML = (id, userId, title, content) => `<div class="post" id=${id}>
  <h2>${userId}</h2>
  <h3>${title}</h3>
  <p>${content}</p>
    </div>`;

  posts.forEach(cur =>
    postContainer.insertAdjacentHTML(
      'beforeend',
      renderHTML(cur.id, cur.userId, cur.title, cur.body)
    )
  );
}

function infiniteScroll(posts, number) {
  window.addEventListener('scroll', async () => {
    if (window.innerHeight + window.scrollY > document.body.scrollHeight) {
      number += 1;
      console.log(number);
      const data = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${number}`);
      const posts = await data.json();
      renderPosts(posts);
    }
  });
}
