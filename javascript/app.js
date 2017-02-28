var APPID = "299c39b628ccaa2850c9f2a7e3060552";
var temp;
var loc;
var icon;
var humidity;
var wind;
var direction;
var description;

function updateByGeo(lat, lon) {
  var url = "http://api.openweathermap.org/data/2.5/weather?" +
    "lat=" + lat +
    "&lon=" + lon +
    "&APPID=" + APPID;

    sendRequest(url) ;
}

function updateByZip(zip) {
  var url = "http://api.openweathermap.org/data/2.5/weather?" +
    "zip=" + zip +
    "&APPID=" + APPID;

    sendRequest(url) ;
}

function sendRequest(url) {
  var xmlhttp = new XMLHttpRequest ();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status ==200) {
            var data = JSON.parse(xmlhttp.responseText);
            var weather = {};
            weather.icon = data.weather[0].id;
            weather.description = data.weather[0].main;
            weather.humidity = data.main.humidity;
            weather.wind = data.wind.speed;
            weather.direction = degreesToDirection(data.wind.deg);
            weather.loc = data.name;
            weather.temp = K2F(data.main.temp);


            update(weather);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
// conversion of temperature, wind speed, wind direction.
function degreesToDirection (degrees) {
  var range = 360/16;
  var low = 360 - range/2;
  var high = (low + range) % 360;
  var angles =["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
     for(var i in angles ) {
         if ( degrees >= low && degrees < high )
            return angles[i];
         low = (low + range) % 360;
         high = (high + range) % 360;

    }
   return "N";
}
function K2C (k) {
    return Math.round(k - 273.15);
}
function K2F (k) {
    return Math.round(k*(9/5)-459.67);
}
function update(weather) {
    wind.innerHTML = weather.wind;
    direction.innerHTML = weather.direction;
    humidity.innerHTML = weather.humidity;
    loc.innerHTML = weather.loc;
    temp.innerHTML = weather.temp;
    icon.innerHTML =  "<i id='weather-icon' class='wi wi-owm-" + weather.icon + "'></i>"; //"imgs/codes/" + weather.icon + ".png";
    description.innerHTML = weather.description;
}
function showPosition(position) {
     updateByGeo(position.coords.latitude, position.coords.longitude);

}
window.onload = function () {
    temp = document.getElementById('temperature');
    loc = document.getElementById('location');
    icon = document.getElementById('icon');
    humidity = document.getElementById('humidity');
    wind = document.getElementById('wind');
    direction = document.getElementById('direction');
    description = document.getElementById('description');

        if (!navigator.geolocation) {
               navigator.geolocation.getCurrentPosition(showPosition);

        } else {
             var zip = window.prompt("could not find your location, what is your Zipcode?");
             updateByZip(zip);
        }
    /*var weather =  {};
        weather.wind = 3.5;
        weather.direction = 'N';
        weather.humidity = 35;
        weather.loc = "Boston";
        weather.temp = '45';
        weather.icon = 200;


     update(weather)*/
};
