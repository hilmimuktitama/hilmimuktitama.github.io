(function () {
  function mount(scope, options = {}) {
    const abort = new AbortController();
    const listen = (el, event, fn) => el?.addEventListener(event, fn, {signal: abort.signal});
    const filters = scope.querySelector('[data-writing-filters]');
    const notes = [...scope.querySelectorAll('[data-note]')];
    const buttons = [...scope.querySelectorAll('[data-filter]')];
    if (filters) filters.hidden = false;
    buttons.forEach(button => listen(button, 'click', () => {
      const topic = button.dataset.filter;
      notes.forEach(note => { note.hidden = topic !== 'all' && !note.dataset.topic.split(' ').includes(topic); });
      buttons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      scope.querySelector('[data-writing-count]').textContent = notes.filter(n => !n.hidden).length + ' notes';
      window.ScrollTrigger?.refresh();
    }));
    const stage = scope.querySelector('[data-ground-stage]');
    if (!stage || !window.gsap || !window.createGroundScore) return {cleanup: () => abort.abort()};
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let score, intro, started = false, visible = false, disposed = false;
    let autoplay = options.motion !== false && !preference.matches;
    const context = gsap.context(() => { score = window.createGroundScore(scope); }, scope);
    const finishIntro = () => { intro?.progress(1).kill(); intro = undefined; };
    score.progress(1).pause();
    score.eventCallback('onComplete', () => { autoplay = false; });
    const syncPlayback = () => {
      if (!autoplay) return;
      if (visible && !document.hidden) {
        if (!started) { finishIntro(); started = true; score.restart(); }
        else score.play();
      } else score.pause();
    };
    const settle = () => { autoplay = false; finishIntro(); score.pause().progress(1); };
    listen(preference, 'change', settle);
    listen(document, 'visibilitychange', syncPlayback);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    }, {threshold: 0});
    observer.observe(stage);
    const media = gsap.matchMedia();
    if (options.motion !== false) media.add('(prefers-reduced-motion: no-preference)', () => {
      if (window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
        gsap.utils.toArray('.chapter-heading h2,.about-copy h2', scope).forEach(el =>
          gsap.fromTo(el, {y: 30}, {y: 0, duration: .9, ease: 'power3.out', scrollTrigger: {trigger: el, start: 'top 92%', once: true}}));
      }
      intro = window.createGroundText(scope).play(0);
      return () => { intro?.revert(); intro = undefined; };
    }, scope);
    listen(document, 'keydown', event => { if (event.key === 'Tab') { settle(); media.revert(); } });
    const cleanup = () => {
      if (disposed) return;
      disposed = true;
      autoplay = false;
      finishIntro(); observer.disconnect(); media.revert(); context.revert(); abort.abort();
      if (filters) filters.hidden = true;
      notes.forEach(note => { note.hidden = false; });
      buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === 'all')));
      const count = scope.querySelector('[data-writing-count]');
      if (count) count.textContent = notes.length + ' notes';
    };
    listen(window, 'pagehide', cleanup);
    return {cleanup, score};
  }
  const scope = document.querySelector('.ground-home');
  if (scope) {
    window.__commonGround?.cleanup();
    window.__commonGround = mount(scope);
    window.addEventListener('pageshow', event => {
      if (event.persisted) {
        window.__commonGround?.cleanup();
        window.__commonGround = mount(scope, {motion: false});
      }
    });
  }
})();
