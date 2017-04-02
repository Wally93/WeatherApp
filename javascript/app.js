/* ---declaring my variables--- */
var temp;
var loc;
var icon;
var humidity;
var windDirection;
var windSpeed;
var description;
var presssure;
var precipitation;
var visibility;
var uv;
var feelslike;
var dewpoint;
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
var day1;
var day2;
var day3;
var day4;
var day5;
var date1;
var date2;
var date3;
var date4;
var date5;
var condi1;
var condi2;
var condi3;
var condi4;
var condi5;



   /* assigne an html element to the variable declared above */
   window.onload = function () {
       date = document.getElementById('date');
       temp = document.getElementById('temperature');
       loc = document.getElementById('location');
       icon = document.getElementById('icon');
       description = document.getElementById('description');
       humidity = document.getElementById('humidity');
       pressure = document.getElementById("pressure");
       windSpeed = document.getElementById('windSpeed');
       windDirection = document.getElementById('windDirection');
       visibility = document.getElementById('visibility');
       uv = document.getElementById('uv');
       feelslike = document.getElementById('feelslike');
       dewpoint = document.getElementById('dewpoint');
       day1 = document.getElementById('day1');
       day2 = document.getElementById('day2');
       day3 = document.getElementById('day3');
       day4 = document.getElementById('day4');
       day5 = document.getElementById('day5');
       date1 = document.getElementById('date1');
       date2 = document.getElementById('date2');
       date3 = document.getElementById('date3');
       date4 = document.getElementById('date4');
       date5 = document.getElementById('date5');
       icon1 = document.getElementById('icon1');
       icon2 = document.getElementById('icon2');
       icon3 = document.getElementById('icon3');
       icon4 = document.getElementById('icon4');
       icon5 = document.getElementById('icon5');
       condi1 = document.getElementById('condi1');
       condi2 = document.getElementById('condi2');
       condi3 = document.getElementById('condi3');
       condi4 = document.getElementById('condi4');
       condi5 = document.getElementById('condi5');
       low1 = document.getElementById('low1');
       low2 = document.getElementById('low2');
       low3 = document.getElementById('low3');
       low4 = document.getElementById('low4');
       low5 = document.getElementById('low5');
       high1 = document.getElementById('high1');
       high2 = document.getElementById('high2');
       high3 = document.getElementById('high3');
       high4 = document.getElementById('high4');
       high5 = document.getElementById('high5');

         /* get the user's geolocation */
           if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(showPosition);
           } else {
                 alert("Can't detect your location! please search it!");
           }
   };


   /* getting the latitude and longitude of the user */
   function showPosition(position) {
        updateByGeo(position.coords.latitude, position.coords.longitude);
   }


   /* API request */
   function updateByGeo(lat, lon) {
     var url = "https://api.wunderground.com/api/ede16bc77bd1d307/conditions/forecast10day/q/" + lat + "," + lon +".json";
     sendRequest(url) ;
   }

   function updateByCity() {
     var input1 = $("#search1").val();
     var input2 = $("#search2").val();
     if (isNaN(input2)) {
       var url = "https://api.wunderground.com/api/ede16bc77bd1d307/conditions/forecast10day/q/" + input1 + "/" + input2 +".json";
        sendRequest(url);
        document.getElementById("search1").value = "";
        document.getElementById("search2").value = "";
     } else {
       updateByZip();
     }
   }

   function updateByZip() {
       input2 = $("#search2").val();
     var url = "https://api.wunderground.com/api/ede16bc77bd1d307/conditions/forecast10day/q/" + input2 +".json";
        sendRequest(url);
        document.getElementById("search1").value = "";
        document.getElementById("search2").value = "";
      }


   /* inner the weather API  json information into the variable declared above */
   function update(weather) {
     date.innerHTML = weather.date;
     loc.innerHTML = weather.loc;
     temp.innerHTML = weather.temp;
     icon.innerHTML =  "<i id='weather-icon' class='wi wi-wu-" + weather.icon + "'></i>"; //"imgs/codes/" + weather.icon + ".png";
     humidity.innerHTML = weather.humidity;
     pressure.innerHTML = weather.pressure;
     description.innerHTML = weather.description;
     windSpeed.innerHTML = weather.windSpeed;
     windDirection.innerHTML = weather.windDirection;
     visibility.innerHTML = weather.visibility;
     uv.innerHTML = weather.uv;
     feelslike.innerHTML = weather.feelslike;
     dewpoint.innerHTML = weather.dewpoint;
     day1.innerHTML = weather.day1;
     day2.innerHTML = weather.day2;
     day3.innerHTML = weather.day3;
     day4.innerHTML = weather.day4;
     day5.innerHTML = weather.day5;
     date1.innerHTML = weather.date1;
     date2.innerHTML = weather.date2;
     date3.innerHTML = weather.date3;
     date4.innerHTML = weather.date4;
     date5.innerHTML = weather.date5;
     condi1.innerHTML = weather.condi1;
     condi2.innerHTML = weather.condi2;
     condi3.innerHTML = weather.condi3;
     condi4.innerHTML = weather.condi4;
     condi5.innerHTML = weather.condi5;
     icon1.innerHTML = "<i  id='icon12345' class='wi wi-wu-" + weather.icon1 + "'></i>";
     icon2.innerHTML = "<i  id='icon12345' class='wi wi-wu-" + weather.icon2 + "'></i>";
     icon3.innerHTML = "<i  id='icon12345' class='wi wi-wu-" + weather.icon3 + "'></i>";
     icon4.innerHTML = "<i  id='icon12345' class='wi wi-wu-" + weather.icon4 + "'></i>";
     icon5.innerHTML = "<i  id='icon12345' class='wi wi-wu-" + weather.icon5 + "'></i>";
     low1.innerHTML = weather.low1;
     low2.innerHTML = weather.low2;
     low3.innerHTML = weather.low3;
     low4.innerHTML = weather.low4;
     low5.innerHTML = weather.low5;
     high1.innerHTML = weather.high1;
     high2.innerHTML = weather.high2;
     high3.innerHTML = weather.high3;
     high4.innerHTML = weather.high4;
     high5.innerHTML = weather.high5;
   }

