(function () {
  const TOPICS = ['ai', 'teams'];
  const noteLabel = count => `${count} ${count === 1 ? 'note' : 'notes'}`;
  const topicFromUrl = () => {
    const topic = new URLSearchParams(location.search).get('topic');
    return TOPICS.includes(topic) ? topic : 'all';
  };

  function mount(scope, options = {}) {
    const abort = new AbortController();
    const listen = (el, event, fn) => el?.addEventListener(event, fn, {signal: abort.signal});
    const filters = scope.querySelector('[data-writing-filters]');
    const notes = [...scope.querySelectorAll('[data-note]')];
    const buttons = [...scope.querySelectorAll('[data-filter]')];
    const count = scope.querySelector('[data-writing-count]');
    const empty = scope.querySelector('[data-writing-empty]');
    if (filters) filters.hidden = false;
    const applyFilter = (topic, {push = false} = {}) => {
      const value = TOPICS.includes(topic) ? topic : 'all';
      notes.forEach(note => { note.hidden = value !== 'all' && !(note.dataset.topic || '').split(' ').includes(value); });
      buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === value)));
      if (count) count.textContent = noteLabel(notes.filter(n => !n.hidden).length);
      if (empty) empty.hidden = notes.some(n => !n.hidden);
      if (push) {
        const url = new URL(location.href);
        if (value === 'all') url.searchParams.delete('topic');
        else url.searchParams.set('topic', value);
        history.replaceState(history.state, '', url.toString());
      }
      window.ScrollTrigger?.refresh();
    };
    buttons.forEach(button => listen(button, 'click', () => applyFilter(button.dataset.filter, {push: true})));
    applyFilter(topicFromUrl());
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
      // Keep the DOM aligned with the URL so bfcache restore already shows the right filter.
      applyFilter(topicFromUrl());
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
