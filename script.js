mapboxgl.accessToken = "pk.eyJ1IjoiYW1hbG5hdGgiLCJhIjoiY2tyenRpdWJpMWRqMzJxczdzOG54MXppYiJ9.rkUsPjxHl-O8IgSkdnDsIw"

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true
})
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/satellite-v9', // style URL
    center: [-2.81361, 36.77271], // starting position [lng, lat]
    zoom: 13 // starting zoom
});

const layerList = document.getElementById('menu');
const inputs = layerList.getElementsByTagName('input');

for (const input of inputs) {
    input.onclick = (layer) => {
        const layerId = layer.target.id;
        map.setStyle('mapbox://styles/mapbox/' + layerId);
    };
}

function successLocation(position) {
    setupMap([position.coords.longitude, position.coords.latitude])
}

function errorLocation() {
    setupMap([-2.24, 53.48])
}

function setupMap(center) {
    const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: center,
        zoom: 15
    })

    const nav = new mapboxgl.NavigationControl()
    map.addControl(nav)

    var directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken
    })

    map.addControl(directions, "top-left")
}