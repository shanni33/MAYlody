<template>
  <div class="concert-list-continer py-4">
    <div class="table-content">
      <b-button class="my-3" v-b-modal.createModal>新增演唱會</b-button>
      <b-modal
        id="createModal"
        @hidden="closeModal"
        @ok="createConcert()"
        title="新增演唱會"
      >
        <form ref="form">
          <b-form-group label="主題:" label-for="series-input">
            <b-form-input
              id="series-input"
              v-model="inputSeries"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="演唱會:"
            label-for="event-input"
            invalid-feedback="演唱會名稱必須填寫"
          >
            <b-form-input
              id="event-input"
              v-model="inputEvent"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="日期:" label-for="date-input">
            <b-form-input id="date-input" v-model="inputDate"></b-form-input>
          </b-form-group>
          <b-form-group label="城市:" label-for="loc-input">
            <b-form-input id="loc-input" v-model="inputLoc"></b-form-input>
          </b-form-group>
          <b-form-group label="地點:" label-for="city-input">
            <b-form-input id="city-input" v-model="inputCity"></b-form-input>
          </b-form-group>
          <b-form-group label="經度:" label-for="lng-input">
            <b-form-input id="lng-input" v-model="inputLng"></b-form-input>
          </b-form-group>
          <b-form-group label="緯度:" label-for="lat-input">
            <b-form-input id="lat-input" v-model="inputLat"></b-form-input>
          </b-form-group>
          <b-form-group label="歌曲:" label-for="songs-input">
            <b-form-input id="songs-input" v-model="inputSongs"></b-form-input>
          </b-form-group>
        </form>
      </b-modal>

      <b-table class="table-hover" :items="rawData" :fields="fields" light>
        <template #cell(event)="data">
          {{ data.item.properties.event }}
        </template>
        <template #cell(date)="data">
          {{ data.item.properties.date }}
        </template>
        <template #cell(city)="data">
          {{ data.item.properties.city }}
        </template>
        <template #cell(edit)="data">
          <b-button
            class="my-1"
            v-b-modal.updateModal
            @click="openUpdateModal(data.item)"
            >修改</b-button
          >
        </template>
      </b-table>

      <b-modal
        id="updateModal"
        @hidden="closeModal"
        @ok="updateConcert()"
        title="修改演唱會"
      >
        <form ref="form">
          <b-form-group label="主題:" label-for="series-input">
            <b-form-input
              id="series-input"
              v-model="inputSeries"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="演唱會:"
            label-for="event-input"
            invalid-feedback="演唱會名稱必須填寫"
          >
            <b-form-input
              id="event-input"
              v-model="inputEvent"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="日期:" label-for="date-input">
            <b-form-input id="date-input" v-model="inputDate"></b-form-input>
          </b-form-group>
          <b-form-group label="城市:" label-for="loc-input">
            <b-form-input id="loc-input" v-model="inputLoc"></b-form-input>
          </b-form-group>
          <b-form-group label="地點:" label-for="city-input">
            <b-form-input id="city-input" v-model="inputCity"></b-form-input>
          </b-form-group>
          <b-form-group label="經度:" label-for="lng-input">
            <b-form-input id="lng-input" v-model="inputLng"></b-form-input>
          </b-form-group>
          <b-form-group label="緯度:" label-for="lat-input">
            <b-form-input id="lat-input" v-model="inputLat"></b-form-input>
          </b-form-group>
          <b-form-group label="歌曲:" label-for="songs-input">
            <b-form-input id="songs-input" v-model="inputSongs"></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputEvent: "",
      inputCity: "",
      inputLoc: "",
      inputSeries: "",
      inputSongs: "",
      inputLat: "",
      inputLng: "",
      inputDate: "",
      concertId: "",
      modalShow: false,
      moShow: false,
      fields: [
        { key: "event", label: "演唱會" },
        { key: "date", label: "日期" },
        { key: "city", label: "地點" },
        { key: "edit", label: "修改" },
      ],
    };
  },
  computed: {
    rawData() {
      return this.$store.state.rawData;
    },
  },
  methods: {
    createConcert() {
      console.log("create");
      let _songs = this.inputSongs.split(",");

      let obj = {
        type: "Feature",
        properties: {
          event: this.inputEvent,
          city: this.inputCity,
          loc: this.inputLoc,
          date: this.inputDate,
          series: this.inputSeries,
          songs: _songs,
        },
        geometry: {
          type: "Point",
          coordinates: [this.inputLat, this.inputLng],
        },
      };
      this.$store.dispatch("CONCERTS_CREATE", { input: obj }).then(() => {
        // this.closeModal();
        this.$store.dispatch("CONCERTS_READ");
      });
    },
    closeModal() {
      console.log("close");
      this.inputEvent = "";
      this.inputCity = "";
      this.inputLoc = "";
      this.inputDate = "";
      this.inputSeries = "";
      this.inputSongs = "";
      this.inputLat = "";
      this.inputLng = "";
      this.concertId = "";
    },
    openUpdateModal(data) {
      this.inputEvent = data.properties.event;
      this.inputCity = data.properties.city;
      this.inputLoc = data.properties.loc;
      this.inputDate = data.properties.date;
      this.inputSeries = data.properties.series;
      this.inputSongs = data.properties.songs.toString();
      this.inputLat = data.geometry.coordinates[1];
      this.inputLng = data.geometry.coordinates[0];
      this.concertId = data.properties.id;
    },
    updateConcert() {
      console.log("update");
      let id = this.concertId;
      let _songs = this.inputSongs.split(",");
      let obj = {
        properties: {
          id: id,
          event: this.inputEvent,
          city: this.inputCity,
          loc: this.inputLoc,
          date: this.inputDate,
          series: this.inputSeries,
          songs: _songs,
        },
        geometry: {
          coordinates: [this.inputLat, this.inputLng],
        },
      };
      this.$store
        .dispatch("CONCERTS_UPDATE", { id: id, input: obj })
        .then(() => {
          // this.closeModal();
          this.$store.dispatch("CONCERTS_READ");
        });
    },
  },
  mounted() {
    this.$store.dispatch("CONCERTS_READ");
  },
};
</script>
<style lang="scss">
.concert-list-continer {
  margin-top: 8rem;
}

.table-content {
  margin: 1rem;
}

table {
  width: 100%;
  border-collapse: separate !important;
  border-spacing: 0 0.85rem !important;
  color: #222;
}

.table .dropdown {
  display: inline-block;
}

.table td,
.table th {
  vertical-align: middle;
  margin-bottom: 10px;
  border: none;
}

.table td {
  background: #fff;
}

.table thead tr,
.table thead th {
  color: #fff;
  border: none;
}

.table td:first-child {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.table td:last-child {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.table-hover tbody tr:hover td {
  background: rgba(187, 184, 184, 0.233);
  color: #fff;
}
</style>
