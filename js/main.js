(function () {
  var landing = document.getElementById('landing');
  var site = document.getElementById('site');
  var startBtn = document.getElementById('start-btn');
  var navToggle = document.getElementById('nav-toggle');
  var mainNav = document.getElementById('main-nav');
  var replayLink = document.getElementById('footer-replay');

  function enterSite() {
    site.hidden = false;
    landing.classList.add('landing-hide');
    window.scrollTo(0, 0);
    setTimeout(function () {
      landing.setAttribute('aria-hidden', 'true');
    }, 500);
  }

  function replayIntro(e) {
    if (e) e.preventDefault();
    landing.removeAttribute('aria-hidden');
    landing.classList.remove('landing-hide');
    site.hidden = true;
    window.scrollTo(0, 0);
  }

  startBtn.addEventListener('click', enterSite);

  if (replayLink) {
    replayLink.addEventListener('click', replayIntro);
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Allow pressing Enter/Space on the start screen from anywhere
  document.addEventListener('keydown', function (e) {
    if (!site.hidden) return;
    if (e.key === 'Enter' || e.key === ' ') {
      // Space's default action is to page-scroll the viewport, which races
      // enterSite()'s own scrollTo(0, 0) and can win, landing mid-page.
      e.preventDefault();
      enterSite();
    }
  });
})();
