// Part 1: Create an Earthquake Visualization
// Get the All Earthquakes in Last Month link: 
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

// Perform GET request
// d3.json(url).then(function (data) {
//     // Await response, then send the data.features object to the createFeatures function.
//     createFeatures(data.features);
//   });
  
function createMap() {
    // Create the base layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  let baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  let myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 4,
    layers: [street]
  });
  

// Create a layer control.
// Pass it our baseMaps and overlayMaps.
// Add the layer control to the map.
  L.control.layers(baseMaps, 
    //overlayMaps, 
    {collapsed: false}).addTo(myMap);
};
createMap()