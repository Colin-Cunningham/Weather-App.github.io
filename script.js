
    var storedHistory = localStorage.history 

    var savedHistory = $("<button>").text(storedHistory).addClass("form-control")



  $( document ).ready(function() {
    $(previousSearch).append(savedHistory)   
});


$("#search-Btn").on("click", function (){
    var cityName = $("#cityInput").val();


var apiKey = "=7b256f5f3c0045dd85a37bb7c20fe2fb"

var fiveDayForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + ",US&units=imperial&id=524901&APPID" + apiKey


console.log(fiveDayForecast);



$.ajax({
    url: fiveDayForecast,
    method: "GET",
    dataType: 'json',
}).then(function(response){
       
   
        //AtHumidityting to pull coordinates to use in a new query url, in another query url to get the UV index 
        //Did you say query URL inside a Query URl??????
        
        var cityLat= $(response.city.coord.lat)
        var cityLon= $(response.city.coord.lon)
        
        console.log(cityLat[0], cityLon[0])
        
        var uvIndexURL = "https://api.openweathermap.org/data/2.5/uvi?appid" + apiKey + "&lat=" + cityLat[0] +  "&lon=" + cityLon[0]


        $.ajax({
            url: uvIndexURL,
            method: "GET"
        }).then(function(otherResponse){
          
            $(searchHistory).on("click", function(){
                var uvIndex= $("#UVindex")
                var currentIndex= $(otherResponse.value)
                $(uvIndex).text(otherResponse.value)
                // making if else loop to assign color class to uv index
                console.log(currentIndex[0])
               
                if( currentIndex[0] < 2){
                    console.log("safe")
                 uvIndex.addClass('safe')
                }
                else{ if( 2 < currentIndex[0] < 5){
                    console.log("safe")
                uvIndex.addClass('kindaSafe')
                    }else{if( currentIndex[0] < 7){
                    uvIndex.addClass('unSafe')
                    }else{if(currentIndex[0] < 10){
                        uvIndex.addClass('danger')
                    }else{uvIndex.addClass('stayInside')}}
    
                    }  
                }
            
            
            })
           
            var uvIndex= $("#UVindex")
            var currentIndex= $(otherResponse.value)
            $(uvIndex).text(otherResponse.value)
            // making if else loop to assign color class to uv index
            console.log(currentIndex[0])
           
            if( currentIndex[0] < 2){
                console.log("safe")
             uvIndex.addClass('safe')
            }
            else{ if( 2 < currentIndex[0] < 5){
                console.log("safe")
            uvIndex.addClass('kindaSafe')
                }else{if( currentIndex[0] < 7){
                uvIndex.addClass('unSafe')
                }else{if(currentIndex[0] < 10){
                    uvIndex.addClass('danger')
                }else{uvIndex.addClass('stayInside')}}

                }  
            }

        })

       
       
        var previousSearch = $("#previousSearch");
        var searchHistory = $("<button>").text(cityName).text(cityName).addClass("form-control")
        var temperature = $("#temperature")
        var humidity = $('#humidity')
        var windSpeed = $("#windSpeed")
        var cityDisplay = $("#cityDisplay")
        var forecastDay1 = $("#forecastDate1")
        var forecastDay2 = $("#forecastDate2")
        var forecastDay3 = $("#forecastDate3")
        var forecastDay4 = $("#forecastDate4")
        var forecastDay5 = $("#forecastDate5")
        var forecastTemp1 = $("#tempHumid1")
        var forecastTemp2 = $("#tempHumid2")
        var forecastTemp3 = $("#tempHumid3")
        var forecastTemp4 = $("#tempHumid4")
        var forecastTemp5 = $("#tempHumid5")
        var forecastHumidity1 = $("<p>").text("Humidity:  " + response.list[7].main.humidity + "%")
        var forecastHumidity2 = $("<p>").text("Humidity:  " + response.list[15].main.humidity + "%")
        var forecastHumidity3 = $("<p>").text("Humidity:  " + response.list[23].main.humidity + "%")
        var forecastHumidity4 = $("<p>").text("Humidity:  " + response.list[31].main.humidity + "%")
        var forecastHumidity5 = $("<p>").text("Humidity:  " + response.list[39].main.humidity + "%")
        var forecastIcon1 = $(response.list[7].weather[0])
        var forecastIcon1txt = forecastIcon1[0].icon
        var forecastIcon1src= "http://openweathermap.org/img/wn/" + forecastIcon1txt + "@2x.png" 
        
        console.log(forecastIcon1src)
      




        
        
        localStorage.history = $(searchHistory).html();


        
       
       
        
         //Event listeners


        $(temperature).text("Temperature: " + response.list[0].main.temp + " °F");
        $(humidity).text("Humidity:  " + response.list[0].main.humidity + "%")
        $(windSpeed).text("Wind Speed: "+ response.list[0].wind.speed + " MPH"  )
        $(cityDisplay).text(response.city.name + "  " + (moment().format('L')))

        $(forecastDay1).text(moment().add(1, 'days').format('L'))
        $(forecastDay2).text(moment().add(2, 'days').format('L'))
        $(forecastDay3).text(moment().add(3, 'days').format('L'))
        $(forecastDay4).text(moment().add(4, 'days').format('L'))
        $(forecastDay5).text(moment().add(5, 'days').format('L'))
        $(forecastTemp1).text("Temperature: "+ response.list[7].main.temp + " °F").append(forecastHumidity1)
        $(forecastTemp2).text("Temperature: "+ response.list[15].main.temp + " °F").append(forecastHumidity2)
        $(forecastTemp3).text("Temperature: "+ response.list[23].main.temp + " °F").append(forecastHumidity3)
        $(forecastTemp4).text("Temperature: "+ response.list[31].main.temp + " °F").append(forecastHumidity4)
        $(forecastTemp5).text("Temperature: "+ response.list[39].main.temp + " °F").append(forecastHumidity5)
       
        console.log(response.list[24].main.temp)
        
        $(previousSearch).append(searchHistory); 
        
       
        
    $(searchHistory).on("click", function fetchWeather(){
        var temperature = $("#temperature")
        var humidity = $('#humidity')
        var windSpeed = $("#windSpeed")
        var cityDisplay = $("#cityDisplay")
        var forecastDay1 = $("#forecastDate1")
        var forecastDay2 = $("#forecastDate2")
        var forecastDay3 = $("#forecastDate3")
        var forecastDay4 = $("#forecastDate4")
        var forecastDay5 = $("#forecastDate5")
        var forecastTemp1 = $("#tempHumid1")
        var forecastTemp2 = $("#tempHumid2")
        var forecastTemp3 = $("#tempHumid3")
        var forecastTemp4 = $("#tempHumid4")
        var forecastTemp5 = $("#tempHumid5")
        var forecastHumidity1 = $("<p>").text("Humidity:  " + response.list[7].main.humidity + "%")
        var forecastHumidity2 = $("<p>").text("Humidity:  " + response.list[15].main.humidity + "%")
        var forecastHumidity3 = $("<p>").text("Humidity:  " + response.list[23].main.humidity + "%")
        var forecastHumidity4 = $("<p>").text("Humidity:  " + response.list[31].main.humidity + "%")
        var forecastHumidity5 = $("<p>").text("Humidity:  " + response.list[39].main.humidity + "%")
        var forecastIcon1 = $(response.list[7].weather[0])
        var forecastIcon1txt = forecastIcon1[0].icon
        var forecastIcon1src= "https://openweathermap.org/img/wn/" + forecastIcon1txt + "@2x.png" 



        $(temperature).text("Temperature: " + response.list[0].main.temp + " °F");
        $(humidity).text("Humidity:  " + response.list[0].main.humidity + "%")
        $(windSpeed).text("Wind Speed: "+ response.list[0].wind.speed + " MPH"  )
        $(cityDisplay).text(response.city.name + "  " + (moment().format('L')))

        $(forecastDay1).text(moment().add(1, 'days').format('L'))
        $(forecastDay2).text(moment().add(2, 'days').format('L'))
        $(forecastDay3).text(moment().add(3, 'days').format('L'))
        $(forecastDay4).text(moment().add(4, 'days').format('L'))
        $(forecastDay5).text(moment().add(5, 'days').format('L'))
        $(forecastTemp1).text("Temperature: "+ response.list[7].main.temp + " °F").append(forecastHumidity1)
        $(forecastTemp2).text("Temperature: "+ response.list[15].main.temp + " °F").append(forecastHumidity2)
        $(forecastTemp3).text("Temperature: "+ response.list[23].main.temp + " °F").append(forecastHumidity3)
        $(forecastTemp4).text("Temperature: "+ response.list[31].main.temp + " °F").append(forecastHumidity4)
        $(forecastTemp5).text("Temperature: "+ response.list[39].main.temp + " °F").append(forecastHumidity5)
    })
    
  
});
})

