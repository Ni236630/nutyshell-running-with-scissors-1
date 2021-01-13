// Component Author: Ryan Youngblood
// Purpose: Weather data provider to get current forecast for their area

let myKey = '' // place your weather API key here. Don't send this to github!!

let currentForecast = [] // Initialize the array for forecast data

export const useWeather = () => currentForecast.slice() // Create a slice of the data to be used elsewhere

// Get current weather data from the openweathermap API, currently a zipcode must be passed in.
export const getWeather = zipcode => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${myKey}`)
    .then(response => response.json())
    .then(
        currentWeatherData => {
            // Place the new data in the fiveDayForecast array. Target ".list" so we can slice it...
            currentForecast = currentWeatherData.list
        }
    )
} 