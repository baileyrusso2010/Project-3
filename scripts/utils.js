function kelvinToFahrenheit(kelvin){

  let convert = (kelvin - 273.15) * 9/5 + 32;
  return convert.toFixed(0);

}

function getWeatherIcon(icon){

    let url = "http://openweathermap.org/img/wn/";
    url += icon;
    url += "@2x.png";
    return url;

  }

  //gets the location call
  function getWeatherLocationUrl(lat, long, key){

    lat = lat.toString();
    long = long.toString();

    let url = "https://api.openweathermap.org/data/2.5/onecall?";

    url += "lat=" + lat + "&";
    url += "lon=" + long;
    url += "&exclude=hourly&appid=" + key;
    return url;
  }

  function unixToRegularTime(time){

    const milliseconds = time * 1000;
    const date = new Date(milliseconds);
    const humanDateFormat = date.toLocaleString();
    return humanDateFormat.split(',')[0];
  
  }

  function createCards(date, data){

    let node = document.querySelector(".row");
    node.innerHTML = "";


    for(let i = 0; i < data.daily.length; i ++){
  
      let row = document.querySelector(".row");

      let col = document.createElement("div");
      col.classList.add('column'); 
      
      let card = document.createElement("div");
      card.classList.add('card'); 
      
      let header = document.createElement("h3");
      header.innerHTML = unixToRegularTime(data.daily[i].dt);
      card.appendChild(header);

      let weather = document.createElement("p");
      weather.innerHTML = kelvinToFahrenheit(data.daily[i].temp.day) + '°F';
      card.appendChild(weather);

      let img = document.createElement("img");
      let url = getWeatherIcon(data.daily[i].weather[0].icon);
      img.src = url;
      card.appendChild(img);


      col.appendChild(card);
      row.appendChild(col);

    }
    document.querySelector("#close").style.display = "block";

  }

  export {kelvinToFahrenheit, getWeatherIcon,getWeatherLocationUrl, unixToRegularTime, createCards};