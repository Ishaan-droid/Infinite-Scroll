// SELECTORS
const search = document.querySelector('.search input');
const comments = document.querySelector('.comments');

let timer;

const HTML = (id, email, body) => `<div class="comment" id=${id}>
<h2>${email}</h2>
<p>${body}</p>
</div>`;

const debounce = e => {
  const query = e.target.value;

  if (document.querySelector('.comment')) {
    document.querySelector('.comment').remove();
  }

  clearTimeout(timer);

  timer = setTimeout(async () => {
    const data = await fetch(`https://jsonplaceholder.typicode.com/comments?email=${query}`);
    const res = await data.json();

    if (res.length) {
      const [{ body, email, id }] = res;
      comments.insertAdjacentHTML('beforeend', HTML(id, email, body));
    }
  }, 1000);
};

(async function () {
  search.focus();
  search.addEventListener('input', e => debounce(e));
})();
