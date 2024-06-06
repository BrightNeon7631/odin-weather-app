import Temperature from '../assets/temperature.png';
import Humidity from '../assets/humidity.png';
import Pressure from '../assets/pressure.png';
import Wind from '../assets/wind.png';
import Search from '../assets/search.png';
import { 
    createNewElement, 
    addToContainer,
    clearElements 
} from './utils/element';

function siteLayout() {
    const content = document.getElementById('content');

    const topDiv = createNewElement('div', 'top-div');
    const errorDiv = createNewElement('div', 'error-div', 'City not found. Sorry.');
    const searchDiv = createNewElement('div', 'search-div');
    const searchBar = createNewElement('input', 'search-input');
    const searchButton = createNewElement('div', 'search-button');
    const searchButtonImg = createNewElement('img', null, Search);
    const changeTempButton = createNewElement('button', 'change', '°F');

    const locationContainer = createNewElement('div', 'weather-location');
    const locationName = createNewElement('div', 'location-name');
    const locationDateTime = createNewElement('div', 'location-date-time');
    const locationDate = createNewElement('div', 'location-date');
    const locationTime = createNewElement('div', 'location-time');

    const weatherContainer = createNewElement('div', 'weather-container');
    const weatherMain = createNewElement('div', 'weather-main-info');
    const weatherMore = createNewElement('div', 'weather-more-info');
    const weatherMoreColumn = createNewElement('div', 'weather-more-info-column');
    const weatherForecast = createNewElement('div', 'weather-forecast-container');

    addToContainer(searchButton, searchButtonImg);
    addToContainer(searchDiv, searchBar, searchButton, changeTempButton);
    addToContainer(topDiv, searchDiv);
    addToContainer(locationDateTime, locationDate, locationTime);
    addToContainer(locationContainer, locationName, locationDateTime);
    addToContainer(weatherMore, weatherMoreColumn);
    addToContainer(weatherContainer, weatherMain, weatherMore);
    addToContainer(content, topDiv, errorDiv, locationContainer, weatherContainer, weatherForecast);
}

function weatherMainInfo(icon, temperature, description) {
    const weatherMain = document.getElementById('weather-main-info');
    clearElements(weatherMain);

    const weatherLeft = createNewElement('div', 'weather-left');
    const weatherIcon = createNewElement('img', null, `https://openweathermap.org/img/wn/${icon}@4x.png`);
    const weatherRight = createNewElement('div', 'weather-right');
    const weatherTemperature = createNewElement('div', null, `${temperature}°C`, 'temp');
    const weatherDescription = createNewElement('div', null, description);

    addToContainer(weatherLeft, weatherIcon);
    addToContainer(weatherRight, weatherTemperature, weatherDescription);
    addToContainer(weatherMain, weatherLeft, weatherRight);
}

function weatherLocation(city, country, date) {
    const location = document.getElementById('location-name');
    location.textContent = city + ', ' + country;

    const locationDate = document.getElementById('location-date');
    locationDate.textContent = (convertDate(date).getMonth() + 1) + '/' + convertDate(date).getDate() + '/' + convertDate(date).getFullYear();

    const locationTime = document.getElementById('location-time');
    let minutes = convertDate(date).getMinutes();
    if (minutes.toString().length == 1) {
        minutes = '0' + minutes.toString();
    }
    locationTime.textContent = convertDate(date).getHours() + ':' + minutes;
}

function weatherMoreInfo(feelsLike, humidity, pressure, windSpeed) {
    const weatherMore = document.getElementById('weather-more-info-column');
    clearElements(weatherMore);

    const weatherFeelslike = createNewElement('div');
    const weatherFeelsLikeText1 = createNewElement('div', null, 'Feels like: ');
    const weatherFeelsLikeText2 = createNewElement('div', null, `${feelsLike}°C`, 'temp');
    const weatherFeelsLikeIcon = createNewElement('img', null, Temperature);

    const weatherHumidity = createNewElement('div');
    const weatherHumidityText = createNewElement('div', null, `Humidity: ${humidity}%`);
    const weatherHumidityIcon = createNewElement('img', null, Humidity);

    const weatherPressure = createNewElement('div');
    const weatherPressureText = createNewElement('div', null, `Pressure: ${pressure} hPa`);
    const weatherPressureIcon = createNewElement('img', null, Pressure);

    const weatherWindSpeed = createNewElement('div');
    const weatherWindSpeedText = createNewElement('div', null, `Wind speed: ${windSpeed} km/h`);
    const weatherWindSpeedIcon = createNewElement('img', null, Wind);

    addToContainer(weatherFeelslike, weatherFeelsLikeIcon, weatherFeelsLikeText1, weatherFeelsLikeText2);
    addToContainer(weatherHumidity, weatherHumidityIcon, weatherHumidityText);
    addToContainer(weatherPressure, weatherPressureIcon, weatherPressureText);
    addToContainer(weatherWindSpeed, weatherWindSpeedIcon, weatherWindSpeedText);
    addToContainer(weatherMore, weatherFeelslike, weatherHumidity, weatherPressure, weatherWindSpeed);
}

function weatherForecastItem(time, temperature, icon) {
    const forecast = document.getElementById('weather-forecast-container');

    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const item = createNewElement('div', null, null, 'forecast-item');
    const itemDate = createNewElement('div', null, weekday[convertDate(time).getDay()]);
    const itemTemp = createNewElement('div', null, `${temperature}°C`, 'temp');
    const itemIcon = createNewElement('img', null, `https://openweathermap.org/img/wn/${icon}@2x.png`);

    addToContainer(item, itemIcon, itemDate, itemTemp);
    addToContainer(forecast, item);
}

function changeBackground(weatherIcon) {
    const video = document.getElementById('video');

    if (weatherIcon == '01d' || weatherIcon == '01n') {
        video.src = 'videos/1.mp4';
    } else if (weatherIcon == '02d' || weatherIcon == '02n') {
        video.src = 'videos/2.mp4';
    } else if (weatherIcon == '03d' || weatherIcon == '03n' || weatherIcon == '04d' || weatherIcon == '04n') {
        video.src = 'videos/6.mp4';
    } else if (weatherIcon == '09d' || weatherIcon == '09n' || weatherIcon == '10d' || weatherIcon == '10n') {
        video.src = 'videos/3.mp4';
    } else if (weatherIcon == '11d' || weatherIcon == '11n') {
        video.src = 'videos/4.mp4';
    } else if (weatherIcon == '13d' || weatherIcon == '13n') {
        video.src = 'videos/7.mp4';
    } else {
        video.src = 'videos/5.mp4';
    }
}

function convertDate(timestamp) {
    const dateObject = new Date(timestamp * 1000);
    return dateObject;
}

function convertTemperature(element, celsius) {
    let newTemp;
    let symbol;
    if (celsius) {
        newTemp = (parseFloat(element.textContent.slice(0, -2)) * 1.8 + 32).toFixed(2);
        symbol = '°F'
    } else {
        newTemp = ((parseFloat(element.textContent.slice(0, -2)) - 32) / 1.8).toFixed(2);
        symbol = '°C'
    }
    element.textContent = newTemp + symbol;
}

function changeButtonText(button, celsius) {
    if (celsius) {
        button.textContent = '°C';
    } else {
        button.textContent = '°F';
    }
}

export { 
    weatherMainInfo, 
    weatherMoreInfo, 
    siteLayout, 
    weatherForecastItem, 
    weatherLocation, 
    changeBackground, 
    clearElements, 
    convertTemperature, 
    changeButtonText 
}