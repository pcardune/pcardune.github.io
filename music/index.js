const modal = new bootstrap.Modal('#exampleModal');

document.querySelector('.modal-footer .btn').addEventListener('click', () => {
  location.hash = '';
});

function highlightSelected() {
  if (location.hash) {
    let hash = location.hash.slice(1);
    var el = document.getElementById(hash);
    if (el) {
      document.querySelector('#modal-content').innerHTML =
        el.parentElement.outerHTML;
      modal.show();
    }
  }
}

document.querySelectorAll('.list-group-item').forEach((el) => {
  const anchorEl = el.querySelector('a:first-child');
  const titleEl = el.querySelector('h4');
  if (anchorEl && titleEl) {
    titleEl.innerHTML = `<a href="#${anchorEl.id}">${titleEl.textContent}</a>`;
  }
});

addEventListener('hashchange', highlightSelected);
highlightSelected();
