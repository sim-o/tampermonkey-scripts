// ==UserScript==
// @name     Gitlab Auto Scrollerstatus
// @namespace simon.kerle@corelogic.com.au/GitlabAutoScroller
// @version  1
// @grant    none
// @include  http://gitlab.*/*/-/jobs/*
// @include  https://gitlab.*/*/-/jobs/*
// ==/UserScript==

function scroller() {
  let scrollY = window.scrollY,
      cancelled = false;
  
  function animate() {
    running = true;
    requestAnimationFrame(() => {
      if (cancelled) {
        running = false;
        return;
      }
      
      window.scrollTo(0, window.scrollMaxY);
      scrollY = window.scrollY;
      animate();
    });
  }
  animate();
  
  window.addEventListener('scroll', (e) => {
    if (e.pageY < scrollY) {
      cancelled = true;
    } else {
      cancelled = false;
      animate();
    }
  });
}

window.eval(`${uneval(scroller)}; scroller();`);
