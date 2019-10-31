// See post: http://asmaloney.com/2015/06/code/clustering-markers-on-leaflet-maps

var map = L.map( 'mapNaples'.setView([51.505, -0.09], 13), {
  /*center: [10.0, 5.0],
  minZoom: 2,
  zoom: 2*/
});

/*L.tileLayer( 'http://{s}.tile.openstreetmap.org/{1}/{2}/{3}.png', {
 attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
 subdomains: ['a','b','c']
}).addTo( map );*/

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  maxZoom: 18,  
  id: 'mapbox.streets',
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, '
  +' <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '
  +' Imagery © <a href="https://www.mapbox.com/">Mapbox</a>,',
	accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

/*var myURL = jQuery( 'script[src$="leaf-demo.js"]' ).attr( 'src' ).replace( 'leaf-demo.js', '' );

var myIcon = L.icon({
  iconUrl: myURL + 'images/pin24.png',
  iconRetinaUrl: myURL + 'images/pin48.png',
  iconSize: [29, 24],
  iconAnchor: [9, 21],
  popupAnchor: [0, -14]
});

var markerClusters = L.markerClusterGroup();

for ( var i = 0; i < markers.length; ++i )
{
  var popup = markers[i].name +
              '<br/>' + markers[i].city +
              '<br/><b>IATA/FAA:</b> ' + markers[i].iata_faa +
              '<br/><b>ICAO:</b> ' + markers[i].icao +
              '<br/><b>Altitude:</b> ' + Math.round( markers[i].alt * 0.3048 ) + ' m' +
              '<br/><b>Timezone:</b> ' + markers[i].tz;

  var m = L.marker( [markers[i].lat, markers[i].lng], {icon: myIcon} )
                  .bindPopup( popup );

  markerClusters.addLayer( m );
}

map.addLayer( markerClusters );  */
