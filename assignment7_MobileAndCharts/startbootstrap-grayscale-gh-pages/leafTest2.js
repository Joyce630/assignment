// initialize the map
var map = L.map('mapNaples').setView([ 40.8477, 14.2399], 12.3);

// load a tile layer
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
  { attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
    maxZoom: 17,
    minZoom: 5
  }).addTo(map);

// load GeoJSON from an external file
var items=[];
var airtable_read_endpoint ="https://api.airtable.com/v0/appPtteomIFN2f4tZ/Destination%20Details?api_key=keysAky6ucMNj4qo4";
var data = [];

$.getJSON(airtable_read_endpoint,function(result){
    $.each(result.records, function(key,value){
        items = {};
        items["Destination"]=value.fields.Destination;   //no space when naming the fields. 
        items["picUrl"]=value.fields.picUrl; 
        items["lat"]=value.fields.lat; 
        items["lng"]=value.fields.lng; 
        data.push(items);
        console.log(items);
    }); // end .each

  // add GeoJSON layer to the map once the file is loaded
  //L.geoJson(data).addTo(map);
});

function show_markers(){
    for (var i in data){
    var latlng = L.latLng({ lat:data[i].lat, lng:data[i].lng});
    L.marker(latlng)
        .bindPopup('<img src="'+data[i].picUrl+'" width="20px">')
        .addTo(map);
    }
}

