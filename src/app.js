

//Change city h1
// function searchCity(event) {
//     event.preventDefault();
//     let city = document.querySelector("#city");
//     let inputCity = document.querySelector("#input-city");
//     city.innerHTML = `${inputCity.value}`;
// }

// let searchForm = document.querySelector("#search-form");
// searchForm.addEventListener("submit", searchCity);


// get weather data with Open Weather API
function getWeather(response) {
    let currentTemperature = document.querySelector("#current-temperature")
    let h1 = document.querySelector("h1");
    let description = document.querySelector("#description");
    let humidity = document.querySelector("#humidity");
    let windSpeed = document.querySelector("#wind-speed");
    h1.innerHTML = response.data.name;
    currentTemperature.innerHTML = `${Math.round(response.data.main.temp)}`;
    description.innerHTML = response.data.weather[0].description;
    humidity.innerHTML = response.data.main.humidity;
    windSpeed.innerHTML = Math.round(response.data.wind.speed);
}

// get and format date data with Open Weather API
function getDate(response) {
    let currentTime = document.querySelector("#current-time");
    let currentDay = document.querySelector("#current-day");
    let currentDate = document.querySelector("#current-date");

    let currentFullDate = new Date(response.data.dt * 1000);

    let day = currentFullDate.getDay();
    let month = currentFullDate.getMonth() + 1;
    let year = currentFullDate.getFullYear();
    let hours = currentFullDate.getHours();
    let minutes = currentFullDate.getMinutes();
    let dayNum = currentFullDate.getDate();

    let weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    if (dayNum < 10) {
        dayNum = `0${dayNum}`;
    }

    if (month < 10) {
        month = `0${month}`;
    }

    if (hours < 10) {
        hours = `0${hours}`;
    }

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    currentDay.innerHTML = `${weekDays[day]}`;
    currentDate.innerHTML = `${dayNum}/${month}/${year}`;
    currentTime.innerHTML = `Last updated: ${hours}:${minutes}`;
}

let city = "New York";
let apiKey = "a33b693cfbefd271b0ed075f9a8f65f0";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(getWeather);
axios.get(apiUrl).then(getDate);