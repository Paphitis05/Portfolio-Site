(function () {
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  var revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }
  }

  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (canHover && !reduceMotion) {
    window.addEventListener('mousemove', function (e) {
      var offsetX = (e.clientX / window.innerWidth - 0.5) * 20;
      var offsetY = (e.clientY / window.innerHeight - 0.5) * 20;
      document.body.style.setProperty('--grid-x', offsetX.toFixed(1) + 'px');
      document.body.style.setProperty('--grid-y', offsetY.toFixed(1) + 'px');
    });
  }
})();
