// include.js
document.addEventListener('DOMContentLoaded', () => {
  loadHTML('header.html', '#header');
  loadHTML('footer.html', '#footer');
});

function loadHTML(url, selector) {
  fetch(url)
    .then((res) => res.text())
    .then((data) => (document.querySelector(selector).innerHTML = data))
    .catch((err) => console.error('Lỗi tải', url, err));
}