/* ----AJAX request using jQuery---- */
function sendRequest(url) {
  $.get( url, function adweather (data) {

                  var weather = {};
                  weather.date = data.current_observation.local_time_rfc822;
                  weather.loc = data.current_observation.display_location.full;
                  weather.temp = data.current_observation.temp_f;
                  weather.icon = data.current_observation.icon;
                  weather.description = data.current_observation.weather;
                  weather.humidity = data.current_observation.relative_humidity;
                  weather.pressure = data.current_observation.pressure_mb + " Millibar";
                  weather.windSpeed = data.current_observation.wind_mph + " MPH";
                  weather.windDirection = data.current_observation.wind_dir;
                  weather.visibility = data.current_observation.visibility_mi + "mi";
                  weather.uv = data.current_observation.UV;
                  weather.feelslike = data.current_observation.feelslike_f ;
                  weather.dewpoint = data.current_observation.dewpoint_f;
                  weather.day1 = data.forecast.simpleforecast.forecastday[1].date.weekday;
                  weather.day2 = data.forecast.simpleforecast.forecastday[2].date.weekday;
                  weather.day3 = data.forecast.simpleforecast.forecastday[3].date.weekday;
                  weather.day4 = data.forecast.simpleforecast.forecastday[4].date.weekday;
                  weather.day5 = data.forecast.simpleforecast.forecastday[5].date.weekday;
                  weather.date1 = data.forecast.simpleforecast.forecastday[1].date.day + "/" + data.forecast.simpleforecast.forecastday[1].date.month + "/" + data.forecast.simpleforecast.forecastday[1].date.year;
                  weather.date2 = data.forecast.simpleforecast.forecastday[2].date.day + "/" + data.forecast.simpleforecast.forecastday[2].date.month + "/" + data.forecast.simpleforecast.forecastday[2].date.year;
                  weather.date3 = data.forecast.simpleforecast.forecastday[3].date.day + "/" + data.forecast.simpleforecast.forecastday[3].date.month + "/" + data.forecast.simpleforecast.forecastday[3].date.year;
                  weather.date4 = data.forecast.simpleforecast.forecastday[4].date.day + "/" + data.forecast.simpleforecast.forecastday[4].date.month + "/" + data.forecast.simpleforecast.forecastday[4].date.year;
                  weather.date5 = data.forecast.simpleforecast.forecastday[5].date.day + "/" + data.forecast.simpleforecast.forecastday[5].date.month + "/" + data.forecast.simpleforecast.forecastday[5].date.year;
                  weather.icon1 = data.forecast.simpleforecast.forecastday[1].icon;
                  weather.icon2 = data.forecast.simpleforecast.forecastday[2].icon;
                  weather.icon3 = data.forecast.simpleforecast.forecastday[3].icon;
                  weather.icon4 = data.forecast.simpleforecast.forecastday[4].icon;
                  weather.icon5 = data.forecast.simpleforecast.forecastday[5].icon;
                  weather.condi1 = data.forecast.simpleforecast.forecastday[1].conditions;
                  weather.condi2 = data.forecast.simpleforecast.forecastday[2].conditions;
                  weather.condi3 = data.forecast.simpleforecast.forecastday[3].conditions;
                  weather.condi4 = data.forecast.simpleforecast.forecastday[4].conditions;
                  weather.condi5 = data.forecast.simpleforecast.forecastday[5].conditions;
                  weather.low1 = data.forecast.simpleforecast.forecastday[1].low.fahrenheit;
                  weather.low2 = data.forecast.simpleforecast.forecastday[2].low.fahrenheit;
                  weather.low3 = data.forecast.simpleforecast.forecastday[3].low.fahrenheit;
                  weather.low4 = data.forecast.simpleforecast.forecastday[4].low.fahrenheit;
                  weather.low5 = data.forecast.simpleforecast.forecastday[5].low.fahrenheit;
                  weather.high1 = data.forecast.simpleforecast.forecastday[1].high.fahrenheit;
                  weather.high2 = data.forecast.simpleforecast.forecastday[2].high.fahrenheit;
                  weather.high3 = data.forecast.simpleforecast.forecastday[3].high.fahrenheit;
                  weather.high4 = data.forecast.simpleforecast.forecastday[4].high.fahrenheit;
                  weather.high5 = data.forecast.simpleforecast.forecastday[5].high.fahrenheit;

                  update(weather);
              });
          }
