<template>
    <div class=" container-fluid  d-flex flex-column justify-content-center align-center animation-delay">
        <div class="block d-flex align-center justify-content-center">
            <div class="loading">
                <span class="ball1"></span>
                <span class="ball2"></span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "Opening",
}
</script>
<style lang="scss">
.container-fluid {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2000;
  background: #222;

  &.animation-delay {
    animation: easeOut;
    animation-duration: 1s;
    animation-delay: 2s;
    animation-fill-mode: forwards;
  }
}

.block {
  width: 25%;
  height: 100px;
  margin: 0 auto;
  text-align: center;
}

.loading span {
  display: inline-block;
  padding: 15px;
  border-radius: 50%;
}

.ball1 {
  background: #b99362;
  animation: move-left 800ms ease-in-out alternate infinite;
}

.ball2 {
  background: white;
  animation: move-right 800ms ease-in-out alternate infinite;
}

@keyframes move-left {
  to {
    transform: translate(30px, 0);
    background: white;
  }
}

@keyframes move-right {
  to {
    transform: translate(-30px, 0);
    background: #b99362;
  }
}

@keyframes easeOut {
  0% {
    display: flex;
    opacity: 1;
    top: 0;
  }

  100% {
    display: none;
    top: -150%;
  }
}
</style>