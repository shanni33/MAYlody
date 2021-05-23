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
    CONCERTS_CREATE(context, { input }) {
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
        .then(() => {
          console.log("Create!");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    CONCERTS_READ(context) {
      return axios
        .get(`${process.env.VUE_APP_APIURL}/api/concerts`)
        .then((res) => {
          context.commit("setConcerts", res.data);
        });
    },
    CONCERTS_UPDATE(context, { id, input }) {
      console.log(input);
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
        .then(() => {
          console.log("Update Done!");
        });
    }, 
  },
  modules: {},
});
