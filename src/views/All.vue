<template>
  <div>
    <div class="container card-container">
      <div class="row justify-content-center my-2 mx-auto tool-bar">
        <div class="col-8 col-sm-10 col-md-5 col-lg-5">
          <SearchBar
            :inputData="searchData"
            @on-search="returnSearch"
            class="search"
          />
        </div>
        <div
          class="check-all-btn col-3 col-sm-2 col-md-2 col-lg-2"
          v-if="filterData.length"
        >
          <input type="checkbox" id="checkboxOne" v-model="selectAll" />
          <label for="checkboxOne"> 全選</label>
        </div>
      </div>
      <div class="row minor-bar my-2 m-auto" v-if="filterData.length">
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
        v-if="filterData.length"
      >
        <TicketCard
          v-for="data in slicedData"
          :key="data.songs"
          :inputData="data"
          :syncSelected.sync="selected"
        />
      </div>
      <h1 class="warning" v-else>沒有搜尋到東西</h1>
    </div>
    <div
      class="row justify-content-center align-items-center"
      v-if="filterData.length"
    >
      <select class="perpage" v-model="perPage">
        <option v-for="(page, idx) in pages" :key="idx">{{ page }}</option>
        <option>{{ filterData.length }}</option>
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
    <div
      class="scroll-top position-fixed h2 d-flex justify-content-center align-items-center"
      @click="scrollToTop"
    >
      <span class="material-icons"> expand_less</span>
    </div>
  </div>
</template>
<script>
import ConcertDatas from "../assets/dataset.json";
import SearchBar from "@/components/SearchBar.vue";
import TicketCard from "@/components/TicketCard.vue";

export default {
  components: {
    SearchBar,
    TicketCard,
  },
  data() {
    return {
      currentPage: 0,
      filterData: [],
      order: 1,
      pages: [12, 24, 36, 48, 60],
      perPage: 12,
      searchData: ConcertDatas,
      selected: JSON.parse(sessionStorage.mySelected || "[]"),
    };
  },

  computed: {
    selectAll: {
      get() {
        return this.slicedData
          ? this.selected.length === this.slicedData.length
          : false;
      },
      set(value) {
        // value 是 v-model 在全選 checkbox 上的勾選狀態，打勾時為 true
        if (value) {
          this.slicedData.forEach((data) => {
            // 走訪每筆物件
            if (
              this.selected.filter(
                (x) =>
                  x.date === data.date &&
                  x.series === data.series &&
                  x.event === data.event &&
                  x.city === data.city &&
                  x.songs.length === data.songs.length
              ).length == 0
            ) {
              //沒有 才加入集合(重複防呆)
              this.selected.push(data);
            }
          });
        } else {
          this.selected = [];
        }
      },
    },
    slicedData() {
      let start = this.currentPage * this.perPage;
      let end = (this.currentPage + 1) * this.perPage;
      return this.sortData.slice(start, end);
    },
    sortData() {
      let copy = JSON.parse(JSON.stringify(this.filterData));
      return copy.sort(
        (a, b) => (new Date(b.date) - new Date(a.date)) * this.order
      );
    },
    totalPages() {
      if (this.filterData.length % this.perPage === 0) {
        return parseInt(this.filterData.length / this.perPage);
      } else {
        return parseInt(this.filterData.length / this.perPage) + 1;
      }
    },
  },

  methods: {
    clickCallback: function (pageNum) {
      this.currentPage = pageNum - 1;
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
    returnSearch: function (outputData) {
      this.filterData = outputData;
    },
    submitData: function () {
      let compressed = this.compressData(this.selected);
      let results = this.countData(compressed);
      this.results = results;
      sessionStorage.myResults = JSON.stringify(results);
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    ScrollHeight() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 300) {
        document.querySelector(".scroll-top").style.opacity = "1";
      } else {
        document.querySelector(".scroll-top").style.opacity = "0";
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.ScrollHeight);
  },
  destroyed() {
    window.removeEventListener("scroll", this.ScrollHeight);
  },
  watch: {
    selected: {
      deep: true,
      handler: function (value) {
        sessionStorage.mySelected = JSON.stringify(value);
        this.submitData();
      },
    },
  },
};
</script>
<style lang="scss">
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

.scroll-top {
  z-index: 999;
  bottom: 110px;
  right: 20px;
  width: 40px;
  height: 40px;
  opacity: 0;
  transition: all 0.5s ease-in-out 0s;
  border-radius: 50%;
  box-shadow: 0 0 10px #6c757d;
  color: #fff;
  background: #b99362;
  cursor: pointer;
  &:hover {
    transform: scale(1.3);
  }
}
@media (min-width: 992px) {
  .scroll-top {
    right: 50px;
  }
}
</style>
