var APPID = "299c39b628ccaa2850c9f2a7e3060552";
var temp;
var loc;
var icon;
var humidity;
var windDirection;
var windSpeed;
var description;
var presssure;
var precipitation;
var date;
var mon = "MON";
var tue = "TUE";
var wed = "WED";
var thu = "THU";
var fri = "FRI";
var sat = "SAT";
var sun = "SUN";







function updateByGeo(lat, lon) {
  var url = "http://api.openweathermap.org/data/2.5/forecast?" +
    "lat=" + lat +
    "&lon=" + lon +
    "&APPID=" + APPID;

    sendRequest(url) ;
}


function updateByCity() {
  input = $("#search").val();
  if (isNaN(input)) {
    var url = "http://api.openweathermap.org/data/2.5/forecast?" +
     "q=" + input +
     "&APPID=" + APPID;
     sendRequest(url);
     document.getElementById("search").value = "";
  } else {
    updateByZip();
  }

}
function updateByZip() {
  var url = "http://api.openweathermap.org/data/2.5/forecast?" +
    "zip=" + input +
    "&APPID=" + APPID;
     sendRequest(url);
     document.getElementById("search").value = "";
   }

function sendRequest(url) {
  var xmlhttp = new XMLHttpRequest ();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status ==200) {
            var data = JSON.parse(xmlhttp.responseText);
            var weather = {};
            weather.loc = data.city.name;
            weather.icon = data.list[0].weather[0].id;
            weather.description = data.list[0].weather[0].main;
            weather.temp = K2F(data.list[0].main.temp);
            weather.humidity = data.list[0].main.humidity;
            weather.pressure = data.list[0].main.pressure;
            weather.windSpeed = data.list[0].wind.speed;
            weather.windDirection = degreesToDirection(data.list[0].wind.deg);
            weather.date = data.list[0].dt_txt;


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
  loc.innerHTML = weather.loc;
  temp.innerHTML = weather.temp;
  icon.innerHTML =  "<i id='weather-icon' class='wi wi-owm-" + weather.icon + "'></i>"; //"imgs/codes/" + weather.icon + ".png";
  humidity.innerHTML = weather.humidity;
  pressure.innerHTML = weather.pressure;
  description.innerHTML = weather.description;
  windSpeed.innerHTML = weather.windSpeed;
  windDirection.innerHTML = weather.windDirection;
  date.innerHTML =weather.date;

}
function showPosition(position) {
     updateByGeo(position.coords.latitude, position.coords.longitude);

}
window.onload = function () {
    temp = document.getElementById('temperature');
    loc = document.getElementById('location');
    icon = document.getElementById('icon');
    description = document.getElementById('description');
    humidity = document.getElementById('humidity');
    pressure = document.getElementById("pressure");
    windSpeed = document.getElementById('windSpeed');
    windDirection = document.getElementById('windDirection');
    date = document.getElementById('date');
    myFunction();

        if (navigator.geolocation) {
               navigator.geolocation.getCurrentPosition(showPosition);


        } else {
              alert("Can't detect your location! please search it!");
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


function myFunction() {
    var d = new Date();
    var n = d.getDay();
    if  (n <= 4) {
     document.getElementById("day1").innerHTML = tue;
     document.getElementById("day2").innerHTML = wed;
     document.getElementById("day3").innerHTML = thu;
     document.getElementById("day4").innerHTML = fri;
     document.getElementById("day5").innerHTML = sat;
    }
}
