import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

window.Webflow ||= [];
window.Webflow.push(() => {
  // eslint-disable-next-line no-console
  console.log('działa');

  gsap.from('.gallery_image-wrapper', {
    opacity: 0,
    y: 70,
    duration: 1,
    stagger: 0.3,
    scrollTrigger: {
      trigger: '.gallery_grid-wrapper',
      start: 'top 50%',
      end: 'bottom 70%',
      markers: true,
    },
  });
});

//kreseczka na hover w nav w js - różne animacje na hover in i hover out
const navItems = document.querySelectorAll('.nav__menu-item');
navItems.forEach(function (item, index) {
  item.addEventListener('mouseenter', function () {
    gsap.fromTo(item.querySelector('.nav__line'), { x: '-110%' }, { x: '0%', ease: 'power2.out' });
    gsap.to(item.querySelector('.nav__link-block'), { color: '#1e2528' });
  });
  item.addEventListener('mouseleave', function () {
    gsap.to(item.querySelector('.nav__line'), { x: '110%' });
    gsap.to(item.querySelector('.nav__link-block'), { color: '#6c6c6f' });
  });
});

//dropdown w nawigacji
const navDrops = document.querySelectorAll('.nav__menu-item.has-dropdown');
navDrops.forEach(function (item, index) {
  const dropTl = gsap.timeline({ paused: true });
  dropTl
    .set(item.querySelector('.nav__dropdown'), { display: 'block' })
    .from(item.querySelector('.nav__dropdown'), {
      opacity: 0,
      scale: 0.8,
      transformOrigin: 'top center',
      duration: 0.8,
    })
    .to(item.querySelector('.drop-arrow'), { rotate: -180, duration: 0.3 }, '<')
    .from(
      item.querySelectorAll('.nav__dropdown-text'),
      {
        y: 40,
        opacity: 0,
        rotate: 30,
        stagger: 0.3,
      },
      '>-0.5'
    );

  item.addEventListener('mouseenter', () => dropTl.restart());
  item.addEventListener('mouseleave', () => dropTl.reverse());
});
//dropdown w nawigacji - hover state linków w dropdownie
const links = document.querySelectorAll('.nav__dropdown-text');
links.forEach(function (item, index) {
  item.addEventListener('mouseenter', function () {
    gsap.to(item, { color: 'black' });
  });
  item.addEventListener('mouseleave', function () {
    gsap.to(item, { color: '#6c6c6f' });
  });
});

//buttony na hover - kulka rośnie, tekst się odsuwa
const menuItems = document.querySelectorAll('.menu__item');
menuItems.forEach(function (item, index) {
  const tl = gsap
    .timeline({ defaults: { duration: 0.4 }, paused: true })
    .to(item.querySelector('.menu__item-circle'), {
      scale: 1.4,
      backgroundColor: '#ff817e',
    })
    .to(
      item.querySelector('.menu__item-text'),
      { color: 'black', x: 10, scale: 1.3, transformOrigin: 'left center' },
      '<'
    );

  item.addEventListener('mouseenter', () => tl.play());
  item.addEventListener('mouseleave', () => tl.reverse());
});

// button pink
const button = document.querySelector('.button-text_wrapper') as HTMLButtonElement;
const buttonAnimation = gsap
  .timeline({ defaults: { duration: 0.4 }, paused: true })
  .to('.button-text', { color: '#ff817e', duration: 0.1, ease: 'linear' })
  .to('.button-text', { fontWeight: 'bold', x: 5 }, '<')
  .to('.button-text_play-icon', { scale: 1.1, border: '1px solid #ff817e' }, '<');
button.addEventListener('mouseenter', () => buttonAnimation.play());
button.addEventListener('mouseleave', () => buttonAnimation.reverse());

//button pulsujący na hover
const butRound = document.querySelector('.button-round') as HTMLButtonElement;

const pulseTween = gsap.to(butRound, {
  scale: 1,
  repeat: -1,
  yoyo: true,
  paused: true,
});

butRound.addEventListener('mouseenter', function () {
  pulseTween.restart();
});
butRound.addEventListener('mouseleave', function () {
  pulseTween.pause();
  gsap.to(butRound, { scale: 0.8 });
});

//header animation
const headerTl = gsap.timeline({
  paused: true,
  defaults: { opacity: 0, ease: 'back' },
});
headerTl
  .from('.page-wrapper', { ease: 'linear' })
  .from('#head1', { x: 80, duration: 1 })
  .from('#head2', { x: -80, duration: 1 }, '<')
  .from('#para', { y: 40 }, '-=0.5')
  .from('.header_buttons', { y: 60 }, '-=0.3')
  .from('.flower-small', { scale: 0, stagger: 0.1 }, '-=0.4');

//loader
function updateProgress() {
  const progress = Math.round(this.progress() * 100);
  $('.loader_number').text(progress);
}

const loader = gsap.timeline({
  onComplete: () => {
    headerTl.restart();
  },
});
loader
  .set('.loader', { display: 'flex' })
  .to('.loader_bar', {
    width: '100vw',
    duration: 2,
    ease: 'power3.Out',
    onUpdate: updateProgress,
  })
  .to('.loader_bar', { opacity: 0, duration: 0.2, delay: 0.3 })
  .to('.loader_top', { yPercent: -100, ease: 'power2.in' }, '<')
  .to('.loader_bottom', { yPercent: 100, ease: 'power2.in' }, '<')
  .set('.loader', { display: 'none' });

//text typewriting - showing and disappearing
gsap.to('.type-in', {
  text: '- try it out!!!',
  duration: 1.8,
  ease: 'power1.in',
  repeat: -1,
  repeatDelay: 1,
  yoyo: true,
});

//word typewriting with object for special properties
gsap.to('.word-in', {
  text: { value: 'you will be inspired!', delimiter: ' ' },
  duration: 1.8,
  ease: 'power2.in',
  repeat: -1,
  repeatDelay: 1,
  yoyo: true,
});
