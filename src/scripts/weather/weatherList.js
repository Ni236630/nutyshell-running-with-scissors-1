import { getWeather, useWeather } from "./weatherProvider.js"
import {weatherHTMLConverter} from './weatherHTMLConverter.js'

let todaysForecast = []
let lat;
let lon;

export const weatherList = () => {
    getWeather(lat, lon)
        .then(() => {
            todaysForecast = useWeather()
            // console.log(todaysForecast[0].main)
            const test = weatherHTMLConverter(todaysForecast)
        })
}


export const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => showPosition(position))
    } else {
        
    }
}

const showPosition = (position) => {
    lat = position.coords.latitude
    lon = position.coords.longitude
    // console.log(lat, lon)
    weatherList(lat, lon)
}