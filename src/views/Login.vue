<template>
  <b-container
    class="login-container d-flex justify-content-center py-5"
    align-self="center"
  >
    <b-form class="login-form" @submit="login()" v-if="show">
      <h2 class="mb-4" style="color: #222">ADMIN LOGIN</h2>
      <b-form-group class="label" label="USERNAME" label-for="input-name">
        <b-form-input
          class="input"
          id="input-name"
          v-model="form.username"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group class="label" label="PASSWORD" label-for="input-password">
        <b-form-input
          class="input"
          type="password"
          id="input-password"
          v-model="form.password"
          required
        ></b-form-input>
      </b-form-group>
      <b-button
        class="mt-3 px-4"
        type="submit"
        style="background: #b99362; border: None; border-radius: 25px"
        >登入</b-button
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
      console.log("submit");
      let obj = {
        username: this.form.username,
        password: this.form.password,
      };

      this.axios
        .post(`${process.env.VUE_APP_APIURL}/login`, obj)
        .then((res) => {
          this.form.email = "";
          this.form.username = "";
          console.log("Login!");
          let authToken = res.data.token;
          localStorage.setItem("access_token", authToken);
          if (res.data.success) {
            console.log("hihi");
            this.$router.push({ name: "dashboard" });
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

  .input {
    height: 42px;
    font-size: 1rem;
    border: none;
    border-radius: 25px;
    // padding: 20px 12px;
    background: rgb(146 124 124 / 22%);
  }

  .label {
    font-size: 13px;
    color: #222;
    text-align: left;
  }
}
</style>
