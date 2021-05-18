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
// import dataSet from "../assets/ConcertGeoJson.json";

let osmMap = {};

export default {
  data() {
    return {
      rawData: [],
    };
  },
  methods: {
    addMarkers() {
      // initiation
      var markers = L.markerClusterGroup({
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
      });

      //Popup text
      function popUp(feature, layer) {
        var text = `<h6 style="font-weight:bold;">${feature.properties["event"]}</h6><p>${feature.properties["date"]}</p><p>${feature.properties["city"]}<p>`;
        layer.bindPopup(text);
      }

      var points = L.geoJSON(this.rawData, {
        onEachFeature: popUp,
      });
      markers.addLayer(points).addTo(osmMap);

      markers.on("clusterclick", function (a) {
        if (a.layer._zoom == 18) {
          var popUpText = "<ul>";
          //there are many markers inside "a". to be exact: a.layer._childCount much ;-)
          for (var marker in a.layer._markers) {
            /* popUpText += `<li>${a.layer._markers[marker].feature.properties["event"]}, ${a.layer._markers[marker].feature.properties["date"]}</li>`; */
            popUpText+= '<li><u style="cursor:pointer;" onclick="openPopUp(' + a.layer._markers[marker]._leaflet_id + ','+ a.layer._leaflet_id +')">' + a.layer._markers[marker].feature.properties['event'] + ', ' + a.layer._markers[marker].feature.properties['date'] + '</u></li>';
          }
          popUpText += "</ul>";
          //as we have the content, we should add the popup to the map add the coordinate that is inherent in the cluster:
          L.popup()
            .setLatLng([a.layer._cLatLng.lat, a.layer._cLatLng.lng])
            .setContent(popUpText)
            .openOn(osmMap);
        }
      });
      
    },
    getData() {
      this.axios
        .get("http://localhost:3000/api/data")
        .then((res) => {
          this.rawData = res.data.features;
          this.addMarkers();
        })
        .catch((error) => {
          "oops! error:", error.message;
        });
    },
    initMap() {
      // initiation
      osmMap = L.map("map", {
        center: [23.5, 121.55],
        minZoom: 3,
        maxZoom: 18,
        zoom: 8,
        zoomControl: true, // zoom control button
      });
      // add osm
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(osmMap);
    },
    openPopUp(id, clusterId) {
        console.log('hihi');
        console.log(id);
        console.log(clusterId);
        osmMap.closePopup(); //which will close all popups
        osmMap.eachLayer(function (layer) {
          //iterate over map layer
          if (layer._leaflet_id == clusterId) {
            // if layer is markerCluster
            layer.spiderfy(); //spiederfies our cluster
          }
        });
        osmMap.eachLayer(function (layer) {
          //iterate over map rather than clusters
          if (layer._leaflet_id == id) {
            // if layer is marker
            layer.openPopup();
          }
        });
    }
  },
  mounted() {
    this.initMap();
    this.getData();
  },
  created(){
    window.openPopUp = this.openPopUp;
    
  }
};
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
}

.map-container {
  margin-top: 8rem;
  #map {
    height: 800px;
    margin: 1rem;
    .leaflet-popup-content-wrapper {
      font-family: "Microsoft JhengHei", "Segoe UI", "Roboto", "Helvetica Neue",
        Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol";
      border-bottom: none;

      h6 {
        margin-bottom: 5px;
      }

      p {
        margin: 0px 0px 2px 0px;
      }

      span {
        font-size: 18px;
      }
    }
  }
}
</style>
