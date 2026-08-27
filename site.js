(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  document.body.classList.add('anim');
  var ease = function (t) { return 1 - Math.pow(1 - t, 3); };
  function countUp(el) {
    var raw = el.getAttribute('data-num') || el.textContent;
    el.setAttribute('data-num', raw);
    var m = raw.match(/\d[\d,]*/);
    if (!m) { return; }
    var target = parseInt(m[0].replace(/,/g, ''), 10), grouped = m[0].indexOf(',') > -1;
    var pre = raw.slice(0, m.index), post = raw.slice(m.index + m[0].length);
    var dur = 900, t0 = null;
    function fmt(n) { return grouped ? n.toLocaleString('en-US') : String(n); }
    function step(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      el.textContent = pre + fmt(Math.round(target * ease(p))) + post;
      if (p < 1) requestAnimationFrame(step); else el.textContent = raw;
    }
    el.textContent = pre + fmt(0) + post;
    requestAnimationFrame(step);
  }
  function stagger(nodes, ms) {
    nodes.forEach(function (n, i) { n.style.transitionDelay = (i * ms) + 'ms'; });
  }
  var groups = [];
  document.querySelectorAll('.head-fig').forEach(function (el) {
    groups.push({ el: el, run: function () { countUp(el.querySelector('b')); } });
  });
  var cmp = document.querySelector('.cmp');
  if (cmp) {
    stagger(Array.prototype.slice.call(cmp.querySelectorAll('tbody i')), 45);
    groups.push({ el: cmp, run: function () {} });
  }
  var sla = document.querySelector('.sla-grid');
  if (sla) {
    var tiers = Array.prototype.slice.call(sla.querySelectorAll('.sla-tier'));
    stagger(tiers, 110);
    groups.push({ el: sla, run: function () {
      tiers.forEach(function (tr, i) { setTimeout(function () { countUp(tr.querySelector('b')); }, 110 * i); });
    } });
  }
  var first = document.querySelector('.sla-first');
  if (first) groups.push({ el: first, run: function () { } });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      var g = groups.filter(function (x) { return x.el === en.target; })[0];
      if (g) g.run();
      io.unobserve(en.target);
    });
  }, { threshold: 0.35, rootMargin: '0px 0px -8% 0px' });
  groups.forEach(function (g) { io.observe(g.el); });
})();
