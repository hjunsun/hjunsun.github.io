(() => {
  const portrait = document.querySelector('[data-swap-src]');
  if (!portrait) return;
  const handle = portrait.querySelector('.face-drag');
  const status = portrait.querySelector('.swap-status');
  let drag = null;
  let swapped = false;
  let loading = false;
  let swapImage;
  async function toggle() {
    if (loading) return;
    if (!swapImage) {
      loading = true;
      status.textContent = 'Loading surprise…';
      const candidate = new Image();
      candidate.className = 'portrait-swapped';
      candidate.alt = '';
      candidate.draggable = false;
      candidate.src = portrait.dataset.swapSrc;
      try {
        await candidate.decode();
        portrait.insertBefore(candidate, handle);
        swapImage = candidate;
      } catch {
        status.textContent = 'Could not load the surprise. Try again.';
        return;
      } finally { loading = false; }
    }
    swapped = !swapped;
    portrait.classList.toggle('is-swapped', swapped);
    handle.setAttribute('aria-pressed', String(swapped));
    status.textContent = swapped ? 'Faces swapped! Drag again to restore.' : 'Original photo restored.';
  }
  handle.addEventListener('pointerdown', (event) => {
    if (!event.isPrimary || event.button !== 0) return;
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY };
    handle.setPointerCapture(event.pointerId);
    portrait.classList.add('is-dragging');
  });
  handle.addEventListener('pointermove', (event) => {
    if (!drag || drag.id !== event.pointerId) return;
    handle.style.transform = `translate(${event.clientX - drag.x}px, ${event.clientY - drag.y}px)`;
  });
  function clearDrag() {
    drag = null;
    handle.style.transform = '';
    portrait.classList.remove('is-dragging');
  }
  handle.addEventListener('pointerup', (event) => {
    if (!drag || drag.id !== event.pointerId) return;
    const bounds = portrait.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    const moved = Math.hypot(event.clientX - drag.x, event.clientY - drag.y) > 10;
    clearDrag();
    if (moved && x > .32 && x < .62 && y > .51 && y < .79) toggle();
  });
  handle.addEventListener('pointercancel', clearDrag);
  handle.addEventListener('lostpointercapture', clearDrag);
  // Native keyboard/assistive clicks have detail 0; mouse clicks require a drag.
  handle.addEventListener('click', (event) => { if (event.detail === 0) toggle(); });
  handle.addEventListener('keydown', (event) => { if (event.key === 'Escape') clearDrag(); });
})();
