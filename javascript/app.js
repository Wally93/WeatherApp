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
var monday = "MON";
var tuesday = "TUE";
var wednesday = "WED";
var thursday = "THU";
var friday = "FRI";
var saturday = "SAT";
var sunday = "SUN";
var icon1;
var icon2;
var icon3;
var icon4;
var icon5;
var low1;
var low2;
var low3;
var low4;
var low5;
var high1;
var high2;
var high3;
var high4;
var high5;
var latitude;
var longitude;




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
  $.get( url, function adweather (data) {

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
                  weather.icon1 = data.list[7].weather[0].id;
                  weather.icon2 = data.list[15].weather[0].id;
                  weather.icon3 = data.list[22].weather[0].id;
                  weather.icon4 = data.list[29].weather[0].id;
                  weather.temp1 = 


                  update(weather);
              });
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
  date.innerHTML = weather.date;
  icon1.innerHTML = "<i  id='icon12345' class='wi wi-owm-" + weather.icon1 + "'></i>";
  icon2.innerHTML = "<i  id='icon12345' class='wi wi-owm-" + weather.icon2 + "'></i>";
  icon3.innerHTML = "<i  id='icon12345' class='wi wi-owm-" + weather.icon3 + "'></i>";
  icon4.innerHTML = "<i  id='icon12345' class='wi wi-owm-" + weather.icon4 + "'></i>";
  icon5.innerHTML = "<i  id='icon12345' class='wi wi-owm-" + weather.icon5 + "'></i>";
  temp1.innerHTML = weather.temp1;
  temp2.innerHTML = weather.temp2;
  temp3.innerHTML = weather.temp3;
  temp4.innerHTML = weather.temp4;
  temp5.innerHTML = weather.temp5;
  dis1.innerHTML = weather.dis1;
  dis2.innerHTML = weather.dis2;
  dis3.innerHTML = weather.dis3;
  dis4.innerHTML = weather.dis4;
  dis5.innerHTML = weather.dis5;

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
    icon1 = document.getElementById('icon1');
    icon2 = document.getElementById('icon2');
    icon3 = document.getElementById('icon3');
    icon4 = document.getElementById('icon4');
    icon5 = document.getElementById('icon5');
    temp1 = document.getElementById('temp1');
    temp2 = document.getElementById('temp2');
    temp3 = document.getElementById('temp3');
    temp4 = document.getElementById('temp4');
    temp5 = document.getElementById('temp5');
    dis1 = document.getElementById('dis1');
    dis2 = document.getElementById('dis2');
    dis3 = document.getElementById('dis3');
    dis4 = document.getElementById('dis4');
    dis5 = document.getElementById('dis5');




        if (navigator.geolocation) {
               navigator.geolocation.getCurrentPosition(showPosition);


        } else {
              alert("Can't detect your location! please search it!");
        }
};
