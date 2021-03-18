<template>
  <div id="app">
    <NavBar/>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
  name: "App",
  components: {
    NavBar,
  }
}
</script>

<style lang="scss">
body {
  font-family: "PingFang TC", "Microsoft JhengHei", Sans-Serif !important;
  letter-spacing: 1.25px;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #FFF;
}
</style>
