<template>
  <div>
    <div class="ticket">
      <label>
        <div class="top">
          <div class="info">
            <div class="row my-2 justify-content-center align-items-center">
              <span class="event">{{ inputData.event }}</span>
            </div>
            <div class="row mt-3 justify-content-center align-items-center">
              <span class="date">{{ inputData.date }}</span>
            </div>
            <div class="row mt-2 justify-content-center align-items-center">
              <span class="loc"> @{{ inputData.loc }}</span>
            </div>
            <hr class="info-divider" />
            <div class="row mt-2 mb-1 justify-content-around">
              <div class="d-flex">
                <div class="px-1">
                  <div class="seat-label">SEC</div>
                  <div class="seat-num">A1</div>
                </div>
                <div class="px-1">
                  <div class="seat-label">ROW</div>
                  <div class="seat-num">1</div>
                </div>
                <div class="px-1">
                  <div class="seat-label">SEAT</div>
                  <div class="seat-num">1</div>
                </div>
              </div>
              <div class="d-flex">
                <div class="px-1">
                  <div class="price-label">PRICE</div>
                  <div class="price-num material-icons">all_inclusive</div>
                </div>
              </div>
            </div>

            <input type="checkbox" :value="inputData" v-model="cardSelect" />
            <span class="material-icons check-btn">check_circle</span>
          </div>
        </div>
      </label>
      <div class="divider"></div>
      <label class="more text-align-center">
        <div class="bottom">
          <div class="detail-btn">歌單</div>
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
.ticket {
  width: 15.5rem;
  background: #fffffd;
  border-radius: 5px;
  margin: 1rem;
  box-shadow: 0 8px 6px -6px black;
  color: #2c3e50;

  &:hover {
    transform: scale(1.01);
  }

  .material-icons {
    color: #b99362;
    text-shadow: 0 0 2px rgba(139, 139, 139, 0.493);
  }

  .info {
    border: 2px solid #b99362;
    border-radius: 5px;
    padding: 0 1rem;
  }

  .top,
  .bottom {
    padding: 0.5rem;
    text-align: center;
    position: relative;
    cursor: pointer;
  }

  .top::before,
  .top::after {
    content: "";
    display: block;
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: #262824;
    border-radius: 50%;
    z-index: 1;
    bottom: 0;
    margin-bottom: -10px;
  }

  .top::before {
    left: 0;
    margin-left: -10px;
  }

  .top::after {
    right: 0;
    margin-right: -10px;
  }

  .event {
    font-size: 1.2rem;
    font-weight: 700;
  }

  .date,
  .loc {
    font-size: 1rem;
  }

  label {
    display: block;
    margin: 0;
  }

  input {
    display: none;
    &:checked + .check-btn {
      color: #b99362;
    }
  }

  .info-divider {
    margin-bottom: 0 !important;
    border-top: 1px solid rgba(0, 0, 0, 0.3) !important;
    // border-top: 1px solid #fff !important;
  }

  .divider {
    width: 90%;
    margin: auto;
    height: 0.1rem;
    background: linear-gradient(
      to right,
      rgba(34, 34, 34, 0.596) 50%,
      transparent 50%
    );
    background-size: 10px 8px, 100% 2px;
  }

  .price-label,
  .seat-label {
    font-size: 0.5rem;
  }

  .seat-num {
    font-weight: 600;
  }

  .check-btn {
    color: gray;
  }

  .detail-toggle {
    display: none;
    &:checked + .detail {
      max-height: none;
      padding: 0.5rem;
    }
  }

  .detail-btn {
    display: inline-block;
    background: linear-gradient(60deg, #b99362, #d3b288d0);
    border-radius: 25px;
    color: white;
    padding: 5px 16px;
  }

  .detail {
    max-height: 0px;
    overflow: hidden;
  }
}
</style>
