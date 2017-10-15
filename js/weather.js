//inspired by various designs in dribbble.com
//declare global variables
var AppId = 'c42e64197e41b65a4650bf697ecbc97a';
var api = 'http://api.openweathermap.org/data/2.5/weather?';
var dispLocation;
var dispTemp;
var dispWind;
var dispDescription;
var dispIcon;

//onload
window.onload = function() {
  dispLocation = document.querySelector("#dispLocation");
  dispTemp = document.querySelector("#dispTemp");
  dispHumidity = document.querySelector("#dispHumidity");
  dispWind = document.querySelector("#dispWind");
  dispDescription = document.querySelector("#dispDescription");
  convertC = document.querySelector('#convertC');
  convertF = document.querySelector('#convertF');
  dispDay = document.querySelector('#dispDate');
  dispTime = document.querySelector('#dispTime');
  dispIcon = document.querySelector('#dispIcon');
  getLocation();
  getDateTime();
}

//use computer's ip address to get location
function getLocation() {
  var location;
  //get location using ipinfo api
  $.getJSON("http://ipinfo.io/", function(a) {
    var location = a.city + ', ' + a.region;
    var loc = $('#dispLocation').html(location);
    //for test only
    console.log(location);

    var postal = a.postal;
    var countryCode = a.country;
    //open-weather api - based on postal and country code
    var url = api + 'zip=' + postal + ',' + countryCode + '&APPID=' + AppId;
    console.log(url);
    sendRequest(url);
  });
}

//send api request
function sendRequest(url) {
  //get weather data
  $.getJSON(url, function(data) {
    var weather = {};
    weather.dispHumidity = data.main.humidity;
    weather.dispWind = data.wind.speed;
    weather.dispDescription = data.weather[0].description + ' - ';
    //weather temp c/f
    weather.c = Math.floor(data.main.temp - 273.15) + '&deg;C';
    weather.f = Math.floor((data.main.temp * 1.8) - 460) + '&deg;F';
    weather.icon = data.weather[0].icon;
    console.log(weather.icon);

    updateDisplay(weather);
  })
}

//display data
function updateDisplay(weather) {
  dispDescription.innerHTML = weather.dispDescription;
  dispTemp.innerHTML = weather.f;
  dispHumidity.innerHTML = 'Humidity : ' + weather.dispHumidity + '%';
  dispWind.innerHTML = 'Wind Speed : '+weather.dispWind + ' m/s';

  //display icon based on weather condition
  //http://openweathermap.org/weather-conditions
  //erikflowers - weather icons
  switch (weather.icon) {
    case '01d':
      dispIcon.innerHTML = '<i class="wi wi-day-sunny"></i>';
      break;
    case '01n':
      dispIcon.innerHTML = '<i class="wi wi-night-clear"></i>';
      break;
    case '02d':
      dispIcon.innerHTML = '<i class="wi wi-day-cloudy"></i>';
      break;
    case '02n':
      dispIcon.innerHTML = '<i class="wi wi-night-alt-cloudy"></i>';
      break;
    case '03d':
      dispIcon.innerHTML = '<i class="wi wi-cloudy"></i>';
      break;
    case '03n':
      dispIcon.innerHTML = '<i class="wi wi-night-cloudy"></i>';
      break;
    case '04d':
      dispIcon.innerHTML = '<i class="wi wi-day-fog"></i>';
      break;
    case '04n':
      dispIcon.innerHTML = '<i class="wi wi-night-fog"></i>';
      break;
    case '09d':
      dispIcon.innerHTML = '<i class="wi wi-day-rain-mix"></i>';
      break;
    case '09n':
      dispIcon.innerHTML = '<i class="wi wi-night-alt-rain-mix"></i>';
      break;
    case '10d':
      dispIcon.innerHTML = '<i class="wi wi-day-rain"></i>';
      break;
    case '10n':
      dispIcon.innerHTML = '<i class="wi wi-night-alt-rain"></i>';
      break;
    case '11d':
      dispIcon.innerHTML = '<i class="wi wi-day-thunderstorm"></i>';
      break;
    case '11n':
      dispIcon.innerHTML = '<i class="wi wi-night-alt-storm-showers"></i>';
      break;
    case '13d':
      dispIcon.innerHTML = '<i class="wi wi-day-snow"></i>';
      break;
    case '13n':
      dispIcon.innerHTML = '<i class="wi wi-night-snow"></i>';
      break;
    case '50d':
      dispIcon.innerHTML = '<i class="wi wi-windy"></i>';
      break;
    case '50n':
      dispIcon.innerHTML = '<i class="wi wi-windy"></i>';
      break;
    default:
      break;
  }

  //change temperature unit
  convertF.addEventListener('click', function() {
    dispTemp.innerHTML = weather.f;
  });
  convertC.addEventListener('click', function() {
    dispTemp.innerHTML = weather.c;
  });
}

//display date and time
function getDateTime() {
  var day = new Date;
  var newd = day.getDay();
  var newm = day.getUTCMonth();
  var d = day.getUTCDate();
  var y = day.getUTCFullYear();

  week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  //12hr time format
  var date = new Date;
  var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  var am_pm = date.getHours() >= 12 ? "PM" : "AM";
  hours = hours < 10 ? "0" + hours : hours;
  var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  time = hours + ":" + minutes + ":" + seconds + " " + am_pm;

  //update display
  dispDate.innerHTML = week[newd] + ', ' + month[newm] + ' ' + d + ', ' + y;
  dispTime.innerHTML = time;
}
