<template>
  <b-container
    class="login-container d-flex justify-content-center py-5"
    align-self="center"
  >
    <b-form class="login-form" v-if="show">
      <h2 class="mb-4" style="color: #222">ADMIN LOGIN</h2>
      <b-form-group class="form-group" label="USERNAME" label-for="input-name">
        <i class="material-icons form-icon"> person </i>
        <b-form-input
          class="input"
          id="input-name"
          v-model="form.username"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        class="form-group"
        label="PASSWORD"
        label-for="input-password"
      >
        <i class="material-icons form-icon"> vpn_key </i>
        <b-form-input
          class="input"
          type="password"
          id="input-password"
          v-model="form.password"
          required
        ></b-form-input>
      </b-form-group>
      <b-button
        @click="login()"
        class="login-btn mt-2 px-4"
        type="button"
        style="background: #b99362; border: None; border-radius: 25px"
        >Login</b-button
      >
    </b-form>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      show: true,
    };
  },
  methods: {
    login() {
      let obj = {
        username: this.form.username,
        password: this.form.password,
      };

      this.axios
        .post(`${process.env.VUE_APP_APIURL}/login`, obj)
        .then((res) => {
          if (res.data.success) {
            let authToken = res.data.token;
            localStorage.setItem("access_token", authToken);
            this.$router.push({ name: "Dashboard" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss">
.login-container {
  margin-top: 8rem;
}

.login-form {
  font-family: "Josefin Sans" !important;
  max-width: 420px;
  width: 100%;
  padding: 50px 40px;
  border-radius: 10px;
  margin-top: 75px;
  height: auto;
  background: #fff;
  position: relative;

  .form-group {
    font-size: 13px;
    color: #222;
    text-align: left;
    position: relative;
  }

  .input {
    height: 40px;
    font-size: 1rem;
    border: none;
    border-radius: 25px;
    background: rgb(146 124 124 / 22%);
    padding-left: 45px;
  }

  .form-icon {
    position: absolute;
    display: inline-block;
    transform: translateY(-50%);
    left: 10px;
    top: 46px;
    color: #495057;
  }

  .login-btn {
    vertical-align: bottom;
  }
}
</style>
