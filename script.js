

$("#search-Btn").on("click", function(){
    var cityName = $("#cityInput").val();


var apiKey = "=7b256f5f3c0045dd85a37bb7c20fe2fb"

var queryURL = "http://api.openweathermap.org/data/2.5/forecast?" + cityName + ",US&units=imperial&id=524901&APPID" + apiKey


console.log(queryURL);

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
       
        var previousSearch = $("#previousSearch");
        var searchHistory = $("<button>").text(cityName).text(cityName).addClass("form-control");
        console.log((searchHistory).text())
        // var headline = $("<h5>").text(response.response.docs[i].headline.main);
        // var subtitle = $("<p>").text(response.response.docs[i].snippet);

        $(previousSearch).append(searchHistory);      
    
});
})
