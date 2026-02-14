/* Mobile extras: header auto-hide + improve tap targets */
(() => {
  const header = document.getElementById("header");
  if (!header) return;

  let lastY = window.scrollY;
  let ticking = false;

  const onScroll = () => {
    const y = window.scrollY;
    const down = y > lastY;
    const delta = Math.abs(y - lastY);

    // only react after a small movement
    if (delta > 10) {
      header.style.transform = down && y > 120 ? "translateY(-110%)" : "translateY(0)";
    }
    lastY = y;
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
})();
