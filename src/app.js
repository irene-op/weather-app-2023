//Show on load (ultimately, I want the page to load on 'current location')
let city = "Aarhus";
let apiKey = "a33b693cfbefd271b0ed075f9a8f65f0";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

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

//format forecast days
function formatForecastDay(timestamp){
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}
//forecast
function displayForecast(response) {
    let forecast = document.querySelector("#forecast");
    let forecastData = response.data.daily // daily is an array of objects (each object is one day) with forecast for 8 days [0, 1...7];
    let forecastHTML = `<div class="row d-flex justify-content-around">`;
    
    //this function will append a forecast col for each day in the array
    forecastData.forEach(function (dayObject, index) {
        if (index < 6) {
            let minTemp = Math.round(dayObject.temp.min);
        let maxTemp = Math.round(dayObject.temp.max);
        let timestamp = dayObject.dt;
        let forecastIcon = dayObject.weather[0].icon;
        //console.log(dayObject.indexOf());
        forecastHTML = forecastHTML + `<div class="col-2"> 
                        <div id="forecast-day">${formatForecastDay(timestamp)}</div>
                        <img src="https://openweathermap.org/img/wn/${forecastIcon}@2x.png" alt="" width="40" class="forecast-icons">
                        <div id="forecast-temperatures"><span id="temperature-min">${minTemp}°</span><strong id="temperature-max">${maxTemp}°</strong></div>
                    </div>`;
        }
    });
    
    forecastHTML = forecastHTML + `</div>`;
    forecast.innerHTML = forecastHTML;
}

//displayForecast();
function getForecast(coordinates) {
    let apiKey = "a33b693cfbefd271b0ed075f9a8f65f0";
    let apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`

    axios.get(apiUrlForecast).then(displayForecast);
}

// get weather data with Open Weather API
function getWeather(response) {
    let currentTemperature = document.querySelector("#current-temperature")
    let h1 = document.querySelector("h1");
    let description = document.querySelector("#description");
    let humidity = document.querySelector("#humidity");
    let windSpeed = document.querySelector("#wind-speed");
    let mainIcon = document.querySelector("#main-icon");
    
    //call displayForecast() here

    celciusTemperature = Math.round(response.data.main.temp);

    mainIcon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    h1.innerHTML = response.data.name;
    currentTemperature.innerHTML = celciusTemperature;
    description.innerHTML = response.data.weather[0].description;
    humidity.innerHTML = response.data.main.humidity;
    windSpeed.innerHTML = Math.round(response.data.wind.speed);

    getForecast(response.data.coord);

    //console.log(response.data.coord);
    //console.log(response.data.sys.country);
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

axios.get(apiUrl).then(getWeather);
axios.get(apiUrl).then(getDate);

// Convert units
function displayCelcius(event) {
    event.preventDefault();
    let temperature = document.querySelector("#current-temperature");
    temperature.innerHTML = celciusTemperature;
    celciusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
}

function displayFahrenheit(event) {
    event.preventDefault();
    let temperature = document.querySelector("#current-temperature");
    let fahrenheitTemperature = Math.round((celciusTemperature * 9/5) + 32);
    temperature.innerHTML = fahrenheitTemperature;
    celciusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
}

let celciusTemperature = null; // set as global variable to use in various places.

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelcius);

//displayForecast();