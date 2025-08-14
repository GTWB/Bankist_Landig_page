'use strict';
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const navLink = document.querySelectorAll('.nav__link');
const containerNavLinks = document.querySelector('.nav__links');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const sections = document.querySelectorAll('.section');
const images = document.querySelectorAll('img[data-src]');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//IMPLEMENTING SMOOTH SCROLLING

btnScrollTo.addEventListener('click', () => {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//IMPLEMENTING PAGE NAVIGATION

// navLink.forEach(navEl => {
//   navEl.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = navEl.getAttribute('href');
//     const section = document.querySelector(id);
//     section.scrollIntoView({ behavior: 'smooth' });
//   });
// });

//Event Delegation
//1. Add event listener to common parent element
containerNavLinks.addEventListener('click', function (e) {
  e.preventDefault();
  //2. Determine what element originated the event

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// IMPLEMENTING TAB COMPONENT

//Add Listener with event delegation
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  //Guard Clause
  if (!clicked) return;

  //Remove active classes
  tabs.forEach(el => el.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //Activate Tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.getAttribute('data-tab')}`)
    .classList.add('operations__content--active');
});

// MENU FADE ANIMATION
nav.addEventListener('mouseover', function (e) {
  const linkTarget = e.target;
  const navSiblings = linkTarget.closest('nav').querySelectorAll('.nav__link');
  navSiblings.forEach(el => {
    if (el !== linkTarget) {
      el.style.opacity = '0.5';
    }
  });
});

nav.addEventListener('mouseout', function (e) {
  const linkTarget = e.target;
  const navSiblings = linkTarget.closest('nav').querySelectorAll('.nav__link');
  navSiblings.forEach(el => {
    if (el !== linkTarget) {
      el.style.opacity = '1';
    }
  });
});

//STICKY NAVBAR
//Best Way -> intersection observer API

//Callback FN
const stickyNav = function (entries) {
  // console.log(entries[0].isIntersecting);
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
    nav.style.opacity = '0.8';
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, { threshold: 0 });
headerObserver.observe(header);

//REVEALING SECTIONS ON SCROLL
//CallBack FN
const elementsRevealOnScroll = function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.remove('section--hidden');
    }
  });
};
//Observer Element
const sectionObserver = new IntersectionObserver(elementsRevealOnScroll, {
  threshold: 0.15,
});
sections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

//LAZY LOADING IMAGES
const loadImg = function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      console.log(!entry.isIntersecting);
      return;
    }
    const dataSrcAttribute = entry.target.getAttribute('data-src');

    entry.target.setAttribute('src', dataSrcAttribute);
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });
    imgObserver.unobserve(entry.target);
  });
};

const imgObserver = new IntersectionObserver(loadImg, { threshold: 0.3 });

images.forEach(function (img) {
  imgObserver.observe(img);
});

//IMPLEMENT SLIDER

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      // BUG in v2: This way, we're not keeping track of the current slide when clicking on a slide
      // const { slide } = e.target.dataset;

      curSlide = Number(e.target.dataset.slide);
      goToSlide(curSlide);
      activateDot(curSlide);
    }
  });
};
slider();
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
//Selectinc Element from the DOM
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');

console.log(allSections);

document.getElementById('section--1');

const allButtons = document.getElementsByTagName('button');

console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

//CREATING ELEMENT INTO THE DOM

//.insertAdjantHTML
const cookieMessage = document.createElement('div');
cookieMessage.classList.add('cookie-message');

// cookieMessage.innerHTML =
//   'We use cookie for improve functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

cookieMessage.insertAdjacentHTML(
  'afterbegin',
  'We use cookie for improve functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>'
);

//INSERT ELEMENT INTO THE DOM

// header.prepend(cookieMessage); //First child of header
header.append(cookieMessage); //Last child of header

// header.append(cookieMessage.cloneNode(true)); //Duplicate element

// header.before(cookieMessage);
// header.after(cookieMessage);

//DELETE ELEMENTS
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', () => cookieMessage.remove());

//STYLES

cookieMessage.style.backgroundColor = '#37383D';
cookieMessage.style.width = '120%';

console.log(getComputedStyle(cookieMessage));
console.log(getComputedStyle(cookieMessage).width);

cookieMessage.style.height =
  Number.parseFloat(getComputedStyle(cookieMessage).height) + 40 + 'px';

//ARTTRIBUTES

const logo = document.querySelector('.nav__logo');
console.log(logo.id);
console.log(logo.src);
console.log(logo.alt);
console.log(logo.getAttribute('alt'));
logo.setAttribute('alt', 'Modified attribute');

//CLASSES
logo.classList.add();
logo.classList.remove();
logo.classList.toggle('c');
logo.classList.contains('c');

//EVENT PROPAGATION IN PRACTICE
//Random Color generator rgb
const getRandomInt = maxInt => Math.floor(Math.random() * maxInt);

const getRandomColor = () => {
  return `rgb(${getRandomInt(255)},${getRandomInt(255)},${getRandomInt(255)})`;
};

const featuresNavLink = document.querySelector('.nav__link');
const parentFeaturesNavLink = document.querySelector('.nav__links');

featuresNavLink.addEventListener('click', function (e) {
  this.style.backgroundColor = getRandomColor();
  console.log('LINK');
  console.log(e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  //Stop propagation
  //e.stopPropagation();
});
parentFeaturesNavLink.addEventListener('click', function (e) {
  this.style.backgroundColor = getRandomColor();
  console.log('CONTAINER');
  console.log(e.target, e.currentTarget);
  console.log(e.currentTarget === this);
});


//Going Down in the DOM Tree: Child

const h1 = document.querySelector('h1');

console.log(h1.children); //HTMLCollection
console.log(h1.childNodes); //NodeList

//Going UP in the DOM Tree: parents
console.log(h1.parentElement);
console.log(h1.parentNode);

h1.closest('.header').style.background = 'var(--gradient-secondary)';

//Going sideways: siblings
console.log(h1.nextElementSibling);
console.log(h1.previousElementSibling);
console.log(h1.nextSibling);
console.log(h1.previousSibling);
console.log(h1.parentElement.children);

const arrChildren = [...h1.parentElement.children];
arrChildren.forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////
