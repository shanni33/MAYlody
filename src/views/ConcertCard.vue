<template>
  <div class="test py-4">
    <div class="container card-container">
      <div class="row justify-content-center my-2 mx-auto tool-bar">
        <div class="col-8 col-sm-10 col-md-5 col-lg-5">
          <input
            class="form-control search"
            type="text"
            name="search"
            v-model="searchText"
            placeholder="請輸入關鍵字"
          />
        </div>
        <div
          class="check-all-btn col-3 col-sm-2 col-md-2 col-lg-2"
          v-if="searchData.length"
        >
          <input type="checkbox" id="checkboxOne" v-model="selectAll" />
          <label for="checkboxOne"> 全選</label>
        </div>
      </div>
      <div class="row minor-bar my-2 m-auto" v-if="searchData.length">
        <button
          class="m-auto sort-btn"
          @click="order = order * -1"
          :class="order === 1 ? 'descending' : 'ascending'"
        >
          日期
        </button>
        <span class="session"> 已選 {{ selected.length }} 場</span>
      </div>

      <div
        class="row justify-content-center my-2 tickets"
        v-if="searchData.length"
      >
        <div v-for="(data, index) in slicedData" :key="index">
          <div class="ticket">
            <label>
              <header>
                <span style="color: #2c3e50">{{ data.event }}</span>
              </header>
              <div class="top">
                <div class="row my-3 justify-content-center align-items-center">
                  <i class="material-icons mx-2">event</i
                  ><span class="date" style="color: #2c3e50">{{
                    data.date
                  }}</span>
                </div>
                <!-- <p class="series">{{ data.series }}</p> -->
                <div class="row my-3 justify-content-center align-items-center">
                  <i class="material-icons mx-2">location_on</i>
                  <span class="city" style="color: #2c3e50">
                    {{ data.city }}</span
                  >
                </div>
                <input type="checkbox" :value="data" v-model="selected" />
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
                    v-for="(song, idx) in data.songs"
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
      </div>
      <h1 class="warning" v-else>沒有搜尋到東西</h1>
    </div>
    <div
      class="row justify-content-center align-items-center"
      v-if="searchData.length"
    >
      <select class="perpage" v-model="perPage">
        <option v-for="(page, idx) in pages" :key="idx">{{ page }}</option>
        <option>{{ searchData.length }}</option>
      </select>

      <paginate
        :page-count="totalPages"
        :click-handler="clickCallback"
        :margin-pages="3"
        :prev-text="'<'"
        :next-text="'>'"
        :container-class="'pagination justify-content-center mb-0'"
        :page-class="'page-item'"
        :page-link-class="'page-link'"
        :prev-class="'page-item'"
        :prev-link-class="'page-link'"
        :next-class="'page-item'"
        :next-link-class="'page-link'"
      >
      </paginate>
    </div>
    <button class="submit-btn" @click="submitData()" v-if="searchData.length">
      送出
    </button>
  </div>
