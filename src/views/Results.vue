<template>
  <div>
    <div class="container card-container">
      <div class="row justify-content-center py-2 mx-auto tool-bar">
        <div class="col-8 col-sm-10 col-md-5 col-lg-5">
          <SearchBar :inputData="parseData" @on-search="returnSearch" class="search"/>
        </div>
      </div>
      <div class="row minor-bar py-2 m-auto">
        <button
          class="m-auto sort-btn"
          @click="order = order * -1"
          :class="order === 1 ? 'descending' : 'ascending'"
        >
          次數
        </button>
      </div>

      <div class="row justify-content-center" v-if="parseData.length">
        <div v-for="(data, idx) in slicedData" :key="idx">
          <div class="result-card d-flex">
            <div
              class="left d-flex align-items-center justify-content-center py-4"
            >
              <span class="material-icons mx-2">music_note</span>
              <h6 class="inner-text" style="color: #2c3e50">
                {{ data.value }}
              </h6>
            </div>
            <div class="divd"></div>
            <div
              class="right d-flex align-items-center justify-content-center py-4"
            >
              <span class="material-icons mx-2">hearing</span>
              <h6 class="inner-text" style="color: #2c3e50">
                {{ data.count }}
              </h6>
            </div>
          </div>
        </div>
      </div>
      <h1 class="warning" v-else>加入五月天，永遠不會太遲</h1>
    </div>
    <div class="row justify-content-center my-2 col-12">
      <select class="perpage" v-model="perPage">
        <option v-for="(page, idx) in pages" :key="idx">{{ page }}</option>
        <option>{{ filterData.length }}</option>
      </select>

      <paginate
        :page-count="totalPages"
        :click-handler="clickCallback"
        :margin-pages="2"
        :prev-text="'<'"
        :next-text="'>'"
        :container-class="'pagination justify-content-center'"
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
import SearchBar from "@/components/SearchBar.vue";
export default {
  components: {
    SearchBar,
  },
  data() {
    return {
      currentPage: 0,
      filterData: [],
      order: 1,
      pages: [12, 24, 36, 48, 60],
      parseData: JSON.parse(sessionStorage.myResults || '[]'),
      perPage: 12,
    };
  },
  computed: {
    slicedData() {
      let start = this.currentPage * this.perPage;
      let end = (this.currentPage + 1) * this.perPage;
      return this.sortData.slice(start, end);
    },
    sortData() {
      let copy = JSON.parse(JSON.stringify(this.filterData));
      return copy.sort((a, b) => (b.count - a.count) * this.order);
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
    returnSearch: function (outputData) {
      this.filterData = outputData;
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
};
</script>
<style lang="scss">
.tool-bar {
  margin: 0;
  align-items: center;
}

.search {
  border-radius: 50px !important;
}

.result-card {
  margin: 1rem;
  width: 18rem;
  .material-icons{
    color: #b99362;
  }
}

.left,
.right {
  background: linear-gradient(
    to bottom,
    #b99362 0%,
    #b99362 8%,
    #fffffd 8%,
    #fffffd 100%
  );
  position: relative;
  height: 6em;
}

.left {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  width: 75%;
}

.right {
  width: 25%;
  border-left: 0.1em dashed gray;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.right:before,
.right:after {
  content: "";
  position: absolute;
  display: block;
  width: 0.9em;
  height: 0.9em;
  background: #222;
  border-radius: 50%;
  left: -0.5em;
}

.right:before {
  top: -0.45rem;
}

.right:after {
  bottom: -0.45rem;
}

h6.inner-text {
  margin-bottom: 0;
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
