let weather = {
    apiKey: "97a184426a975734719cb8c34371ffa1",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+this.apiKey
        ).then((response) => {
          if (!response.ok) {
            alert("No weather for city: " + city+" found.");
            throw new Error("No weather for city: " + city+" found.");
          }
          return response.json();
        })
        .then((data) => this.weatherDikha(data));
    },
    weatherDikha: function (data) {
       // console.log('data==>',data);
        const{name}=data;
        const{icon,description}=data.weather[0];
        const{temp,humidity}=data.main;
        const{speed}=data.wind;
        const{feels_like} = data.main;
        //console.log(name,icon,description,temp,humidity,speed);
        document.querySelector('.weather').innerHTML = "Weather in " + name;
        document.querySelector('.temp').innerHTML = temp + "°C";
        document.querySelector('.icon').src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector('.wtype').innerHTML = description;
        document.querySelector('.feelslike').innerHTML = "Feels like: " + feels_like;
        document.querySelector('.hum').innerHTML = "Humidity: " + humidity +"%";
        document.querySelector('.wspe').innerHTML = "Wind Speed: " + speed + " kmph";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".find-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click",function () {
weather.search();
});
  
document.querySelector(".find-bar").addEventListener("keyup", function (event) {
      if(event.key == "Enter") {weather.search();}
});