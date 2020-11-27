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

$('.bottom-nav__icon').click(function () {
  $('.bottom-nav__instagram').toggleClass('bottom-nav__instagram--up');
});
