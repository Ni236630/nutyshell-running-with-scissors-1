// Component Author: Ryan Youngblood
// Purpose: Used in weatherList.js to convert the data into HTML

export const weatherHTMLConverter = (weatherObj) => {
    const target = document.querySelector('.top-row__current-weather');
    target.innerHTML = `
    <h1>CURRENT WEATHER</h1>
    Today's local forcast: ${weatherObj[0].description}
    `;
};