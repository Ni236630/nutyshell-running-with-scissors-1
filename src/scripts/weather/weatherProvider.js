// Component Author: Ryan Youngblood
// Purpose: Weather data provider to get current forecast for their area

// Make sure to update your .Settings.js file to include:

import { settings } from "../.Settings.js";

const myKey = settings.weatherKey;

let currentForecast = []; // Initialize the array for forecast data

export const useWeather = () => currentForecast.slice(); // Create a slice of the data to be used elsewhere

// Get current weather data from the openweathermap API, currently a zipcode must be passed in.
export const getWeather = (lat, lon) => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${myKey}`)
    .then(response => response.json())
    .then(
        currentWeatherData => {
            // Place the new data in the fiveDayForecast array. Target ".list" so we can slice it...
            currentForecast = currentWeatherData.weather;
            // console.log(currentForecast)
        }
    );
};