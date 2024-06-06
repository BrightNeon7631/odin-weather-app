import { 
    changeButtonText, 
    convertTemperature 
} from './home';
import { 
    setCelsius, 
    celsius, 
    API, 
    getWeather, 
    getForecast 
} from './apiFunctions';

function searchButtonClick() {
    const changeTempButton = document.getElementById('change');
    const errorDiv = document.getElementById('error-div');
    const forecast = document.getElementById('weather-forecast-container');
    const searchInputValue = document.getElementById('search-input').value;

    if (searchInputValue === '' || searchInputValue.startsWith(' ') || searchInputValue.endsWith(' ')) {
        return;
    }
    const requestValue1 = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchInputValue + '&APPID=' + API + '&units=metric';
    const requestValue2 = 'https://api.openweathermap.org/data/2.5/forecast?q=' + searchInputValue + '&APPID=' + API + '&units=metric';
   
    getWeather(requestValue1);
    getForecast(requestValue2, errorDiv, changeTempButton, forecast);
}

function changeTempButtonClick(e) {
    changeButtonText(e.currentTarget, celsius);
    const elements = document.querySelectorAll('.temp');
    for (let i = 0; i < elements.length; i++) {
        convertTemperature(elements[i], celsius);
    }
    setCelsius(!celsius);
}

export { 
    searchButtonClick, 
    changeTempButtonClick 
};