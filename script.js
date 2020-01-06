//1. Make a function called getWeather, in that function put all code for JUST weather api call, 
// make another called get UV
// set up event handelers on buttons
// have event handles call function 

$(document).ready(function() {
    var storedHistory = localStorage.history;

    var savedHistory = $("<button>")
      .text(storedHistory)
      .addClass("form-control runFunction");
  
    $(previousSearch).append(savedHistory);



  $("#search-Btn").on("click", function () {
    var cityName = $("#cityInput").val();

    var apiKey = "=7b256f5f3c0045dd85a37bb7c20fe2fb";

    var fiveDayForecast =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityName +
      ",US&units=imperial&id=524901&APPID" +
      apiKey;

    console.log(fiveDayForecast);

    $.ajax({
      url: fiveDayForecast,
      method: "GET",
      dataType: "json"
    }).then(function(response) {
      //AtHumidityting to pull coordinates to use in a new query url, in another query url to get the UV index
      //Did you say query URL inside a Query URl??????

      var cityLat = $(response.city.coord.lat);
      var cityLon = $(response.city.coord.lon);

      console.log(cityLat[0], cityLon[0]);

      var uvIndexURL =
        "https://api.openweathermap.org/data/2.5/uvi?appid" +
        apiKey +
        "&lat=" +
        cityLat[0] +
        "&lon=" +
        cityLon[0];

      $.ajax(uvIndexURL, {
        method: "GET"
      }).then(function(otherResponse) {
        $(searchHistory).on("click", function() {
          var uvIndex = $("#UVindex");
          var currentIndex = $(otherResponse.value);
          $(uvIndex).text(otherResponse.value);
          // making if else loop to assign color class to uv index
          console.log(currentIndex[0]);
        });

        var uvIndex = $("#UVindex");
        var currentIndex = $(otherResponse.value);
        $(uvIndex).text(otherResponse.value);
        // making if else loop to assign color class to uv index
        console.log(currentIndex[0]);

        localStorage.uvIndex = otherResponse.value;

        if (currentIndex[0] < 2) {
          $(uvIndex.attr("class", "safe"));
        }
        if (currentIndex[0] > 2) {
          $(uvIndex.attr("class", "kindaSafe"));
        }
        if (currentIndex[0] > 5) {
          $(uvIndex.attr("class", "unSafe"));
        }
        if (currentIndex[0] > 7) {
          $(uvIndex.attr("class", "danger"));
        }
        if (currentIndex[0] > 10) {
          $(uvIndex.attr("class", "stayInside"));
        }
      });

      //Current Day
      var temperature = $("#temperature");
      var humidity = $("#humidity");
      var windSpeed = $("#windSpeed");
      var cityDisplay = $("#cityDisplay");

      //background
      var bodyBackground = $("#body");
      var imageSelector = response.list[0].weather[0].main;

      if (imageSelector === "Snow") {
        $(bodyBackground.attr("class", "snow"));
      }
      if (imageSelector === "Clouds") {
        $(bodyBackground.attr("class", "cloudy"));
      }
      if (imageSelector === "Rain") {
        $(bodyBackground.attr("class", "rain"));
      }
      if (imageSelector === "Clear") {
        $(bodyBackground.attr("class", "sunny"));
      }

      console.log(imageSelector);

      //Current Day Event Listeners
      $(temperature).text("Temperature: " + response.list[0].main.temp + " °F");
      $(humidity).text("Humidity:  " + response.list[0].main.humidity + "%");
      $(windSpeed).text("Wind Speed: " + response.list[0].wind.speed + " MPH");
      $(cityDisplay).text(response.city.name + "  " + moment().format("L"));

      //Forecast Day 1
      var forecastDay1 = $("#forecastDate1");
      var forecastTemp1 = $("#tempHumid1");
      var forecastHumidity1 = $("<p>").text(
        "Humidity:  " + response.list[7].main.humidity + "%"
      );
      var forecastIcon1 = response.list[7].weather[0].icon;
      var forecastIcon1src =
        "http://openweathermap.org/img/wn/" + forecastIcon1 + "@2x.png";

      // Event Listeners 1
      $(forecastDay1).text(
        moment()
          .add(1, "days")
          .format("L")
      );
      $(forecastDay1).append(`<img src=${forecastIcon1src}>`);
      $(forecastTemp1)
        .text("Temperature: " + response.list[7].main.temp + " °F")
        .append(forecastHumidity1);

      //Forecast Day 2
      var forecastDay2 = $("#forecastDate2");
      var forecastTemp2 = $("#tempHumid2");
      var forecastHumidity2 = $("<p>").text(
        "Humidity:  " + response.list[15].main.humidity + "%"
      );
      var forecastIcon2 = response.list[15].weather[0].icon;
      var forecastIcon2src =
        "http://openweathermap.org/img/wn/" + forecastIcon2 + "@2x.png";

      // Event Listeners 2
      $(forecastDay2).text(
        moment()
          .add(2, "days")
          .format("L")
      );
      $(forecastDay2).append(`<img src=${forecastIcon2src}>`);
      $(forecastTemp2)
        .text("Temperature: " + response.list[15].main.temp + " °F")
        .append(forecastHumidity2);

      //Forecast Day 3
      var forecastDay3 = $("#forecastDate3");
      var forecastTemp3 = $("#tempHumid3");
      var forecastHumidity3 = $("<p>").text(
        "Humidity:  " + response.list[23].main.humidity + "%"
      );
      var forecastIcon3 = response.list[23].weather[0].icon;
      var forecastIcon3src =
        "http://openweathermap.org/img/wn/" + forecastIcon3 + "@2x.png";

      // Event Listeners 3
      $(forecastDay3).text(
        moment()
          .add(3, "days")
          .format("L")
      );
      $(forecastDay3).append(`<img src=${forecastIcon3src}>`);
      $(forecastTemp3)
        .text("Temperature: " + response.list[23].main.temp + " °F")
        .append(forecastHumidity3);

      //Forecast Day 4
      var forecastDay4 = $("#forecastDate4");
      var forecastTemp4 = $("#tempHumid4");
      var forecastHumidity4 = $("<p>").text(
        "Humidity:  " + response.list[31].main.humidity + "%"
      );
      var forecastIcon4 = response.list[31].weather[0].icon;
      var forecastIcon4src =
        "http://openweathermap.org/img/wn/" + forecastIcon4 + "@2x.png";

      // Event Listeners 4
      $(forecastDay4).text(
        moment()
          .add(4, "days")
          .format("L")
      );
      $(forecastDay4).append(`<img src=${forecastIcon4src}>`);
      $(forecastTemp4)
        .text("Temperature: " + response.list[31].main.temp + " °F")
        .append(forecastHumidity4);

      //Forecast Day 5
      var forecastDay5 = $("#forecastDate5");
      var forecastTemp5 = $("#tempHumid5");
      var forecastHumidity5 = $("<p>").text(
        "Humidity:  " + response.list[39].main.humidity + "%"
      );
      var forecastIcon5 = response.list[39].weather[0].icon;
      var forecastIcon5src =
        "http://openweathermap.org/img/wn/" + forecastIcon5 + "@2x.png";

      // Event Listeners 5
      $(forecastDay5).text(
        moment()
          .add(5, "days")
          .format("L")
      );
      $(forecastDay5).append(`<img src=${forecastIcon5src}>`);
      $(forecastTemp5)
        .text("Temperature: " + response.list[39].main.temp + " °F")
        .append(forecastHumidity5);

      // Search History
      var previousSearch = $("#previousSearch");
      var searchHistory = $("<button>")
        .text(cityName)
        .text(cityName)
        .addClass("form-control runFunction");
      localStorage.history = $(searchHistory).html();
      $(previousSearch).append(searchHistory);

    });
  });

  $(document).on("click",".runFunction", function () {


    var apiKey = "=7b256f5f3c0045dd85a37bb7c20fe2fb";
    var cityName = $(this).text()
    var fiveDayForecast =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityName +
      ",US&units=imperial&id=524901&APPID" +
      apiKey;

    console.log(fiveDayForecast);

    $.ajax({
      url: fiveDayForecast,
      method: "GET",
      dataType: "json"
    }).then(function(response) {

      //AtHumidityting to pull coordinates to use in a new query url, in another query url to get the UV index
      //Did you say query URL inside a Query URl??????

      var cityLat = $(response.city.coord.lat);
      var cityLon = $(response.city.coord.lon);

      console.log(cityLat[0], cityLon[0]);

      var uvIndexURL =
        "https://api.openweathermap.org/data/2.5/uvi?appid" +
        apiKey +
        "&lat=" +
        cityLat[0] +
        "&lon=" +
        cityLon[0];

      $.ajax(uvIndexURL, {
        method: "GET"
      }).then(function(otherResponse) {
          var uvIndex = $("#UVindex");
          var currentIndex = $(otherResponse.value);
          $(uvIndex).text(otherResponse.value);
          // making if else loop to assign color class to uv index
          console.log(currentIndex[0]);
    //Current Day
    var temperature = $("#temperature");
    var humidity = $("#humidity");
    var windSpeed = $("#windSpeed");
    var cityDisplay = $("#cityDisplay");

    //background
    var bodyBackground = $("#body");
    var imageSelector = response.list[0].weather[0].main;
    if (imageSelector === "Snow") {
      $(bodyBackground.attr("class", "snow"));
    }
    if (imageSelector === "Clouds") {
      $(bodyBackground.attr("class", "cloudy"));
    }
    if (imageSelector === "Rain") {
      $(bodyBackground.attr("class", "rain"));
    }
    if (imageSelector === "Clear") {
      $(bodyBackground.attr("class", "sunny"));
    }

    //Current Day Event Listeners
    $(temperature).text(
      "Temperature: " + response.list[0].main.temp + " °F"
    );
    $(humidity).text("Humidity:  " + response.list[0].main.humidity + "%");
    $(windSpeed).text(
      "Wind Speed: " + response.list[0].wind.speed + " MPH"
    );
    $(cityDisplay).text(response.city.name + "  " + moment().format("L"));

    //Forecast Day 1
    var forecastDay1 = $("#forecastDate1");
    var forecastTemp1 = $("#tempHumid1");
    var forecastHumidity1 = $("<p>").text(
      "Humidity:  " + response.list[7].main.humidity + "%"
    );
    var forecastIcon1 = response.list[7].weather[0].icon;
    var forecastIcon1src =
      "http://openweathermap.org/img/wn/" + forecastIcon1 + "@2x.png";

    // Event Listeners 1
    $(forecastDay1).text(
      moment()
        .add(1, "days")
        .format("L")
    );
    $(forecastDay1).append(`<img src=${forecastIcon1src}>`);
    $(forecastTemp1)
      .text("Temperature: " + response.list[7].main.temp + " °F")
      .append(forecastHumidity1);

    //Forecast Day 2
    var forecastDay2 = $("#forecastDate2");
    var forecastTemp2 = $("#tempHumid2");
    var forecastHumidity2 = $("<p>").text(
      "Humidity:  " + response.list[15].main.humidity + "%"
    );
    var forecastIcon2 = response.list[15].weather[0].icon;
    var forecastIcon2src =
      "http://openweathermap.org/img/wn/" + forecastIcon2 + "@2x.png";

    // Event Listeners 2
    $(forecastDay2).text(
      moment()
        .add(2, "days")
        .format("L")
    );
    $(forecastDay2).append(`<img src=${forecastIcon2src}>`);
    $(forecastTemp2)
      .text("Temperature: " + response.list[15].main.temp + " °F")
      .append(forecastHumidity2);

    //Forecast Day 3
    var forecastDay3 = $("#forecastDate3");
    var forecastTemp3 = $("#tempHumid3");
    var forecastHumidity3 = $("<p>").text(
      "Humidity:  " + response.list[23].main.humidity + "%"
    );
    var forecastIcon3 = response.list[23].weather[0].icon;
    var forecastIcon3src =
      "http://openweathermap.org/img/wn/" + forecastIcon3 + "@2x.png";

    // Event Listeners 3
    $(forecastDay3).text(
      moment()
        .add(3, "days")
        .format("L")
    );
    $(forecastDay3).append(`<img src=${forecastIcon3src}>`);
    $(forecastTemp3)
      .text("Temperature: " + response.list[23].main.temp + " °F")
      .append(forecastHumidity3);

    //Forecast Day 4
    var forecastDay4 = $("#forecastDate4");
    var iconDay4 = $("#icon4");
    var forecastTemp4 = $("#tempHumid4");
    var forecastHumidity4 = $("<p>").text(
      "Humidity:  " + response.list[31].main.humidity + "%"
    );
    var forecastIcon4 = response.list[31].weather[0].icon;
    var forecastIcon4src =
      "http://openweathermap.org/img/wn/" + forecastIcon4 + "@2x.png";

    // Event Listeners 4
    $(forecastDay4).text(
      moment()
        .add(4, "days")
        .format("L")
    );
    $(forecastDay4).append(`<img src=${forecastIcon4src}>`);
    $(forecastTemp4)
      .text("Temperature: " + response.list[31].main.temp + " °F")
      .append(forecastHumidity4);

    //Forecast Day 5
    var forecastDay5 = $("#forecastDate5");
    var forecastTemp5 = $("#tempHumid5");
    var forecastHumidity5 = $("<p>").text(
      "Humidity:  " + response.list[39].main.humidity + "%"
    );
    var forecastIcon5 = response.list[39].weather[0].icon;
    var forecastIcon5src =
      "http://openweathermap.org/img/wn/" + forecastIcon5 + "@2x.png";

    // Event Listeners 5
    $(forecastDay5).text(
      moment()
        .add(5, "days")
        .format("L")
    );
    $(forecastDay5).append(`<img src=${forecastIcon5src}>`);
    $(forecastTemp5)
      .text("Temperature: " + response.list[39].main.temp + " °F")
      .append(forecastHumidity5);

    // UV index background color using local storage
    var uvIndex = $("#UVindex");
    var uvStorage = localStorage.uvIndex;

    $(uvIndex).text(uvStorage);

    if (uvStorage < 2) {
      $(uvIndex.attr("class", "safe"));
    }
    if (uvStorage > 2) {
      $(uvIndex.attr("class", "kindaSafe"));
    }
    if (uvStorage > 5) {
      $(uvIndex.attr("class", "unSafe"));
    }
    if (uvStorage > 7) {
      $(uvIndex.attr("class", "danger"));
    }
    if (uvStorage > 10) {
      $(uvIndex.attr("class", "stayInside"));
    }
  });
});
});
});