</template>
<script>
import ConcertDatas from "../assets/dataset.json";
export default {
  data() {
    return {
      selected: [],
      concertDatas: ConcertDatas,
      currentPage: 0,
      pages: [12, 24, 36, 48, 60],
      perPage: 12,
      searchText: "",
      order: 1,
      // checkText: "全選",
    };
  },
  computed: {
    slicedData() {
      let start = this.currentPage * this.perPage;
      let end = (this.currentPage + 1) * this.perPage;
      return this.sortData.slice(start, end);
    },
    totalPages() {
      if (this.searchData.length % this.perPage === 0) {
        return parseInt(this.searchData.length / this.perPage);
      } else {
        return parseInt(this.searchData.length / this.perPage) + 1;
      }
    },
    searchData() {
      var copy = JSON.parse(JSON.stringify(this.concertDatas));
      //   var re = new RegExp("("+this.searchText+")")
      var temp = copy.filter((data) =>
        Object.values(data).reduce(
          (result, b) => result || (b + "").indexOf(this.searchText) != -1,
          false
        )
      );
      return temp;
    },
    sortData() {
      let copy = JSON.parse(JSON.stringify(this.searchData));
      return copy.sort(
        (a, b) => (new Date(b.date) - new Date(a.date)) * this.order
      );
    },
    selectAll: {
      get() {
        return this.slicedData
          ? this.selected.length === this.slicedData.length
          : false;
      },
      set(value) {
        // value 是 v-model 在全選 checkbox 上的勾選狀態，打勾時為 true
        // let selected = [];
        if (value) {
          // this.checkText = "取消全選";
          this.slicedData.forEach((data) => {
            // 走訪每筆物件
            if (
              this.selected.findIndex((x) => {
                x.date === data.date &&
                  x.series === data.series &&
                  x.event === data.event;
              }) < 0
            ) {
              //沒有 才加入集合(重複防呆)
              this.selected.push(data);
            }
            // selected.push(data);
          });
        } else {
          // this.checkText = "全選";
          this.selected = [];
        }
      },
    },
  },

  methods: {
    clickCallback: function (pageNum) {
      this.currentPage = pageNum - 1;
    },
    submitData: function () {
      let compressed = this.compressData(this.selected);
      let results = this.countData(compressed);
      this.results = results;
      localStorage.myResults = JSON.stringify(results);
      this.$router.push({ path: "/Result" });
    },
    compressData: function (arr) {
      let results = [];
      arr.forEach((value) => {
        results = results.concat(value.songs);
      });
      return results;
    },
    countData: function (arr) {
      let results = [];
      // make a copy of the input array
      let trimedArr = arr.map((str) => str.trim());
      let copy = trimedArr.slice(0);
      console.log(trimedArr);
      // first loop goes over every element
      for (let i = 0; i < arr.length; i++) {
        let myCount = 0;
        // loop over every element in the copy and see if it's the same
        for (let w = 0; w < copy.length; w++) {
          if (arr[i] == copy[w]) {
            // increase amount of times duplicate is found
            myCount++;
            // sets item to undefined
            delete copy[w];
          }
        }
        if (myCount > 0) {
          let tmp = new Object();
          tmp.value = arr[i];
          tmp.count = myCount;
          results.push(tmp);
        }
      }
      return results;
    },
  },
};
</script>
<style lang="scss">
.test {
  margin-top: 5.5rem !important;
  margin-bottom: 0.5rem;
  border: 1px solid rgba(white, 0.1);
  border-radius: 20px;
  margin-left: 1rem;
  margin-right: 1rem;
}

.tool-bar {
  margin: 0;
  align-items: center;
}
.search {
  border-radius: 50px !important;
}

.check-all-btn {
  margin: 0;
}

.check-all-btn label {
  display: inline-block;
  background: linear-gradient(60deg, #b99362, #d3b288d0);
  border: 2px solid rgba(139, 139, 139, 0.3);
  color: #fff;
  border-radius: 25px;
  white-space: nowrap;
  margin: 3px 0px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: all 0.2s;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
}

.check-all-btn label::before {
  display: inline-block;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  font-family: "Material Icons";
  font-weight: 900;
  font-size: 12px;
  padding: 2px 6px 2px 2px;
  content: "\e5ca";
  transition: transform 0.3s ease-in-out;
}

.check-all-btn input[type="checkbox"]:checked + label::before {
  content: "\e14c";
  transform: rotate(-360deg);
  transition: transform 0.3s ease-in-out;
}

.check-all-btn input[type="checkbox"]:checked + label {
  color: #fff;
  transition: all 0.2s;
}

.check-all-btn input[type="checkbox"] {
  display: absolute;
}

.check-all-btn input[type="checkbox"] {
  position: absolute;
  opacity: 0;
}

.check-all-btn input[type="checkbox"]:focus + label {
  border: 2px solid #fff;
}

.sort-btn {
  background: #ebeced;
  color: rgba(0, 0, 0, 0.87);
  font-size: 0.85rem;
  border: none;
  border-radius: 50px;
  padding: 0.2rem 0.75rem;
}

.sort-btn.ascending::after {
  font-size: 0.85rem;
  transition: transform 0.3s ease-in-out;
  font-family: "Material Icons";
  content: "\e5c7";
}

.sort-btn.descending::after {
  font-size: 0.85rem;
  transition: transform 0.3s ease-in-out;
  font-family: "Material Icons";
  content: "\e5c5";
}

.session {
  color: white;
}

.tickets {
  height: 58vh;
  overflow-y: scroll;
}
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

.warning {
  color: white;
}

.perpage {
  display: inline-block;
  height: calc(1em + 0.75rem + 2px);
  border-radius: 10px;
}

.page-link {
  border-radius: 100%;
  border: none !important;
  background-color: transparent !important;
  color: white !important;
}

.page-item.active .page-link {
  background-color: #b99362 !important;
}

.submit-btn {
  background: linear-gradient(45deg, #b99362, #d3b288d0);
  border: none;
  border-radius: 50px;
  padding: 0.5rem 1rem;
  color: white;
}
</style>
