const navigation = document.querySelector('.main-nav');
const moreMenu = navigation.querySelector('.nav-more');
const sectionLinks = [...navigation.querySelectorAll('a')];
const sections = [...document.querySelectorAll('main > section[id]')];

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) moreMenu.open = false;
});
document.addEventListener('click', (event) => {
  if (!moreMenu.contains(event.target)) moreMenu.open = false;
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && moreMenu.open) {
    moreMenu.open = false;
    moreMenu.querySelector('summary').focus();
  }
});

let scheduled = false;
function updateSection() {
  scheduled = false;
  const boundary = document.querySelector('.site-header').getBoundingClientRect().bottom + 60;
  let current = null;
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= boundary) current = section.id;
  }
  for (const link of sectionLinks) {
    if (current && link.hash === `#${current}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
  moreMenu.classList.toggle('has-current', Boolean(moreMenu.querySelector('[aria-current]')));
}
function scheduleUpdate() {
  if (!scheduled) {
    scheduled = true;
    requestAnimationFrame(updateSection);
  }
}
window.addEventListener('scroll', scheduleUpdate, { passive: true });
window.addEventListener('resize', scheduleUpdate);
document.addEventListener('toggle', scheduleUpdate, true);
updateSection();
