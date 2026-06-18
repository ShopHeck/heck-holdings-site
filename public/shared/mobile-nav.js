/* ─────────────────────────────────────────────
   Mobile Nav — Hamburger + Drawer for static pages
   Auto-injects into .blog-nav on screens ≤ 768px
   ───────────────────────────────────────────── */
(function () {
  var nav = document.querySelector('.blog-nav-inner');
  if (!nav) return;

  // Build hamburger button
  var btn = document.createElement('button');
  btn.className = 'mobile-hamburger';
  btn.setAttribute('aria-label', 'Open menu');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML =
    '<svg class="ham-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>' +
    '<svg class="close-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="display:none"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  nav.appendChild(btn);

  // Build drawer from existing nav links
  var links = nav.querySelector('.blog-nav-links');
  var drawer = document.createElement('div');
  drawer.className = 'mobile-drawer';
  drawer.setAttribute('data-open', '0');

  var inner = document.createElement('div');
  inner.className = 'mobile-drawer-inner';

  // Clone links into drawer
  var anchors = links.querySelectorAll('a');
  for (var i = 0; i < anchors.length; i++) {
    var a = anchors[i];
    var clone = a.cloneNode(true);
    clone.classList.remove('hide-mobile', 'active');
    if (a.classList.contains('btn-primary')) {
      clone.className = 'btn-primary mobile-drawer-cta';
    } else {
      clone.className = 'mobile-drawer-link';
    }
    clone.addEventListener('click', closeMenu);
    inner.appendChild(clone);
  }

  drawer.appendChild(inner);
  // Insert drawer after nav element
  var navEl = document.querySelector('.blog-nav');
  navEl.appendChild(drawer);

  var isOpen = false;

  function openMenu() {
    isOpen = true;
    drawer.setAttribute('data-open', '1');
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Close menu');
    btn.querySelector('.ham-icon').style.display = 'none';
    btn.querySelector('.close-icon').style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    isOpen = false;
    drawer.setAttribute('data-open', '0');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open menu');
    btn.querySelector('.ham-icon').style.display = 'block';
    btn.querySelector('.close-icon').style.display = 'none';
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', function () {
    isOpen ? closeMenu() : openMenu();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) closeMenu();
  });
})();
