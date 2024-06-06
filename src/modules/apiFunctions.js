import { 
    weatherMainInfo, 
    weatherMoreInfo, 
    weatherForecastItem, 
    weatherLocation, 
    changeBackground, 
    clearElements, 
    changeButtonText 
} from './home';

const API = process.env.API_KEY;
let celsius = true;

async function getWeather(requestURL) {
    try {
        const response = await fetch(requestURL, { mode: 'cors' });
        if (!response.ok) {
            const msg = `There was an error: ${response.status} ${response.statusText}`;
            throw new Error(msg)
        }
        const weatherData = await response.json();
        weatherLocation(weatherData.name, weatherData.sys.country, weatherData.dt);
        weatherMainInfo(weatherData.weather[0].icon, weatherData.main.temp, weatherData.weather[0].description);
        weatherMoreInfo(weatherData.main.feels_like, weatherData.main.humidity, weatherData.main.pressure, weatherData.wind.speed);
        changeBackground(weatherData.weather[0].icon);
    } catch (error) {
        console.log(error);
    }
}

async function getForecast(requestURL, errorContainer, changeButton, forecastContainer) {
    try {
        const response = await fetch(requestURL, { mode: 'cors' });
        if (!response.ok) {
            const msg = `There was an error: ${response.status} ${response.statusText}`;
            throw new Error(msg)
        }
        const data = await response.json();
        clearElements(forecastContainer);
        for (let i = 1; i < 40; i = i + 8) {
            weatherForecastItem(data.list[i].dt, data.list[i].main.temp, data.list[i].weather[0].icon);
        }
        resetChangeButton(errorContainer, changeButton);
    } catch (error) {
        errorContainer.style.display = 'block';
        console.log(error);
    }
}

function displayDefaultLocation(errorContainer, changeButton, forecastContainer,  location) {
    const defaultRequestValue1 = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + '&APPID=' + API + '&units=metric';
    const defaultRequestValue2 = 'https://api.openweathermap.org/data/2.5/forecast?q=' + location + '&APPID=' + API + '&units=metric';
    
    getWeather(defaultRequestValue1);
    getForecast(defaultRequestValue2, errorContainer, changeButton, forecastContainer);
}

function setCelsius(value) {
    celsius = value;
}

function resetChangeButton(errorDiv, button) {
    errorDiv.style.display = 'none';
    setCelsius(true);
    changeButtonText(button, !celsius);
}

export { 
    API, 
    celsius, 
    setCelsius, 
    displayDefaultLocation, 
    getWeather, 
    getForecast 
}