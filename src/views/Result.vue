<template>
  <div class="test py-5">
    <div class="container card-container">
      <div class="row justify-content-center py-2 mx-auto tool-bar">
        <div class="col-8 col-sm-10 col-md-5 col-lg-5">
          <input
            class="form-control search"
            type="text"
            name="search"
            v-model="searchText"
            placeholder="請輸入關鍵字"
          />
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

      <div class="row justify-content-center" v-if="isShow">
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
        <option>{{ searchData.length }}</option>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      parseData: JSON.parse(localStorage.myResults),
      currentPage: 0,
      pages: [12, 24, 36, 48, 60],
      perPage: 12,
      searchText: "",
      order: 1,
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
      var copy = JSON.parse(JSON.stringify(this.parseData));
      //   var re = new RegExp("("+this.searchText+")")
      var temp = copy.filter((data) =>
        Object.values(data).reduce(
          (result, b) => result || (b + "").indexOf(this.searchText) != -1,
          false
        )
      );
      return temp
    },
    sortData() {
      let copy = JSON.parse(JSON.stringify(this.searchData));
      return copy.sort(
        (a, b) => (b.count - a.count) * this.order
      );
    },
    isShow() {
      return this.parseData.length > 0;
    },
  },

  methods: {
    clickCallback: function (pageNum) {
      this.currentPage = pageNum - 1;
    },
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
}

.left,
.right {
  background: linear-gradient(
    to bottom,
    #b99362 0%,
    #b99362 8%,
    #eeeeee 8%,
    #eeeeee 100%
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
</style>
