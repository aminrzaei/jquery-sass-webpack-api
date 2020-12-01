import './scss/style.scss';

import { digiSuggest } from './API/digikala';
import { randomDogs } from './API/dogs';
import { countriesList } from './API/countries';

// Handle underline Navbar movment
$('.navbar__heading').hover(
  function (e) {
    const heading = e.target.closest('.navbar__heading');
    $('.navbar__underline').css({
      width: `${heading.clientWidth}`,
      left: `${heading.offsetLeft}px`,
      transform: 'scaleX(1)',
    });
  },
  function () {
    $('.navbar__underline').css({
      transform: 'scaleX(0)',
    });
  }
);

// Open & close contant me
$('.bottom-nav__icon , .bottom-nav__contact-me').click(function (e) {
  $('.drawer').addClass('drawer--open');
});
$('.drawer__closer').click(function (e) {
  $('.drawer').removeClass('drawer--open');
});

// showing spesefic content acording to tab element clicked
$('.navbar__item').click(function () {
  const label = $(this).data('label');
  $('.navbar__item').not(this).css('color', 'initial');
  $(this).css('color', '#6b11c0');
  $('.container__item').css('display', 'none');
  $(`.js-${label}`).css('display', 'flex');
});

// Handle digikala serach
(() => {
  let lagger = null;

  $('.bottom-nav__input').on('change paste keyup', function () {
    clearTimeout(lagger);
    // Use debounce ffunctionality to avoid extra requests
    lagger = setTimeout(async () => {
      const result = await digiSuggest($(this).val());
      const searches = result.data.search_result;
      $('.bottom-nav__search-result').empty();
      for (let search of searches) {
        $('.bottom-nav__search-result').append(
          `<div class="bottom-nav__search-item"><a href="https://digikala.com${search.url}" target="_blank" title="${search.category_name}">${search.category_name} در <strong>${search.label}</strong></a></div>`
        );
      }
    }, 500);
  });
})();

// Handle load images by click on nav item with label gallery
(() => {
  let gallaryNavClicked = false;
  $(".navbar__item[data-label='gallery']").click(function () {
    if (!gallaryNavClicked) {
      addImagesToDom();
      gallaryNavClicked = true;
    }
    return;
  });
})();

// Add image to dom after fetching
const addImagesToDom = async () => {
  const imageContainer = $('.gallery__container');
  $('.main').append(`<i class='bx-flashing loading'>در حال بارگذاری ...</i>`);

  const result = await randomDogs();
  const images = result.message;
  for (let image of images) {
    imageContainer.append(
      `<img src="${image}" class="gallery__container__image"/>`
    );
  }
  setTimeout(() => {
    $('.loading').remove();
  }, 2000);
  // Add intersection observer
  intersectionDetector();
};

// Detecting intesection with last image
const intersectionDetector = () => {
  let observerConfig = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  };

  const observerFn = (entries, observer) => {
    if (entries[0].isIntersecting) {
      addImagesToDom();
      observer.disconnect();
    }
  };
  let observer = new IntersectionObserver(observerFn, observerConfig);
  let imgs = document.querySelectorAll('.gallery__container__image');
  observer.observe(imgs[imgs.length - 1]);
};

$(".navbar__item[data-label='form']").click(function () {
  $(".form-section__input[name='firstname']").focus();
});

$('.form-section__input').change(function (e) {
  const inputName = e.target.attributes.name.value;
  const inputValue = e.target.value;
  formValidation(inputName, inputValue);
});

$('.form-submit').click(() => {
  let error = false;
  let data = {};
  $('.form-section__input').each(function (idx) {
    const name = $(this).attr('name');
    const value = $(this).val();
    data = { ...data, ...{ [name]: value } };
    error = formValidation(name, value);
  });
  if (!error) {
    $.post('./form', {
      data,
    });
    notification('موفقیت آمیز', 'اطلاعات با موفقیت ارسال نشد :)', 'success');
  }
});

const formValidation = (inputName, inputValue) => {
  switch (inputName) {
    case 'firstname':
      if (inputValue.trim() === '') {
        notification('مشکل در نام', 'لطفا نام خود را وارد کنید', 'error');
        return true;
      }
      return false;
    case 'lastname':
      if (inputValue.trim() === '') {
        notification(
          'مشکل در نام خانوادگی',
          'لطفا نام خانوادگی خود را وارد کنید',
          'error'
        );
        return true;
      }
      return false;
    case 'email':
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      if (!inputValue.match(emailRegex)) {
        notification('مشکل در ایمیل', 'ایمیل نامعتبر است', 'error');
        return true;
      }
      return false;
    case 'username':
      if (inputValue.trim() === '') {
        notification(
          'مشکل در نام کاربری',
          'لطفا نام کاربری خود را وارد کنید',
          'error'
        );
        return true;
      }
      if (inputValue.length <= 4) {
        notification(
          'مشکل در نام کاربری',
          'نام کاربری حداقل باید 5 کارکتر باشد',
          'error'
        );
        return true;
      }
      return false;
    case 'address':
      if (inputValue.trim() === '') {
        notification('مشکل درآدرس', 'لطفا آدرس خود را وارد کنید', 'error');
        return true;
      }
      return false;
  }
};

const notification = (title, msg, type) => {
  $('.notification-container').append(
    `<div class="notification notification--${type}">
      <div class="notification__title">${title}</div>
      <div class="notification__msg">${msg}</div>
    </div>`
  );
  $('.notification').each(function (idx) {
    setTimeout(() => {
      $(this).remove();
    }, (idx + 1) * 2500);
  });
};

(async () => {
  const countries = await countriesList();
  addCountryToDom(countries);
})();

const addCountryToDom = (countries) => {
  const sortBody = $('.sort__body');
  countries.forEach((el, _) => {
    sortBody.append(
      `<div class="sort__item"><img height="50" class="sort__flag" data-src="${el.flag}"> ${el.name} ${el.capital} ${el.region} ${el.population}</div>`
    );
  });
  filterIntersectionDetector();
};

const filterIntersectionDetector = () => {
  let observerConfig = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  };

  const observerFn = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target.children[0];
        lazyImage.src = lazyImage.dataset.src;
      }
    });
  };
  let observer = new IntersectionObserver(observerFn, observerConfig);
  let imgs = document.querySelectorAll('.sort__item');
  imgs.forEach((el) => {
    observer.observe(el);
  });
};
