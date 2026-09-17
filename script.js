const $ = (s) => document.querySelector(s);

const progress = $('#progress');
const backTop = $('#backTop');
const menuBtn = $('#menuBtn');
const mobileMenu = $('#mobileMenu');
const searchOverlay = $('#searchOverlay');
const searchOpen = $('#searchOpen');
const searchClose = $('#searchClose');
const searchInput = $('#searchInput');

window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const scrolled = h.scrollTop;
  const total = h.scrollHeight - h.clientHeight;
  progress.style.width = total ? `${(scrolled / total) * 100}%` : '0%';
  backTop.classList.toggle('show', scrolled > 600);
});

menuBtn?.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
}));

function openSearch() {
  searchOverlay.classList.add('open');
  searchOverlay.setAttribute('aria-hidden', 'false');
  setTimeout(() => searchInput?.focus(), 50);
}
function closeSearch() {
  searchOverlay.classList.remove('open');
  searchOverlay.setAttribute('aria-hidden', 'true');
}
searchOpen?.addEventListener('click', openSearch);
searchClose?.addEventListener('click', closeSearch);
searchOverlay?.addEventListener('click', e => {
  if (e.target === searchOverlay) closeSearch();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeSearch();
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault(); openSearch();
  }
});

$('#searchForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const q = searchInput.value.trim();
  if (!q) return;
  const url = `https://www.google.com/search?q=${encodeURIComponent('Elite Soul Magazine ' + q)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
});

backTop?.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

$('#newsletterForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const email = $('#email').value.trim();
  const msg = $('#formMessage');
  if (!email) return;
  msg.textContent = 'You’re on the list. Connect a form service before launch to collect real subscriptions.';
  $('#newsletterForm').reset();
});

const revealItems = document.querySelectorAll('.story-card,.visual,.culture-tile,.music-feature,.soul-links a');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, {threshold: .08});
revealItems.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity .7s ease, transform .7s ease';
  observer.observe(el);
});
