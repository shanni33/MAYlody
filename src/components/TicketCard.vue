<template>
  <div>
    <div class="ticket">
      <label>
        <header>
          <span style="color: #2c3e50">{{ inputData.event }}</span>
        </header>
        <div class="top">
          <div class="row my-3 justify-content-center align-items-center">
            <i class="material-icons mx-2">event</i
            ><span class="date" style="color: #2c3e50">{{
              inputData.date
            }}</span>
          </div>
          <div class="row my-3 justify-content-center align-items-center">
            <i class="material-icons mx-2">location_on</i>
            <span class="city" style="color: #2c3e50">
              {{ inputData.city }}</span
            >
          </div>
          <input type="checkbox" :value="inputData" v-model="cardSelect" />
          <span class="material-icons check-btn">check_circle</span>
        </div>
      </label>
      <div class="divider"></div>
      <label class="more text-align-center">
        <div class="bottom">
          <div class="detail-btn px-2 py-1">歌單</div>
          <input class="detail-toggle" type="checkbox" />
          <div class="detail">
            <hr />
            <p
              v-for="(song, idx) in inputData.songs"
              :key="idx"
              style="color: #2c3e50"
            >
              {{ idx + 1 }}. {{ song }}
            </p>
          </div>
        </div>
      </label>
    </div>
  </div>
</template>
<script>
export default {
  name: "TicketCard",
  props: {
    inputData: {
      type: Object,
      required: true,
    },
    syncSelected: {
      type: Array,
      required: true,
    },
  },
  computed: {
    cardSelect: {
      get: function () {
        return this.syncSelected;
      },
      set: function (newValue) {
        this.$emit("update:syncSelected", newValue);
      },
    },
  },
};
</script>
<style lang="scss">
// ticket card
.ticket {
  width: 15.5rem;
  // padding: 0.5rem;
  background: #eeeeee; // #FFFFF3;
  border-radius: 5px;
  margin: 1rem;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
}
.ticket header {
  background: linear-gradient(60deg, #b99362, #d3b288d0);
  padding: 0.5em 2em;
  border-radius: 5px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  color: #fff;
}
.ticket .top,
.ticket .bottom {
  padding: 0.5rem;
  text-align: center;
  position: relative;
  cursor: pointer;
}

.ticket label {
  display: block;
  margin: 0;
}

.date {
  font-size: 1.1rem;
}
.material-icons {
  color: #b99362;
  text-shadow: 0 0 2px rgba(139, 139, 139, 0.493);
}

.ticket input {
  display: none;
}

.divider {
  width: 90%;
  margin: auto;
  height: 0.1rem;
  background: linear-gradient(to right, #222 50%, transparent 50%);
  background-size: 10px 8px, 100% 1px;
  // opacity: 0.5;
}

.ticket .top::before,
.ticket .top::after {
  content: "";
  display: block;
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #222;
  border-radius: 50%;
  z-index: 1;
  bottom: 0;
  margin-bottom: -10px;
}

.ticket label .top::before {
  left: 0;
  margin-left: -10px;
}

.ticket .top::after {
  right: 0;
  margin-right: -10px;
}

.ticket:hover {
  transform: scale(1.01);
}

.check-btn {
  color: gray;
}

.ticket input:checked + .check-btn {
  color: #b99362;
}

.detail-toggle {
  display: none;
}

.detail-toggle:checked + .detail {
  max-height: none;
  padding: 0.5rem;
}

.detail-btn {
  display: inline-block;
  background: linear-gradient(60deg, #b99362, #d3b288d0);
  border-radius: 50px;
  color: white;
}

.detail {
  max-height: 0px;
  overflow: hidden;
}
</style>
