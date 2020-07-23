$(document).ready(function () {
  var appID = "8922c7c9ff2ae54c2727e6a09d80cc98";

  // if (location.protocol === "http:") {
  //   url =
  //     "http://api.openweathermap.org/data/2.5/weather?lat=21.1682895&lon=-101.6723306&units=imperial&APPID=ec50a6072ac189dee111acdd3a38ab9f";
  // } else {
  //   url =
  //     "https://api.openweathermap.org/data/2.5/weather?lat=21.1682895&lon=-101.6723306&units=imperial&APPID=ec50a6072ac189dee111acdd3a38ab9f";
  // }

  // BUTTON GRABS DATA FROM INPUT
  $(".query_btn").click(function () {
    var query_param = $(this).prev().val();
    console.log(query_param);

    // THIS RETRIEVES ZIPCODE INFO
    if ($(this).prev().attr("placeholder") == "Zip Code") {
      var weather =
        "http://api.openweathermap.org/data/2.5/weather?zip=" +
        query_param +
        "&units=Imperial&APPID=" +
        appID;
    }

    console.log("get");

    // THIS WILL RETRIEVE WEATHER DATA INFO
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

        // THIS SHOULD GRAB UV INFO --- HELP!!
        // $.get(weather, function (input) {
        //   var uvIndex = "http://api.openweathermap.org/data/2.5/uvi?appid="
        //   coord.lat +
        // "&lon=" +
        // coord.lon +
        // "&appid=" +
        // appID;

        //   response.uvIndex.[4]
        //   console.log(input);

        // THIS SHOULD GRAB FORECAST INFO --- HELP!!!

        // $.get(weather, function () {
        //   var forecast = "api.openweathermap.org/data/2.5/forecast?"
        //     coord.lat +
        //   "&lon=" +
        //   coord.lon +
        //     "&appid=" +
        //             appID;

        // ------------------------------------

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
        // $("#uv").html(response.main.uvIndex);
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

  // fahrenheit CONVERSION

  $("#convertToFahrenheit").click(function () {
    if (fahrenheit == false) {
      $("#temperature").text($("#temperature").text() * (9 / 5) + 32);
    }
    fahrenheit = true;
  });
});
