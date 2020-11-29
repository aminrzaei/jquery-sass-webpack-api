import $ from 'jquery';
import sass from './scss/style.scss';
import { digiSuggest } from './API/digikala';
import { randomDogs } from './API/dogs';

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

$('.bottom-nav__icon , .bottom-nav__contact-me').click(function (e) {
  $('.drawer').addClass('drawer--open');
});
$('.drawer__closer').click(function (e) {
  $('.drawer').removeClass('drawer--open');
});

$('.navbar__item').click(function () {
  const label = $(this).data('label');
  $('.navbar__item').not(this).css('color', 'initial');
  $(this).css('color', '#6b11c0');
  $('.container__item').css('display', 'none');
  $(`.js-${label}`).css('display', 'flex');
});

{
  let lagger = null;

  $('.bottom-nav__input').on('change paste keyup', function () {
    clearTimeout(lagger);
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
}

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
};

$(".navbar__item[data-label='gallery']").click(function () {
  addImagesToDom();
});

$('.gallery__container').scroll(function () {
  const imageContainer = this;
  const distanceFromTop = Math.floor(imageContainer.scrollTop);
  const totalContainerHeight = imageContainer.scrollHeight;
  const viewHeight = imageContainer.clientHeight;

  if (distanceFromTop === totalContainerHeight - viewHeight) addImagesToDom();
});
