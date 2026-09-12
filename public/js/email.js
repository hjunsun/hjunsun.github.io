document.querySelectorAll('[data-copy-email]').forEach((button) => {
  let resetStatus;
  button.addEventListener('click', async () => {
    const status = button.parentElement.querySelector('.copy-status');
    clearTimeout(resetStatus);
    try {
      await navigator.clipboard.writeText(button.dataset.copyEmail);
      status.textContent = 'Copied';
    } catch {
      status.textContent = 'Could not copy. Select the address to copy manually.';
    }
    resetStatus = setTimeout(() => { status.textContent = ''; }, 5000);
  });
});
