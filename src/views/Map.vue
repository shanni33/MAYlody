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
    osmMap = L.map("map", {
      center: [23.5, 121.55],
      minZoom: 3,
      maxZoom: 18,
      zoom: 8,
      zoomControl: true,
    });

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
    // function openPopUp(id, clusterId){
    //     osmMap.closePopup(); //which will close all popups
    //     osmMap.eachLayer(function(layer){     //iterate over map layer
    //         if (layer._leaflet_id == clusterId){         // if layer is markerCluster
    //             layer.spiderfy(); //spiederfies our cluster
    //         }
    //     });
    //     osmMap.eachLayer(function(layer){     //iterate over map rather than clusters
    //         if (layer._leaflet_id == id){         // if layer is marker
    //             layer.openPopup();
    //         }
    //     });
    // }
    markers.on("clusterclick", function (a) {
      if (a.layer._zoom == 18) {
        var popUpText = "<ul>";
        //there are many markers inside "a". to be exact: a.layer._childCount much ;-)
        //let's work with the data:
        for (var feat in a.layer._markers) {
          console.log(feat);
          console.log(a.layer._markers);
          popUpText +=
            "<li>" +
            a.layer._markers[feat].feature.properties["event"] +
            ", " +
            a.layer._markers[feat].feature.properties["date"] +
            "</li>";
          // popUpText+= `<li><u onclick='openPopUp("${a.layer._markers[feat]._leaflet_id}, ${a.layer._leaflet_id}");'> ${a.layer._markers[feat].feature.properties['name']} + ,  + ${a.layer._markers[feat].feature.properties['date']} </u></li>`;
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
