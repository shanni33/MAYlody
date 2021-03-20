<template>
  <input
    class="form-control search"
    type="text"
    name="search"
    v-model="searchText"
    placeholder="請輸入關鍵字"
  />
</template>
<script>
export default {
  name: "SearchBar",
  props: {
    inputData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      searchText: "",
    };
  },
  watch: {
    searchText() {
      this.search();
    },
  },
  mounted: function () {
    this.search();
  },

  methods: {
    search() {
      var copy = JSON.parse(JSON.stringify(this.inputData));
      // var re = new RegExp("("+this.searchText+")")
      var outputData = copy.filter((data) =>
        Object.values(data).reduce(
          (result, b) => result || (b + "").indexOf(this.searchText) != -1,
          false
        )
      );
      this.$emit("on-search", outputData);
    },
  },
};
</script>
