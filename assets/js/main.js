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
    var ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(ring);

    var targetX = 0, targetY = 0, ringX = 0, ringY = 0, shown = false;
    window.addEventListener('mousemove', function (e) {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!shown) { ring.classList.add('is-visible'); shown = true; }
    });

    (function tick() {
      ringX += (targetX - ringX) * 0.22;
      ringY += (targetY - ringY) * 0.22;
      ring.style.transform = 'translate(' + ringX + 'px,' + ringY + 'px)';
      requestAnimationFrame(tick);
    })();

    var interactiveSelector = 'a, button, .card, input, textarea';
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest(interactiveSelector)) ring.classList.add('is-active');
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest(interactiveSelector)) ring.classList.remove('is-active');
    });

    var gridSections = document.querySelectorAll('.hero, .page-intro');
    gridSections.forEach(function (section) {
      section.addEventListener('mousemove', function (e) {
        var rect = section.getBoundingClientRect();
        var offsetX = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
        var offsetY = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
        section.style.setProperty('--grid-x', offsetX.toFixed(1) + 'px');
        section.style.setProperty('--grid-y', offsetY.toFixed(1) + 'px');
      });
      section.addEventListener('mouseleave', function () {
        section.style.setProperty('--grid-x', '0px');
        section.style.setProperty('--grid-y', '0px');
      });
    });
  }
})();
