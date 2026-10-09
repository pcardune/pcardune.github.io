// Mobile menu toggle.
const toggle = document.querySelector(".nav-toggle");
const menu = document.getElementById("menu");
toggle.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
menu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

// Click a screenshot to see it larger. Arrow keys step through them, and Esc,
// the close button or a click on the picture closes it.
(() => {
  const shots = [...document.querySelectorAll(".shot:not(.placeholder) img")];
  if (!shots.length || typeof HTMLDialogElement === "undefined") return;

  const dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.innerHTML =
    '<button class="lb-close" type="button" aria-label="Close">&times;</button>' +
    '<button class="lb-prev" type="button" aria-label="Previous screenshot">&lsaquo;</button>' +
    '<figure><img alt=""><figcaption></figcaption></figure>' +
    '<button class="lb-next" type="button" aria-label="Next screenshot">&rsaquo;</button>';
  document.body.append(dialog);
  const picture = dialog.querySelector("img");
  const caption = dialog.querySelector("figcaption");
  let index = 0;

  function show(i) {
    index = (i + shots.length) % shots.length;
    const shot = shots[index];
    picture.src = shot.currentSrc || shot.src;
    picture.alt = shot.alt;
    caption.textContent = shot.closest("figure").querySelector("figcaption")?.textContent ?? shot.alt;
  }
  function open(i) {
    show(i);
    dialog.showModal();
  }

  shots.forEach((shot, i) => {
    shot.tabIndex = 0;
    shot.setAttribute("role", "button");
    shot.setAttribute("aria-label", "View larger: " + shot.alt);
    shot.addEventListener("click", () => open(i));
    shot.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open(i);
      }
    });
  });

  dialog.querySelector(".lb-close").addEventListener("click", () => dialog.close());
  dialog.querySelector(".lb-prev").addEventListener("click", () => show(index - 1));
  dialog.querySelector(".lb-next").addEventListener("click", () => show(index + 1));
  // A click on the picture or the dark area around it closes it.
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog || e.target === picture) dialog.close();
  });
  dialog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(index - 1);
    else if (e.key === "ArrowRight") show(index + 1);
  });
})();
