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
    currentTime.innerHTML = `Last updated: ${hours}:${minutes}`; //deal with this because it's not current time but last updated. Make it make sense
}

// get weather data with Open Weather API
function getWeather(response) {
    let currentTemperature = document.querySelector("#current-temperature")
    let h1 = document.querySelector("h1");
    let description = document.querySelector("#description");
    let humidity = document.querySelector("#humidity");
    let windSpeed = document.querySelector("#wind-speed");
    let mainIcon = document.querySelector("#main-icon");

    mainIcon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    h1.innerHTML = response.data.name;
    currentTemperature.innerHTML = `${Math.round(response.data.main.temp)}`;
    description.innerHTML = response.data.weather[0].description;
    humidity.innerHTML = response.data.main.humidity;
    windSpeed.innerHTML = Math.round(response.data.wind.speed);

    console.log(response.data);
    console.log(response.data.sys.country);
    console.log(response.data.weather[0].icon);
}

// Search city
function searchCity(city) {
    let apiKey = "a33b693cfbefd271b0ed075f9a8f65f0";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(getWeather);
    axios.get(apiUrl).then(getDate);
}

function handleSubmit(event) {
    event.preventDefault();
    let inputCity = document.querySelector("#input-city");
    searchCity(inputCity.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

//Show on load (ultimately, I want the page to load on 'current location')
let city = "Aarhus";
let apiKey = "a33b693cfbefd271b0ed075f9a8f65f0";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(getWeather);
axios.get(apiUrl).then(getDate);