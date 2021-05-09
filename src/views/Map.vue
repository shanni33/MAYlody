<template>
  <div class="map-container">
    <div id="map"></div>
  </div>
</template>

<script>
import L from "leaflet";
import dataSet from "../assets/new_dataset.json";
let osmMap = {};

export default {
  data() {
    return {
      osmMap: {},
      inputData: dataSet,
    };
  },
  mounted() {
      osmMap = L.map("map").setView([25.03, 121.55], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(osmMap);

    var markers = [];
    for (let i =0; this.inputData.length>i; i++){
        // console.log(this.inputData[i].lat);
        var marker = L.marker([this.inputData[i].lat, this.inputData[i].lng]).addTo(osmMap).bindPopup(this.inputData[i].event);
        markers.push(marker);
    };
    osmMap.addLayer(markers);
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
