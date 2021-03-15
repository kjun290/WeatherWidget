var APIkey = "8d29c505e651ca1dba97c11af2422828";

$(document).ready(function() {
  $("#search-button").on("click", function() {
    let city = $("#search-value").val();
    searchCityWeather(city);
  });

function searchCityWeather(city) {
  $.ajax({
    type: "GET",
    url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=imperial`,
    datatype: "json",
    success: function(data) {
      console.log(data);
      var card = $('<div>');
      var tempEl = $('<h4>');
      var humidityEl = $('<h4>');
      var windEl = $('<h4>');

      
    // DISPLAY CITY NAME & DATE
      
      tempEl.text('Temperature: ' + data.main.temp + ' F');
      humidityEl.text('Humidity: ' + data.main.humidity + '%');
      windEl.text('Wind Speed: ' + data.wind.speed + ' MPH');

      
      var img = $('<img>').attr('src', 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png')



      card.append(tempEl, humidityEl, windEl, img);
      $('#current-weather').append(card)

    //   $("#tw-city_name").text(data["name"]);
    //  $("#tw-temp").text("TEMP: "  + data["main"]["temp"] + " F");
    //   $("#tw-humidity").text("HUMIDITY: " + data["main"]["humidity"] + "%");
    //   $("#tw-wind_speed").text("WIND SPEED: " + data["wind"]) + "MPH";
    //   $("#tw-UV").text("UV INDEX: " + data["UV"]);





      fivedayForecast(city)
      
      }

   })

  }



  
function fivedayForecast(city) {
  $.ajax({
    type: "GET",
    url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}&units=imperial`,
    datatype: "json",
    success: function (data) {
      console.log (data);
     
    for (let i = 0; i < data.list.length; i++) {
     
     if(data.list[i].dt_txt.indexOf('12:00:00') !== -1){
       console.log(data.list[i])

       //create elements
       var card = $('<div>').addClass('card text-white bg-primary mb-3');
       var dateEl = $('<p>').text(data.list[i].dt_txt);
      var tempEl = $('<p>').text("Temps "  + data.list[i].main.temp + 'F');
      var humidityEl = $('<p>').text("Humidity " + data.list[i].main.humidity + '%')
      var windEl = $('<p>').text("Wind Speed " + data.list[i].wind.speed + 'MPH')


      var img = $('<img>').attr('src', 'https://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png')
      card.append(dateEl, tempEl, humidityEl, windEl, img)
       //attach data to those elements
       //append to html
       $('#forecast').append(card)





     };
      
    }
    }
  })
}
});


