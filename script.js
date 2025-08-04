let temp = document.querySelector(".temprature");
let uvIndex = document.querySelector(".uv-index-num");
let windSpeed = document.querySelector(".wind-status-num");
let Humidity = document.querySelector(".Humidity-num");
let apiResponse, weatherData;
let input = document.querySelector(".input");
let city = document.querySelector(".country");
let url = `https://api.openweathermap.org/data/2.5/weather?q=Mumbai&units=metric&appid=37188bd406a86a9d9542d354bcda8e8c`;
const pattern = /^[A-Za-z\s]+$/;

let tempdata = async function () {
  try {
    apiResponse = await fetch(url);
    console.log(url);
    weatherData = await apiResponse.json();
    console.log(weatherData);
    return weatherData;
  } catch (error) {
    alert("unable to Fetch data ");
  }
};

function updatedata() {
  tempdata().then((resolve) => {
    if (resolve.cod == 200) {
      temp.innerText = Math.trunc(resolve.main.temp) + "°C";
      Humidity.innerText = Math.trunc(resolve.main.humidity) + " g/m³";
      windSpeed.innerText = resolve.wind.speed + " km/h";
      city.innerText = resolve.name;
    } else {
      alert("City not found");
    }
  });
}
updatedata();

input.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    let value = input.value;
    if (pattern.test(value)) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=37188bd406a86a9d9542d354bcda8e8c`;
      tempdata();
      updatedata();
    } else {
      alert(" Invalid city name  ");
    }
  }
});

let day = document.querySelector(".days");
let date1 = document.querySelector(".date");

let date = new Date();
let days = date.toLocaleDateString("en-US", { weekday: "long" });
let mm = date.toLocaleDateString("en-US", { month: "short" });
let dd = date.getDate();
let yyyy = date.getFullYear();

let dateOrg = `${dd} ${mm}, ${yyyy} `;
day.innerText = days;
date1.innerText = dateOrg;

document.onkeydown = function (e) {
  if (e.key === "F12" || 
      (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) || 
      (e.ctrlKey && e.key === "U")) {
    return false;
  }
};