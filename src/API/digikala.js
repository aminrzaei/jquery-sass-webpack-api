export const digiSuggest = (q) => {
  const BASE_URL = `https://www.digikala.com/ajax/autosuggest/?q=${q}`;
  const result = $.get(BASE_URL, {
    dataType: 'json',
  });
  return result;
};
