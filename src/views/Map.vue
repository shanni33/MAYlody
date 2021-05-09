<template>
  <div class="map-container">
    <div id="map"></div>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/leaflet.markercluster";
import dataSet from "../assets/ConcertGeoJson.json";
let osmMap = {};

export default {
  data() {
    return {
      osmMap: {},
      inputData: dataSet["features"],
    };
  },
  mounted() {
    osmMap = L.map("map").setView([25.03, 121.55], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(osmMap);

    var markers = L.markerClusterGroup({
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
    });
    function popUp(feature, layer) {
      var text =
        "<h3>" +
        feature.properties["event"] +
        "</h3><h4>" +
        feature.properties["city"] +
        ", " +
        feature.properties["date"] +
        "</h4>";
      layer.bindPopup(text);
    }
    var points = L.geoJSON(this.inputData, {
      onEachFeature: popUp,
    });
    markers.addLayer(points).addTo(osmMap);
    
  },
};
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
}

#map {
  height: 800px;
  margin: 1rem;
}
.map-container {
  margin-top: 8rem;
}
</style>
