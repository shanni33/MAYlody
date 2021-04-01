<template>
  <div class="home">
    <div
      class="container d-flex h-100 align-items-center justify-content-center"
    >
      <div class="mx-auto text-center">
        <h2 class="title mx-auto my-0">還沒聽過五月天演唱會?</h2>
        <h1 class="sub-title mx-auto mt-2 mb-5">加入五月天 永遠不會太遲</h1>
        <div class="slogan justify-content-center">
          <h2>
            MAYDAY <br />
            is<br />
            MONSTER<br />
            STONE <br />MASA <br />MING <br />ASHIN<br />
            &<br />
            YOU
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
<style lang="scss">
div.home {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80");
  background-size: cover;
  background-position: center;
  position: relative;
  z-index: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  text-align: center;
  background-attachment: scroll;
}

.title {
  font-size: calc(16px + (32 - 16) * ((100vw - 300px) / (1440 - 300)));
  animation: fadein 3s forwards;
  animation-delay: 0.5s;
  transform: translate(0, -200%);
  opacity: 0;
}

.sub-title {
  font-size: calc(16px + (54 - 16) * ((100vw - 300px) / (1440 - 300)));
  transform: translate(0, -200%);
  animation: fadein 3s forwards;
  animation-delay: 0.5s;
  opacity: 0;
}

.slogan h2 {
  font-size: calc(16px + (32 - 16) * ((100vw - 300px) / (1440 - 300)));
  font-family: "Josefin Sans";
  transform: translate(0, 25%);
  animation: fadein  5s forwards;
  animation-delay: 0.5s;
  opacity: 0;
}


@keyframes fadein {
  to {
    opacity: 1;
    transform: translate(0, 0%);
  }
}
</style>
