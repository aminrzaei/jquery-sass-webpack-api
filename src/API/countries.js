export const countriesList = () => {
  const BASE_URL = `https://restcountries.eu/rest/v2/all?fields=name;capital;region;population;flag`;
  const result = $.get(BASE_URL, {
    dataType: 'json',
  });
  return result;
};
