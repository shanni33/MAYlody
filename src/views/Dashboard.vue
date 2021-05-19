<template>
  <div class="concert-list-continer py-4">
    <div class="table-content">
      <button
        type="button"
        class="btn btn-primary my-3"
        data-toggle="modal"
        data-target="#createModal"
      >
        新增演唱會
      </button>
      <div
        class="modal fade"
        id="createModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="createModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="createModalLabel">新增演唱會資訊</h5>
              <button
                @click="closeModal()"
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="series" class="col-form-label">主題:</label>
                  <input
                    v-model="inputSeries"
                    type="text"
                    class="form-control"
                    id="series"
                  />
                </div>
                <div class="form-group">
                  <label for="event" class="col-form-label">演唱會:</label>
                  <input
                    v-model="inputEvent"
                    type="text"
                    class="form-control"
                    id="event"
                  />
                </div>
                <div class="form-group">
                  <label for="date" class="col-form-label">日期:</label>
                  <input
                    v-model="inputDate"
                    type="text"
                    class="form-control"
                    id="date"
                  />
                </div>
                <div class="form-group">
                  <label for="city" class="col-form-label">地點:</label>
                  <input
                    v-model="inputCity"
                    type="text"
                    class="form-control"
                    id="city"
                  />
                </div>
                <div class="form-group">
                  <label for="loc" class="col-form-label">城市:</label>
                  <input
                    v-model="inputLoc"
                    type="text"
                    class="form-control"
                    id="loc"
                  />
                </div>
                <div class="form-group">
                  <label for="lng" class="col-form-label">經度:</label>
                  <input
                    v-model="inputLng"
                    type="text"
                    class="form-control"
                    id="lng"
                  />
                </div>
                <div class="form-group">
                  <label for="lat" class="col-form-label">緯度:</label>
                  <input
                    v-model="inputLat"
                    type="text"
                    class="form-control"
                    id="lat"
                  />
                </div>
                <div class="form-group">
                  <label for="songs" class="col-form-label">歌曲:</label>
                  <textarea
                    v-model="inputSongs"
                    class="form-control"
                    id="songs"
                  ></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                @click="closeModal()"
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                取消
              </button>
              <button
                @click="createConcert()"
                type="button"
                class="btn btn-primary"
              >
                新增
              </button>
            </div>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th colspan="1">演唱會</th>
            <th colspan="1">日期</th>
            <th colspan="1">地點</th>
            <th colspan="1">修改</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in rawData" :key="data.properties.id">
            <td>{{ data.properties.event }}</td>
            <td>{{ data.properties.date }}</td>
            <td>{{ data.properties.city }}</td>
            <td>
              <button
                @click="openUpdateModal(data)"
                type="button"
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#updateModal"
              >
                修改
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="modal fade"
        id="updateModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="updateModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="updateModalLabel">修改演唱會資訊</h5>
              <button
                @click="closeModal()"
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="series" class="col-form-label">主題:</label>
                  <input
                    v-model="inputSeries"
                    type="text"
                    class="form-control"
                    id="series"
                  />
                </div>
                <div class="form-group">
                  <label for="event" class="col-form-label">演唱會:</label>
                  <input
                    v-model="inputEvent"
                    type="text"
                    class="form-control"
                    id="event"
                  />
                </div>
                <div class="form-group">
                  <label for="date" class="col-form-label">日期:</label>
                  <input
                    v-model="inputDate"
                    type="text"
                    class="form-control"
                    id="date"
                  />
                </div>
                <div class="form-group">
                  <label for="city" class="col-form-label">地點:</label>
                  <input
                    v-model="inputCity"
                    type="text"
                    class="form-control"
                    id="city"
                  />
                </div>
                <div class="form-group">
                  <label for="loc" class="col-form-label">城市:</label>
                  <input
                    v-model="inputLoc"
                    type="text"
                    class="form-control"
                    id="loc"
                  />
                </div>
                <div class="form-group">
                  <label for="lng" class="col-form-label">經度:</label>
                  <input
                    v-model="inputLng"
                    type="text"
                    class="form-control"
                    id="lng"
                  />
                </div>
                <div class="form-group">
                  <label for="lat" class="col-form-label">緯度:</label>
                  <input
                    v-model="inputLat"
                    type="text"
                    class="form-control"
                    id="lat"
                  />
                </div>
                <div class="form-group">
                  <label for="songs" class="col-form-label">歌曲:</label>
                  <textarea
                    v-model="inputSongs"
                    class="form-control"
                    id="songs"
                  ></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                @click="closeModal()"
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                取消
              </button>
              <button
                @click="updateConcert()"
                type="button"
                class="btn btn-primary"
              >
                修改
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <li v-for="data in rawData" :key="data.properties.id">
      {{ data.properties.event }}, {{ data.properties.city }},
      {{ data.properties.loc }}, {{ data.properties.date }}
    </li> -->
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
    };
  },
  computed: {
    rawData() {
      return this.$store.state.rawData;
    },
  },
  methods: {
    createConcert() {
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
      this.$store
        .dispatch("CONCERTS_CREATE", {input: obj })
        .then(() => {
          this.closeModal();
          this.$store.dispatch("CONCERTS_READ");
        });
    },
    closeModal() {
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
      console.log(data);
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
          this.closeModal();
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
}
table,
th,
td {
  border: 1px solid black;
}

#updateModal,
#createModal {
  color: black;
}
</style>
