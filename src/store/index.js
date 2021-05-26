import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    rawData: [],
  },
  mutations: {
    setConcerts(state, data) {
      state.rawData = data;
    },
  },
  actions: {
    CONCERT_CREATE(context, { input }) {
      console.log(input);
      return axios
        .post(
          `${process.env.VUE_APP_APIURL}/api/concerts`,
          { content: input },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            context.dispatch("CONCERTS_READ");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    CONCERTS_READ(context) {
      console.log("read data");
      return axios
        .get(`${process.env.VUE_APP_APIURL}/api/concerts`)
        .then((res) => {
          if (res.data.success) {
            context.commit("setConcerts", res.data.concerts);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    CONCERT_UPDATE(context, { id, input }) {
      return axios
        .patch(
          `${process.env.VUE_APP_APIURL}/api/concerts/${id}`,
          { content: input },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            context.dispatch("CONCERTS_READ");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    CONCERT_DELETE(context, id) {
      return axios
        .delete(`${process.env.VUE_APP_APIURL}/api/concerts/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            context.dispatch("CONCERTS_READ");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {},
});
