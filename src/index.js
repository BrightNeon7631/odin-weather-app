import './style/index.css'
import { siteLayout } from './modules/home';
import { displayDefaultLocation } from './modules/apiFunctions';
import {
  searchButtonClick,
  changeTempButtonClick,
} from './modules/listenerFunctions';

siteLayout();

const errorDiv = document.getElementById('error-div');
const searchButton = document.getElementById('search-button');
const changeTempButton = document.getElementById('change');
const forecast = document.getElementById('weather-forecast-container');

displayDefaultLocation(errorDiv, changeTempButton, forecast, 'London');

searchButton.addEventListener('click', searchButtonClick);
changeTempButton.addEventListener('click', changeTempButtonClick);