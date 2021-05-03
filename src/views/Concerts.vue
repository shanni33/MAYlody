<template>
  <div class="concert-container">
    <div class="minor-nav mx-auto">
      <router-link class="minor-nav-link" to="/concerts/all">全部場次</router-link> |
      <router-link class="minor-nav-link" to="/concerts/selected">已選場次</router-link> |
      <router-link class="minor-nav-link" to="/concerts/result">統計結果</router-link>
    </div>
    <div class="content py-4">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.concert-container {
  margin-top: 8rem;
}

.minor-nav {
  .minor-nav-link {
    display: inline-block;
    color: #fff;
    font-size: 1.2rem;
    transition: all 0.5s ease;
    padding: .5rem 1rem;
    text-decoration: none;
    &:hover {
      color: #b99362 !important;
    }
  }
}

.router-link-active {
  color: #b99362 !important;
}

.content {
  border: 1px solid rgba(white, 0.3);
  border-radius: 20px;
  margin: 1rem;
}

.fade-enter, .fade-leave-to{
  opacity: 0;
}

.fade-enter-active, .fade-leave-active{
  transition: all .3s ease-in-out;
}
</style>
