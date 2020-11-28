import $ from 'jquery';
import sass from './scss/style.scss';

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
  const lable = $(this).data('lable');
  $('.navbar__item').not(this).css('color', 'initial');
  $(this).css('color', '#6b11c0');
  $('.container__item').css('display', 'none');
  $(`.js-${lable}`).css('display', 'flex');
});

$('.bottom-nav__input').on('change paste keyup', function () {
  console.log($(this).val());
});
