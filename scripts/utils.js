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
    return(url);
  }

  export {kelvinToFahrenheit, getWeatherIcon,getWeatherLocationUrl};