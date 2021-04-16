const menu = {
  burger: document.querySelector('.burger '),
  mainMenu: document.querySelector('.header__navigation-block'),

  menuToggle() {
    this.burger.classList.toggle('burger--active');
    this.mainMenu.classList.toggle('active');
  }
}

const dropDown = {
  items: document.querySelectorAll(".dropdown-toggle"),

  toggleAccordion(target) {
    const itemToggle = target.getAttribute('aria-expanded');
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].setAttribute('aria-expanded', 'false');
    }
    if (itemToggle == 'false') {
      target.setAttribute('aria-expanded', 'true');
    }
  }
}

const modal = {
  popup: document.querySelector('.modal__wrapper'),
  openBtn: document.querySelector('.header__buttons .btn-empty'),
  closeBtn: document.querySelector('.modal__close'),

  openPopup() {
    this.popup.classList.add('modal__wrapper--open');
  },

  closePopup() {
    this.popup.classList.remove('modal__wrapper--open');
  }
}


const steps = {
  step: document.querySelectorAll('.steps__progressbar-item'),
  stepSlide: document.querySelectorAll('.steps__slider-item'),

  toggleStep(target) {
    let idx = Array.from(this.step).indexOf(target);
    this.step.forEach((el, i) => {
      if (i <= idx) {
        this.step[i].classList.add('active');
      } else {
        this.step[i].classList.remove('active');
      }
    })
    return idx;
  },

  toggleSlide(target) {
    let position = this.toggleStep(target);
    this.stepSlide.forEach((el, i) => {
      el.classList.remove('steps__slider-item--active');
      if (position == i) {
        el.classList.add('steps__slider-item--active');
      }
    })
    console.log('pracye kurwa!')
  }
}


// All click events
window.addEventListener('click', function (evt) {
  let target = evt.target;
  let classes = target.classList;
  if (target == menu.burger || target.parentNode == menu.burger) {
    menu.menuToggle();
  }

  if (classes.contains('dropdown-toggle')) {
    dropDown.toggleAccordion(target);
  }

  if (classes.contains('sign-up-btn')) {
    modal.openPopup();
  }

  if (classes.contains('modal__close')) {
    modal.closePopup(target);
  }

  if (target.parentNode.classList.contains('calc__param-quantity')) {
    calculatorCounter.changeCounterValue(target);
  }

  if (classes.contains('steps__progressbar-item')) {
    steps.toggleSlide(target);
  }

});


// Star rating
function createRating() {

  const rate = document.querySelector('.footer__rating');
  let val = parseFloat(rate.textContent);
  let html = "";

  for (let i = 0; i < parseInt(val); i++) {
    html += "<i class='footer__star fa fa-star'></i>";
  }
  if (val != parseInt(val)) {
    html += "<i class='footer__star fa fa-star-half-o half'></i>";
  }
  for (let i = Math.ceil(val); i < 5; i++) {
    html += "<i class='footer__star fa fa-star-o'></i>";
  }
  // console.log(html);
  rate.innerHTML = html;
}
createRating();


// Calendar
(function () {
  const picker = MCDatepicker.create({
    el: '#datepicker',
    bodyType: 'inline',
    dateFormat: 'dd mmmm yyyy',
    selectedDate: new Date(),
    customClearBTN: ''
  });

  let date = new Date();
  let year = date.getFullYear()
  let month = date.toLocaleString('en-US', {
    month: 'long'
  });
  let day = date.getDate();

  document.querySelector('#datepicker').setAttribute('placeholder', `${day} ${month} ${year}`);
}());

// 
const calculatorCounter = {
  counter: document.querySelector('.calc__param-quantity'),
  counterInput: document.querySelector('.result'),

  changeCounterValue(target) {
    target.id == 'minus' ? this.counterInput.stepDown(1) : target.id == 'plus' ? this.counterInput.stepUp(1) : '';
  }
};


const calculator = document.querySelector('.calc__block')
calculator.addEventListener('submit', (event) => {
  event.preventDefault();

  let result = {
    color: calculator.querySelector('.calc__param-colors').value,
    size: calculator.querySelector('.calc__param-sizes').value,
    count: calculator.querySelector('.result').value,
    date: calculator.querySelector('#datepicker').value,
    city: calculator.querySelector('.calc__param-city').value,
    delivery: calculator.querySelector('.calc__param-delivery').value,
  }

  console.table(result);
})

// Slider Review
var reviews = new Swiper('.reviews__slider', {
  spaceBetween: 20,
  centeredSlides: true,
  loop: true,
  slidesPerView: 1,
  centeredSlides: true,
  breakpoints: {
    480: {
      slidesPerView: 3,
    },
    900: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

const tabs = document.querySelectorAll('.tabs');    
function slideContent(tab) {
  let title = tab.querySelectorAll('.tabs__link')
  let text = tab.querySelectorAll('.tabs__content-text')

  tab.addEventListener('click', event => {
    event.preventDefault();
    let target = event.target;
    let idx = Array.from(title).indexOf(target);
    if (target.classList.contains('tabs__link')) {
      title.forEach((element, i) => {
        element.classList.remove('tabs__link--active');
        target.classList.add('tabs__link--active');
        text[i].classList.remove('tabs__content-text--active');
        if (idx == i) {
          text[i].classList.add('tabs__content-text--active');
        }
      })
    }
  })
}

tabs.forEach(element => slideContent(element))