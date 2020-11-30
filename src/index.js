import sass from './scss/style.scss';
import { digiSuggest } from './API/digikala';
import { randomDogs } from './API/dogs';

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
