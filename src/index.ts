import { gsap } from 'gsap';

window.Webflow ||= [];
window.Webflow.push(() => {
  // eslint-disable-next-line no-console
  console.log('działa');

  gsap.to('.gallery_image-wrapper', {
    opacity: 1,
    y: 60,
    duration: 1,
    stagger: 0.3,
    delay: 3,
  });
});
