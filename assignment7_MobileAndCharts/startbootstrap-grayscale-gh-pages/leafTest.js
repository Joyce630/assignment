
/*var NAmap = L.map( 'mapNaples').setView([ 40.8477, 14.2399], 12.3);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
}).addTo(NAmap);*/

//L. is for calling functions in the "leaflet library",which is loaded in <head>.
var NAmap = L.map ('mapNaples')
    .addLayer(mapboxTiles)
    .setView([ 40.8477, 14.2399], 12.3);

var mapboxTiles = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
    {attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>', maxZoom: 18,});

//var marker = L.marker(latlng).addTo(NAmap);

var items=[];
var airtable_read_endpoint ="https://api.airtable.com/v0/appPtteomIFN2f4tZ/Destination%20Details?api_key=keysAky6ucMNj4qo4";
var data = [];
$.getJSON(airtable_read_endpoint, function(result){
    $.each(result.records, function(key,value){
        items = {};
        items["Destination"]=value.fields.Destination;   //no space when naming the fields. 
        items["picUrl"]=value.fields.picUrl; 
        items["lat"]=value.fields.lat; 
        items["lng"]=value.fields.lng; 
        data.push(items);
        console.log(items);
    }); // end .each
});//end .getJSON

function show_markers(){
    for (var i in data){
        var latlng = L.latlng({ lat:data[i].lat, lng:data[i].lng});
        L.marker(latlng)
            .bindPopup('<img src="'+data[i].picUrl+'" width="20px">')
            .addTo(NAmap);
    }
};