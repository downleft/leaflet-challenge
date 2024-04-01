// Part 1: Create an Earthquake Visualization
// Get the All Earthquakes in Last Week or Last Month link: 
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
// const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

// Perform GET request
d3.json(url).then(function (data) {
    // Await response, then send the data.features object to the createFeatures function.
    createFeatures(data.features);
  });
  
    function createFeatures(earthquakeData) {
        // Define a function that we want to run once for each feature in the features array.
        // Give each feature a popup that describes the place and time of the earthquake.
        function onEachFeature(feature, layer) {
            layer.bindPopup(`<h3>${feature.properties.place}</h3><hr>
            <p>${new Date(feature.properties.time)}</p>`);
        }

    // Define arrays to hold the created earthquake markers.
    let earthquakeMarkers = [];

    // Loop through locations, and create the city and state markers.
    for (let i = 0; i < earthquakeData.length; i++) {
        
        // Establish coordinate for earthquake
        let latitude = earthquakeData[i].geometry.coordinates[1]
        let longitude = earthquakeData[i].geometry.coordinates[0]
        let depth = earthquakeData[i].geometry.coordinates[2]
        let coordinates = [latitude, longitude]

        // Setting the marker radius for the state by magnitude
        let radius = earthquakeData[i].properties.mag * 50000

        // Conditionals for country gdp_pc
        let color = "";
            if (depth < 10) {
                color = "#52BE80";
            }
            else if (depth < 30) {
                color = "#82E0AA";
            }
            else if (depth < 50) {
                color = "#F9E79F";
            }
            else if (depth < 70) {
                color = "#F5B041";
            }
            else if (depth < 90) {
                color = "#E67E22";
            }
            else {
                color = "#CD6155";
            }

        earthquakeMarkers.push(
            L.circle(coordinates, {
                stroke: false,
                fillOpacity: 0.75,
                color: "white",
                fillColor: color,
                radius: radius,
            }).bindPopup(`<h3>${earthquakeData[i].properties.place}</h3>
                <hr><p>Magnitude: ${(earthquakeData[i].properties.mag)}</p>
                <p>Depth: ${(depth)} km</p>
                <p>${new Date(earthquakeData[i].properties.time)}</p>`)
            );
        }

    
  
    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    let earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature
    });
  
    // Send our earthquakes layer to the createMap function/
    createMap(earthquakeMarkers);
  }

function createMap(earthquakeMarkers) {
    

    // Create the base layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create layer group for earthquake markers
  let quakeLayer = L.layerGroup(earthquakeMarkers)

  // Create a baseMaps object.
  let baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  let overlayMaps = {
    Earthquakes: quakeLayer
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  let myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 4,
    layers: [street, quakeLayer]
  });
  

// Create a layer control.
// Pass it our baseMaps and overlayMaps.
// Add the layer control to the map.
  L.control.layers(baseMaps, 
    overlayMaps, 
    {collapsed: false}).addTo(myMap);
};

