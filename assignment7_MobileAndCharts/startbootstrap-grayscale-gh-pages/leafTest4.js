
//L. is for calling functions in the "leaflet library",which is loaded in <head>.
var mapboxTiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a>', maxZoom: 18});

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

var map = L.map('Mainmap', {     //draw a default map 
	center: [42.7100, 12.5674],
	zoom: 6.2,
	layers: [mapboxTiles, spots]  //show outdoor and spots layers
});


// control that shows state info on hover
var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML = '<h4>US Population Density</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
        : 'Hover over a state');
};

info.addTo(map);


// get color depending on population density value
/*function getColor(d) {
    return d > 1000 ? '#800026' :
            d > 500  ? '#BD0026' :
            d > 200  ? '#E31A1C' :
            d > 100  ? '#FC4E2A' :
            d > 50   ? '#FD8D3C' :
            d > 20   ? '#FEB24C' :
            d > 10   ? '#FED976' :
                        '#FFEDA0';
}*/

function style(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: 'red',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.density)
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: 'red',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

var geojson;

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);












   
  
