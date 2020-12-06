     import * as request from './requests.js';

    /* window.onload = init;*/
    
      let map;

     function init(){

      let image = "http://openweathermap.org/img/wn/10d@2x.png";

        mapboxgl.accessToken = 'pk.eyJ1IjoiYmFpbGV5cnVzc28iLCJhIjoiY2toZmJhNXIwMG9teTJ4bHlibmw3ampoZSJ9.zD80yks6NLPBJ66YjmrMKA';
          map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [-97.922211, 39.381266],
          zoom: 4
          });
          
          let geocoder = map.addControl(
            new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
          })
          
          );
          geocoder.on('results', function(results) {
            console.log(results);
         })

          map.setStyle('mapbox://styles/mapbox/light-v10');

          map.on('zoom', function(e){
            
            if(map.getZoom().toFixed(0) > 7){
              let center = map.getCenter();
              request.getCitiesNearLocation(center.lat, center.lng, map);
            }
          });


          request.addMarkers(map);

          request.getLocalCities(map);
     }//end of init



export {init};