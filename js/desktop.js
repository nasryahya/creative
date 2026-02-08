/* Desktop extras: subtle parallax on hero + smoother hover focus */
(() => {
  const heroImg = document.querySelector(".hero-img");
  if (!heroImg) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    const offset = Math.min(18, y * 0.03);
    heroImg.style.transform = `scale(1.03) translateY(${offset}px)`;
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
})();