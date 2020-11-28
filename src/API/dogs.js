import $ from 'jquery';

export const randomDogs = () => {
  const BASE_URL = `https://dog.ceo/api/breeds/image/random/20`;
  const result = $.get(BASE_URL, {
    dataType: 'json',
  });
  return result;
};
