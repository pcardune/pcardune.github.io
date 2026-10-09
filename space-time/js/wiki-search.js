// Search box for the wiki header. Uses Pagefind's JS API (the index is built at
// deploy time) and renders its own results dropdown.
(() => {
  const script = document.currentScript;
  const pagefindUrl = new URL(script.dataset.pagefind, document.baseURI).href;
  const box = document.querySelector("[data-wiki-search]");
  if (!box) return;

  const input = box.querySelector("input");
  const panel = box.querySelector(".search-panel");
  let pagefind = null;
  let token = 0;
  let timer = 0;
  let active = -1;

  async function load() {
    if (!pagefind) {
      pagefind = await import(pagefindUrl);
      await pagefind.init();
    }
    return pagefind;
  }

  function show(html) {
    panel.innerHTML = html;
    panel.hidden = false;
    active = -1;
  }
  function hide() {
    panel.hidden = true;
    active = -1;
  }
  const escapeHtml = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

  async function run(query) {
    const mine = ++token;
    if (query.trim().length < 2) return hide();
    try {
      const pf = await load();
      const search = await pf.search(query);
      const items = await Promise.all(search.results.slice(0, 6).map((r) => r.data()));
      if (mine !== token) return;
      if (!items.length) return show(`<p class="search-empty">Nothing found for "${escapeHtml(query)}"</p>`);
      show(items.map((d) => {
        const category = (d.filters?.category ?? [])[0] ?? "";
        return `<a class="search-result" role="option" href="${d.url}">
          <span class="search-title">${escapeHtml(d.meta.title ?? d.url)}</span>
          ${category ? `<span class="search-category">${escapeHtml(category)}</span>` : ""}
          <span class="search-excerpt">${d.excerpt}</span></a>`;
      }).join(""));
    } catch (e) {
      show(`<p class="search-empty">Search is not available. Build the site with <code>npm run build</code> and open it through a server.</p>`);
    }
  }

  function move(delta) {
    const links = [...panel.querySelectorAll(".search-result")];
    if (!links.length) return;
    active = (active + delta + links.length) % links.length;
    links.forEach((l, i) => l.classList.toggle("active", i === active));
    links[active].scrollIntoView({ block: "nearest" });
  }

  input.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(() => run(input.value), 120);
  });
  input.addEventListener("focus", () => { load().catch(() => {}); if (panel.innerHTML && input.value) panel.hidden = false; });
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
    else if (e.key === "Enter") {
      const link = panel.querySelectorAll(".search-result")[Math.max(active, 0)];
      if (link) location.href = link.href;
    } else if (e.key === "Escape") { hide(); input.blur(); }
  });
  document.addEventListener("click", (e) => { if (!box.contains(e.target)) hide(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && !/^(INPUT|TEXTAREA)$/.test(document.activeElement?.tagName ?? "")) {
      e.preventDefault();
      input.focus();
    }
  });
})();
