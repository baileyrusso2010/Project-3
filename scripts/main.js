     import * as request from './requests.js';

    /* window.onload = init;*/
    
     let map;
     let geocoder;
     let results;

     function init(){

        mapboxgl.accessToken = 'pk.eyJ1IjoiYmFpbGV5cnVzc28iLCJhIjoiY2toZmJhNXIwMG9teTJ4bHlibmw3ampoZSJ9.zD80yks6NLPBJ66YjmrMKA';
          map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [-97.922211, 39.381266],
          zoom: 4
          });

          map.setStyle('mapbox://styles/mapbox/light-v10');
          

          geocoder = map.addControl(
            new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            marker: false,
            mapboxgl: mapboxgl,
            placeholder: 'Search for places in the United States',
            getItemValue: e => {
           //   console.log(getNames(e.text ,e.context[0].text));
           //console.log(e)
              let name = e.text + ", " + e.context[0].text;
              let long = e.geometry.coordinates[0];
              let lat = e.geometry.coordinates[1];
              request.createMarker(lat, long, name, map, true);

            }

          })
          );


          map.on('zoom', function(e){
            
            // if(map.getZoom().toFixed(0) > 7){
            //   let center = map.getCenter();
            //   request.getCitiesNearLocation(center.lat, center.lng, map);
            // }
          });


          document.querySelector("#close").onclick = function(){
            document.querySelector(".row").innerHTML = "";
            document.querySelector("#close").style.display = "none";
          
          };


          request.addMarkers(map);

          request.getLocalCities(map);
          //createCards();
     }//end of init
     
  function getNames(city, state){

    //found this helpful abbreviation code https://gist.github.com/calebgrove/c285a9510948b633aa47
      let states = [
          ['Alabama', 'AL'],
          ['Alaska', 'AK'],
          ['Arizona', 'AZ'],
          ['Arkansas', 'AR'],
          ['California', 'CA'],
          ['Colorado', 'CO'],
          ['Connecticut', 'CT'],
          ['Delaware', 'DE'],
          ['District Of Columbia', 'DC'],
          ['Florida', 'FL'],
          ['Georgia', 'GA'],
          ['Guam', 'GU'],
          ['Hawaii', 'HI'],
          ['Idaho', 'ID'],
          ['Illinois', 'IL'],
          ['Indiana', 'IN'],
          ['Iowa', 'IA'],
          ['Kansas', 'KS'],
          ['Kentucky', 'KY'],
          ['Louisiana', 'LA'],
          ['Maine', 'ME'],
          ['Marshall Islands', 'MH'],
          ['Maryland', 'MD'],
          ['Massachusetts', 'MA'],
          ['Michigan', 'MI'],
          ['Minnesota', 'MN'],
          ['Mississippi', 'MS'],
          ['Missouri', 'MO'],
          ['Montana', 'MT'],
          ['Nebraska', 'NE'],
          ['Nevada', 'NV'],
          ['New Hampshire', 'NH'],
          ['New Jersey', 'NJ'],
          ['New Mexico', 'NM'],
          ['New York', 'NY'],
          ['North Carolina', 'NC'],
          ['North Dakota', 'ND'],
          ['Northern Mariana Islands', 'NP'],
          ['Ohio', 'OH'],
          ['Oklahoma', 'OK'],
          ['Oregon', 'OR'],
          ['Pennsylvania', 'PA'],
          ['Puerto Rico', 'PR'],
          ['Rhode Island', 'RI'],
          ['South Carolina', 'SC'],
          ['South Dakota', 'SD'],
          ['Tennessee', 'TN'],
          ['Texas', 'TX'],
          ['US Virgin Islands', 'VI'],
          ['Utah', 'UT'],
          ['Vermont', 'VT'],
          ['Virginia', 'VA'],
          ['Washington', 'WA'],
          ['West Virginia', 'WV'],
          ['Wisconsin', 'WI'],
          ['Wyoming', 'WY'],
      ];

      for(let i = 0; i < states.length; i++){
        if(states[i][0] == state)
          return states[i][1];
      }

      return null;
  }

export {init};