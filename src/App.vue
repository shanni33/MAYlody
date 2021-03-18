<template>
  <div id="app">
    <Opening/>
    <NavBar/>
    <router-view />
  </div>
  
</template>

<script>
import Opening from "@/components/Opening.vue";
import NavBar from "@/components/NavBar.vue";
export default {
  name: "App",
  components: {
    Opening,
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
