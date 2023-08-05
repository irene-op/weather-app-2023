let currentTime = document.querySelector("#current-time");
let currentDay = document.querySelector("#current-day");
let currentDate = document.querySelector("#current-date");

let currentFullDate = new Date();
let day = currentFullDate.getDay();
let month = currentFullDate.getMonth();
let year = currentFullDate.getFullYear();
let hours = currentFullDate.getHours();
let minutes = currentFullDate.getMinutes();
let dayNum = currentFullDate.getDate();
let weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// if (minutes < 10) {

// }
currentDay.innerHTML = `${weekDays[day]}`;
currentDate.innerHTML = `${dayNum}/${month}/${year}`;
currentTime.innerHTML = `${hours}:${minutes}`;