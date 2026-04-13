/* ═══════════════════════════════════════════════════════════
   ARIJIT DEY — main.js  v4
═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  var isMouse = window.matchMedia('(hover: hover)').matches;

  /* ── CURSOR ────────────────────────────────────────────── */
  var dot  = document.getElementById('cur');
  var ring = document.getElementById('cur-r');
  var mx = 0, my = 0, rx = 0, ry = 0;

  if (dot && ring && isMouse) {
    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    });
    (function ringLoop() {
      rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(ringLoop);
    }());
    document.querySelectorAll('a, button, .exp-item, .proj-tab, .work-cell, .cred-cell, .stat').forEach(function (el) {
      el.addEventListener('mouseenter', function () { ring.classList.add('big'); });
      el.addEventListener('mouseleave', function () { ring.classList.remove('big'); });
    });
  }

  /* ── TRAIL ─────────────────────────────────────────────── */
  if (isMouse) {
    var TRAIL = 14, tDots = [], tPos = [];
    for (var i = 0; i < TRAIL; i++) {
      var d = document.createElement('div');
      d.className = 'tr'; d.style.opacity = '0';
      document.body.appendChild(d); tDots.push(d);
    }
    document.addEventListener('mousemove', function (e) {
      tPos.unshift({ x: e.clientX, y: e.clientY });
      if (tPos.length > TRAIL * 4) tPos.length = TRAIL * 4;
    });
    (function trailLoop() {
      tDots.forEach(function (d, i) {
        var p = tPos[i * 3];
        if (p) {
          d.style.left = p.x + 'px'; d.style.top = p.y + 'px';
          d.style.opacity = String((1 - i / TRAIL) * 0.18);
          var s = Math.max(0.5, 2.4 - i * 0.1);
          d.style.width = s + 'px'; d.style.height = s + 'px';
        } else { d.style.opacity = '0'; }
      });
      requestAnimationFrame(trailLoop);
    }());
  }

  /* ── SCROLL PROGRESS ───────────────────────────────────── */
  var barFill = document.getElementById('bar-fill');
  window.addEventListener('scroll', function () {
    var total = document.documentElement.scrollHeight - window.innerHeight;
    if (barFill && total > 0) barFill.style.width = (window.scrollY / total * 100) + '%';
  }, { passive: true });

  /* ── SIDEBAR ACTIVE NAV ────────────────────────────────── */
  var sbLinks = document.querySelectorAll('.sb-nav a');
  var secs    = document.querySelectorAll('section[id]');

  new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        var id = e.target.id;
        sbLinks.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.25, rootMargin: '0px 0px -40% 0px' }).observe
    && secs.forEach(function (s) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            var id = e.target.id;
            sbLinks.forEach(function (a) {
              a.classList.toggle('active', a.getAttribute('href') === '#' + id);
            });
          }
        });
      }, { threshold: 0.25, rootMargin: '0px 0px -40% 0px' }).observe(s);
    });

  /* ── EXPERIENCE TABS (horizontal strip) ───────────────── */
  var expTabs    = document.getElementById('expTabs');
  var expPanels  = document.querySelectorAll('.exp-panel');

  function activateExpPanel(key) {
    if (!expTabs) return;
    expTabs.querySelectorAll('.exp-tab').forEach(function (t) { t.classList.remove('active'); });
    var tab = expTabs.querySelector('[data-exp="' + key + '"]');
    if (tab) tab.classList.add('active');

    expPanels.forEach(function (p) {
      p.classList.remove('active', 'visible'); p.style.display = 'none';
    });
    var panel = document.getElementById('ep-' + key);
    if (panel) {
      panel.style.display = 'block'; panel.classList.add('active');
      void panel.offsetWidth; panel.classList.add('visible');
    }
  }

  if (expTabs) {
    expTabs.addEventListener('click', function (e) {
      var node = e.target;
      while (node && node !== expTabs) {
        if (node.classList && node.classList.contains('exp-tab')) {
          activateExpPanel(node.getAttribute('data-exp')); return;
        }
        node = node.parentElement;
      }
    });
    expTabs.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var node = e.target;
      while (node && node !== expTabs) {
        if (node.classList && node.classList.contains('exp-tab')) {
          e.preventDefault(); activateExpPanel(node.getAttribute('data-exp')); return;
        }
        node = node.parentElement;
      }
    });
  }

  /* ── PROJECT TABS (horizontal strip) ──────────────────── */
  var projTabs   = document.getElementById('projTabs');
  var projPanels = document.querySelectorAll('.proj-panel');

  function activateProjPanel(key) {
    projTabs.querySelectorAll('.proj-tab').forEach(function (t) { t.classList.remove('active'); });
    var tab = projTabs.querySelector('[data-proj="' + key + '"]');
    if (tab) tab.classList.add('active');

    projPanels.forEach(function (p) {
      p.classList.remove('active', 'visible'); p.style.display = 'none';
    });
    var panel = document.getElementById('pp-' + key);
    if (panel) {
      panel.style.display = 'block'; panel.classList.add('active');
      void panel.offsetWidth; panel.classList.add('visible');
    }
  }

  if (projTabs) {
    projTabs.addEventListener('click', function (e) {
      var node = e.target;
      while (node && node !== projTabs) {
        if (node.classList && node.classList.contains('proj-tab')) {
          activateProjPanel(node.getAttribute('data-proj')); return;
        }
        node = node.parentElement;
      }
    });
    projTabs.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var node = e.target;
      while (node && node !== projTabs) {
        if (node.classList && node.classList.contains('proj-tab')) {
          e.preventDefault(); activateProjPanel(node.getAttribute('data-proj')); return;
        }
        node = node.parentElement;
      }
    });
  }

});
