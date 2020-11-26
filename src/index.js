import $ from 'jquery';
import sass from './scss/style.scss';

// $('.main').css('background-color', 'yellow');

// navbar__item     &:hover::after {
//     width: 120%;
//     left: -8%;
//   }

$('.navbar__item').hover(
  function () {
    $(this).addClass('navbar__item--show');
  },
  function () {
    $(this).removeClass('navbar__item--show');
  }
);
