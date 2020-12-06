import * as utils from './utils.js';

let key = 'd55f0e68732ef86779d5a71799a5e5f5';


function getCitiesNearLocation(lat, long, map){

    const data = null;
  
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
  
    xhr.addEventListener("readystatechange", function () {
     
      if (this.readyState === this.DONE) {
        let data = JSON.parse(this.responseText).data;
  
        if(data.length == 0 || data.length == undefined){return};
  
        for(let i =0; i < data.length; i++){
         // document.querySelector("#test").innerHTML +=  JSON.parse(this.responseText).data[i].city + '<BR>';
          let lat = data[i].latitude;
          let long = data[i].longitude;
          let city = data[i].city;
          createMarker(lat, long, city, map);
  
        }
  
      }
    });
  
    xhr.open("GET", "https://wft-geo-db.p.rapidapi.com/v1/geo/locations/"+lat + long +"/nearbyCities?radius=100&minPopulation=100000&countryIds=US");
    xhr.setRequestHeader("x-rapidapi-key", "bb598cfb45msh99ab05706963f39p158adfjsn1ed74d9a0b95");
    xhr.setRequestHeader("x-rapidapi-host", "wft-geo-db.p.rapidapi.com");
  
    xhr.send(data);
  
  
  }
  
  function getLocalCities(map){
    const data = null;
  
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
  
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        //console.log(this.responseText);
        
      }
    });
  
    xhr.open("GET", "https://wft-geo-db.p.rapidapi.com/v1/geo/locations/42.9981-78.1875/nearbyCities?radius=20&limit=5");
    xhr.setRequestHeader("x-rapidapi-key", "bb598cfb45msh99ab05706963f39p158adfjsn1ed74d9a0b95");
    xhr.setRequestHeader("x-rapidapi-host", "wft-geo-db.p.rapidapi.com");
  
    xhr.send(data);
  }
  
  
  function addMarkers(map){
      
  //  .style.backgroundImage = "url(" + img.src + ")";
  
    const data = null;
  
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
  
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
  
        let data = JSON.parse(this.responseText).data;
        console.log(JSON.parse(this.responseText).data);
  
        let lat, long, city;
  
        for(let i =0; i < data.length; i++){
         // document.querySelector("#test").innerHTML +=  JSON.parse(this.responseText).data[i].city + '<BR>';
          lat = data[i].latitude;
          long = data[i].longitude;
          city = data[i].city;
          createMarker(lat, long, city, map);
  
        }
  
      //document.body.style.backgroundImage = "url(" + img.src + ")";
      }
    });
  
    xhr.open("GET", "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=100&countryIds=US&minPopulation=500000&types=CITY");
    xhr.setRequestHeader("x-rapidapi-key", "bb598cfb45msh99ab05706963f39p158adfjsn1ed74d9a0b95");
    xhr.setRequestHeader("x-rapidapi-host", "wft-geo-db.p.rapidapi.com");
  
    xhr.send(data);
  
  }//end of endMarkers
  
  function createMarker(lat ,long, city, map){
  
        key = 'd55f0e68732ef86779d5a71799a5e5f5';
  
        fetch(utils.getWeatherLocationUrl(lat, long, key))
        .then(function(resp){return resp.json();  })
        .then(function(data){
  
          let temp = utils.kelvinToFahrenheit(data.current.temp);
          //console.log(getWeatherIcon(data.daily[0].weather[0].icon));
          let img = new Image();
            
          img.src = utils.getWeatherIcon(data.daily[0].weather[0].icon);
  
          let mk = document.createElement('div');
          mk.style.backgroundImage = "url(" + img.src + ")";
          mk.style.backgroundSize = "cover";
          mk.style.width = "50px";
          mk.style.height = "50px";
          mk.style.cursor = "pointer";
          
          let marker = new mapboxgl.Marker(mk)
          .setLngLat([long, lat])
          .setPopup(new mapboxgl.Popup({offset: 25})
          .setHTML('<h3>' + city + '<h3>' + '<p>' + temp + '°F' + '<p>'))
          .addTo(map);
        }).catch(function(){
  
        });
      
  }//end of CreateMarker

function createCol(){

  let col = document.createElement('div');
  col.classList.add("column").classList.add("row")

}

export {addMarkers,getLocalCities,getCitiesNearLocation};