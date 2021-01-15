// Component Author: Ryan Youngblood & Ryan DeVault
// Purpose: Responsible for listing the current local weather to the DOM when initialized

import { getWeather, useWeather } from "./weatherProvider.js"
import {weatherHTMLConverter} from './weatherHTMLConverter.js'

let todaysForecast = []
let lat;
let lon;

export const weatherList = () => {
    getWeather(lat, lon)
        .then(() => {
            todaysForecast = useWeather();
            return weatherHTMLConverter(todaysForecast);
        });
};


const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => showPosition(position));
    } else {
        alert("Geolocation is not supported by this browser.");
    };
};

const showPosition = (position) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
};

getLocation();