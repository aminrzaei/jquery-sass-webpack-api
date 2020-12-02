export const geolocation = () => {
  const BASE_URL = `https://freegeoip.app/json/`;
  const result = $.get(BASE_URL, {
    dataType: 'json',
  });
  return result;
};
