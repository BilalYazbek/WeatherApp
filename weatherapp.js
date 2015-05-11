var express = require("express"),
  app = express(),
  http = require("http").createServer(app),
  bodyParser = require("body-parser"),
  request = require('request'),
  moment = require('moment');

app.set("ipaddr", "127.0.0.1");
app.set("port", 8081);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

http.listen(app.get("port"), app.get("ipaddr"), function () {
  console.log("Car Server up and running. Go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});

function accessUrl(address, callback) {
  var options = {
    headers: {'user-agent': 'Mozilla/5.0',  'x-api-key': 'c064dbe7d8b85d5073a73ca6a9b549c3'},
    url: 'http://api.openweathermap.org/data/2.5/weather?q=' + address,
    json: true
  };

  request.get(options, function (err, response, body_json) {
    if (!err && response.statusCode === 200) {
      callback(null,  "<h3>"
        + address
        + "</h3>"
        + "<h4>" + moment().format('dddd')  + "</h4>"
        + "<h4>" + moment().format('MMMM Do YYYY, h:mm:ss a') + "</h4>" + "</br>"
        + "<img src = \"http://openweathermap.org/img/w/" + body_json.weather[0].icon + ".png\"alt = \"\" width = \" 100\" height = \" 100\"/>"
        + "</br>"
        + " <h5><i> Temp: </i>" + Math.round(body_json.main.temp - 270) + "˚C"
        + "-----"
        + "<i> Weather: </i>" +  body_json.weather[0].main
        + "-----"
        + "<i> Weather description: </i>" + body_json.weather[0].description
        + "-----"
        + "<i> Pressure: </i>" + Math.round(body_json.main.pressure)
        + "-----"
        + "<i> Humidity: </i>" + Math.round(body_json.main.humidity)
        + "-----"
        + "<i>Wind Speed: </i>" + Math.round(body_json.wind.speed)
        + "</h5>");
    } else {
      callback(err);
    }
  });
}


function accessUrlforecast(address, callback) {
  var optionss = {
    headers: {'user-agent': 'Mozilla/5.0',  'x-api-key': 'c064dbe7d8b85d5073a73ca6a9b549c3'},
    url: 'http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&cnt=5&q=' + address,
    json: true
  };
  request.get(optionss, function (err, response, body_json) {
    if (!err && response.statusCode === 200) {
      callback(null,  "<center><table style=\"width:100%\">"
        + "<tr>"
        + "<td><b>" + moment().add(1, 'days').calendar() + "</b></td>"
        + "<td><i> Pressure: </i>" + Math.round(body_json.list[0].pressure) + "</td>"
        + "<td><i> Humidity: </i>" + Math.round(body_json.list[0].humidity) + "</td>"
        + "<td>" + body_json.list[0].weather[0].description + "</td>"
        + "<td>" + Math.round(body_json.list[0].temp.day  - 270) + "˚C</td>"
        + "<td><img src = \"http://openweathermap.org/img/w/" + body_json.list[0].weather[0].icon + ".png\"alt = \"\" /></td>"
        + "</tr>"
        + "<tr>"
        + "<td><b>" + moment().add(2, 'days').calendar() + "</b></td>"
        + "<td><i> Pressure: </i>" + Math.round(body_json.list[1].pressure) + "</td>"
        + "<td><i> Humidity: </i>" + Math.round(body_json.list[1].humidity) + "</td>"
        + "<td>" + body_json.list[1].weather[0].description + "</td>"
        + "<td>" + Math.round(body_json.list[1].temp.day  - 270) + "˚C</td>"
        + "<td><img src = \"http://openweathermap.org/img/w/" + body_json.list[1].weather[0].icon + ".png\"alt = \"\" /></td>"
        + "</tr>"
        + "<tr>"
        + "<td><b>" + moment().add(3, 'days').calendar() + "</b></td>"
        + "<td><i> Pressure: </i>" + Math.round(body_json.list[2].pressure) + "</td>"
        + "<td><i> Humidity: </i>" + Math.round(body_json.list[2].humidity) + "</td>"
        + "<td>" + body_json.list[2].weather[0].description + "</td>"
        + "<td>" + Math.round(body_json.list[2].temp.day  - 270) + "˚C</td>"
        + "<td><img src = \"http://openweathermap.org/img/w/" + body_json.list[2].weather[0].icon + ".png\"alt = \"\" /></td>"
        + "</tr>"
        + "<tr>"
        + "<td><b>" + moment().add(4, 'days').calendar() + "</b></td>"
        + "<td><i> Pressure: </i>" + Math.round(body_json.list[3].pressure) + "</td>"
        + "<td><i> Humidity: </i>" + Math.round(body_json.list[3].humidity) + "</td>"
        + "<td>" + body_json.list[3].weather[0].description + "</td>"
        + "<td>" + Math.round(body_json.list[3].temp.day  - 270) + "˚C</td>"
        + "<td><img src = \"http://openweathermap.org/img/w/" + body_json.list[3].weather[0].icon + ".png\"alt = \"\" /></td>"
        + "</tr>"
        + "<tr>"
        + "<td><b>" + moment().add(5, 'days').calendar() + "</b></td>"
        + "<td><i> Pressure: </i>" + Math.round(body_json.list[4].pressure) + "</td>"
        + "<td><i> Humidity: </i>" + Math.round(body_json.list[4].humidity) + "</td>"
        + "<td>" + body_json.list[4].weather[0].description + "</td>"
        + "<td>" + Math.round(body_json.list[4].temp.day  - 270) + "˚C</td>"
        + "<td><img src = \"http://openweathermap.org/img/w/" + body_json.list[4].weather[0].icon + ".png\"alt = \"\" /></td>"
        + "</tr>"
        + "</table></center>");

    } else {
      callback(err);
    }
  });
}



app.get('/', function (data, res) {

  var template =  " <html><head> "
        + "<title>weather</title> </head>"
        + "<body>"
        + "<Center><h1> Weather Application</h1></Center>"
        + "<Center><img src = \"http://www.funshineexpress.com/image/cache/BCWeather.png\" alt = \"\" width = \" 400\" height = \" 150\"/></Center> "
        + "<h3>Choose any Country To Search For</h3>"
        + "<p>"
        + "<form action= \"/info/\" method=\"GET\">"
        + "<tr>"
        + "<td width=\"350\">Country</td>"
        + "<td width=\"50\">:</td>"
        + "<td width=\"400\"><select name=\"city\" />"
        + "<option value=\"\">Country...</option>"
        + "<option value=\"Tokyo\">Tokyo</option>"
        + "<option value=\"London\">London</option>"
        + "<option value=\"France\">France</option>"
        + "<option value=\"Bagdhad\">Bagdhad</option>"
        + "<option value=\"Moscow\">Moscow</option>"
        + "<option value=\"Mountain View\">Mountain View</option>"
        + "<option value=\"New York\">New York</option>"
        + "<option value=\"Algeria\">Algeria</option>"
        + "</tr>"
        + "<tr>"
        + "<td><input type=\"submit\" name=\"submit\" value=\"submit\">"
        + "</td>"
        + "</form>"
        + "</p>"
        + "</body"
        + "</html>";

  res.send(template);

});

app.get("/info/", function (data, res) {
  var city = data.param('city');
  var errortemplate = "<p> Sorry Error!" + "</p> </br>" + "<p> <a href=/>" + "<b>Back To Home Page</b>" + " </a></p> </br>";
  var template1 =  " <html><head> "
        + "<title>weather</title> </head>"
        + "<body>"
        + "<Center><h1> Weather Application</h1></Center>"
        + "<center><h2>Now You Are Desplaying "
        + city
        + "</center></h2>"
        + "<b> Choose another Country To Search For</b>"
        + "<p>"
        + "<form action= \"/info/\" method=\"GET\">"
        + "<tr>"
        + "<td width=\"350\">New Country</td>"
        + "<td width=\"50\">:</td>"
        + "<td width=\"400\"><select name=\"city\" />"
        + "<option value=\"\">" + city + "</option>"
        + "<option value=\"Tokyo\">Tokyo</option>"
        + "<option value=\"London\">London</option>"
        + "<option value=\"France\">France</option>"
        + "<option value=\"Bagdhad\">Bagdhad</option>"
        + "<option value=\"Moscow\">Moscow</option>"
        + "<option value=\"Mountain View\">Mountain View</option>"
        + "<option value=\"New York\">New York</option>"
        + "<option value=\"Algeria\">Algeria</option>"
        + "</tr>"
        + "<tr>"
        + "<td><input type=\"submit\" name=\"submit\" value=\"submit\">"
        + "</td>"
        + "</form>"
        + "</p>"
        + "</body"
        + "</html>";

  accessUrl(city, function (err, result) {
    if (err) {
      res.send(errortemplate);
    } else {
      template1 = template1 + "</br>" + "<center>" + result + "</center></br>";
      accessUrlforecast(city, function (err, result1) {
        if (err) {
          res.send(errortemplate);
        } else {
          var template2 = template1 + "</br>" + result1;
          res.send(template2);
        }
      });
    }
  });
});
