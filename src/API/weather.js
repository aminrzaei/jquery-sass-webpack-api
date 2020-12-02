import { geolocation } from './geolocation';

export const weather = async () => {
  const { longitude, latitude } = await geolocation();
  const BASE_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=daily,alerts,hourly,minutely&lang=fa&units=metric&appid=ff00ba647eb8a60848b337750824b9aa`;
  const result = $.get(BASE_URL, {
    dataType: 'json',
  });
  return result;
};
