$(document).ready(function () {
  var appID = "8922c7c9ff2ae54c2727e6a09d80cc98";

  // SEARCH BUTTON
  $(".query_btn").click(function () {
    var query_param = $(this).prev().val();
    console.log(query_param);

    // ZIPCODE SEARCH
    if ($(this).prev().attr("placeholder") == "Zip Code") {
      var weather =
        "https://api.openweathermap.org/data/2.5/weather?zip=" +
        query_param +
        "&units=Imperial&APPID=" +
        appID;
    }

    // WEATHER DATA INFO
    $.get(weather, function (response) {
      var coord = response.coord;

      var queryUrl =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        coord.lat +
        "&lon=" +
        coord.lon +
        "&appid=" +
        appID;

      // THIS WILL RETRIEVE WEATHER ICON
      $.get(queryUrl, function (data) {
        var iconcode = response.weather[0].icon;
        console.log(response);
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        console.log(data);

        $("#city").html(response.name);
        $("#main_weather").html(response.weather[0].main);
        $("#description_weather").html(response.weather[0].description);
        $("#weather_image").attr(
          "src",
          "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
        );
        $("#temperature").html(response.main.temp);
        $("#pressure").html(response.main.pressure);
        $("#humidity").html(response.main.humidity);
        $("#uv").html(data.current.uvi);

        // LOOP CREATES NEW DIV FOR LAST ZIP CODE SEARCH
        var forecast = $(".forecast-container");
        for (i = 1; i < 6; i++) {
          var htmlStr = ` <div class="col-lg-8 col-lg-offset-2 text-center">
              <div class="col">Main Weather: <span>${data.daily[i].weather[0].main}</span></div>
              <div class="col">
                Description: <span >${data.daily[i].weather[0].description}</span>
              </div>
              <div class="col">
                <img id="weather_image" src="http://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png" />
                <div class="col">Temperature: <span>${data.daily[i].temp.day}</span></div>
                <div class="col">Pressure: <span>${data.daily[i].pressure}</span></div>
                <div class="col">Humidity: <span>${data.daily[i].humidity}</span></div>
              </div>
            </div>`;
          forecast.append(htmlStr);
        }
      });
    });
  });

  $("#city").val(localStorage.getItem("#city"));
  $("#main_weather").val(localStorage.getItem("#main_weather"));
  $("#description_weather").val(localStorage.getItem("#description_weather"));
  $("#weather_image").val(localStorage.getItem("#weather_image"));
  $("#temperature").val(localStorage.getItem("#temprature"));
  $("#pressure").val(localStorage.getItem("#pressure"));
  $("#humidity").val(localStorage.getItem("#humidity"));
  $("#uv").val(localStorage.getItem("#uv"));
});
