/* Shared web/HyperFrames score: a masked headline reveal and sequenced rigid-block assembly. */
(function () {
  window.createGroundText = function (root) {
    const tl=gsap.timeline({paused:true});
    const words=root.querySelectorAll('[data-title-reveal]');
    if(words.length)tl.fromTo(words,{yPercent:108,opacity:0},
      {yPercent:0,opacity:1,duration:1.1,stagger:.16,ease:'power3.out'},.12);
    return tl;
  };
  window.createGroundScore = function (root) {
    const q = selector => root.querySelectorAll(selector);
    const tl = gsap.timeline({paused:true});
    tl.add(window.createGroundText(root).paused(false),0);
    // Each rigid piece first aligns horizontally, then seats vertically.
    // The floor shadows follow its horizontal position and tighten on contact.
    const pieces = [
      {name:'arch', x:-10, y:-5, shadowX:-13, align:.12, land:.72, drop:.28, lift:3.95, out:4.25, return:6.4, seat:6.95},
      {name:'slab', x:22, y:-24, shadowX:42, align:.55, land:1.2, drop:.36, lift:3.65, out:4.05, return:6.65, seat:7.25},
      {name:'orb', x:-20, y:-35, shadowX:-27, align:1.05, land:1.65, drop:.34, lift:3.35, out:3.8, return:7.05, seat:7.7}
    ];
    for (const p of pieces) {
      const block=q('.sculpture-'+p.name), shadow=q('.shadow-'+p.name);
      tl.fromTo(block,{xPercent:p.x},{xPercent:0,duration:.6,ease:'power3.inOut'},p.align);
      tl.fromTo(block,{yPercent:p.y},{yPercent:0,duration:p.drop,ease:'power2.in'},p.land);
      if(shadow.length){
        tl.fromTo(shadow,{xPercent:p.shadowX},{xPercent:0,duration:.6,ease:'power3.inOut'},p.align);
        tl.fromTo(shadow,{scale:1.25,opacity:.22},{scale:1,opacity:1,duration:p.drop,ease:'power2.in'},p.land);
      }
      // Reverse order unlocks the composition: drum, slab, then arch.
      tl.to(block,{yPercent:p.y,duration:.4,ease:'power2.inOut'},p.lift);
      tl.to(block,{xPercent:p.x,duration:.5,ease:'power3.inOut'},p.out);
      if(shadow.length){
        tl.to(shadow,{scale:1.25,opacity:.22,duration:.4,ease:'power2.inOut'},p.lift);
        tl.to(shadow,{xPercent:p.shadowX,duration:.5,ease:'power3.inOut'},p.out);
      }
      tl.to(block,{xPercent:0,duration:.6,ease:'power3.inOut'},p.return);
      tl.to(block,{yPercent:0,duration:p.drop,ease:'power2.in'},p.seat);
      if(shadow.length){
        tl.to(shadow,{xPercent:0,duration:.6,ease:'power3.inOut'},p.return);
        tl.to(shadow,{scale:1,opacity:1,duration:p.drop,ease:'power2.in'},p.seat);
      }
    }
    tl.fromTo(q('.stage-line'),{scaleX:.92,opacity:.4},{scaleX:1,opacity:1,duration:1.8,ease:'power2.out'},.3);
    tl.addLabel('together',2.3);
    tl.addLabel('apart',4.9);
    tl.addLabel('assembled',8.2);
    tl.to({}, {duration:1.8},8.2);
    return tl;
  };
})();
