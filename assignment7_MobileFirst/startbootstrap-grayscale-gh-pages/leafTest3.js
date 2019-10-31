
//L. is for calling functions in the "leaflet library",which is loaded in <head>.
//var mapboxTiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a>', maxZoom: 18});
 
// group airtable data 
var spots = L.layerGroup();
//fetch data from airtable API
var items = [];
var airtable_read_endpoint = "https://api.airtable.com/v0/appPtteomIFN2f4tZ/Destination%20Details?api_key=keysAky6ucMNj4qo4";
var data = [];
$.getJSON(airtable_read_endpoint, function(result) {
       $.each(result.records, function(key,value) {
           items = {};
            items["Destination"]=value.fields.Destination;   //no space when naming the fields. 
            items["picUrl"]=value.fields.picUrl; 
            items["lat"]=value.fields.lat; 
            items["lng"]=value.fields.lng; 
            data.push(items);
            console.log(items);
        }); // end .each
        
        //show markers and popup 
        for (var i in data) {
            var latlng = L.latLng({ lat: data[i].lat, lng: data[i].lng});
            L.marker( latlng )
                .bindPopup(data[i].Destination + '<br><img src="' + data[i].picUrl+'" width = "80px" >')   //圖片文字居中? how to use hover to show popup?
                .addTo(spots);  //addTo(map);
        }
}); // end getJSON


var mbAttr = 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a>, '+'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
     mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoiam95Y2VsZWVjdWhrIiwiYSI6ImNrMmRlN29nYTI1eHAzY2xzM3V6dHFxamoifQ.QIW1qp-AFcGHJxmUjHo1XA';  //get default public token on: https://account.mapbox.com/
 
// 定義了兩個mapboxTiles  mapID   
var outdoors = L.tileLayer(mbUrl, {id: 'mapbox.streets', attribution: mbAttr}), // find id in this site: https://www.mapbox.com/maps/streets/ (the "streets" layer looks like "outdoors" more than street..)
   satellite = L.tileLayer(mbUrl, {id: 'mapbox.satellite', attribution: mbAttr});

/*var map = L.map('Mainmap')  
      .addLayer(mapboxTiles)
      //.setView([ 40.8438, 14.2477], 13.3);
      .setView([ 42.7100, 12.5674], 6.2);*/

var map = L.map('Mainmap', {     //draw a default map 
	center: [42.7100, 12.5674],
    zoom: 6.2,

	layers: [outdoors, spots]  //show outdoor and spots layers
});

var baseLayers = {     // 2 tile layers
	"Outdoors": outdoors,
	"Satellite Streets": satellite
};

var overlays = {   //overlays-->sth put on the base layers (markers)
	"Destinations": spots
};

L.control.layers(baseLayers,overlays).addTo(map);

L.geoJson(statesData).addTo(map);







   
  
