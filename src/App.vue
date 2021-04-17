<template>
  <div id="app">
    <Opening/>
    <NavBar/>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
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
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #FFF;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
.fade-enter-active, .fade-leave-active{
  transition: all .3s ease-in-out;
}
</style>
