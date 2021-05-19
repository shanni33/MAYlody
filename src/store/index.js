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
        .post(`http://localhost:3000/api/concerts`, {
          content: input,
        })
        .then(() => {
          console.log("Create!");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    CONCERTS_READ(context) {
      return axios.get("http://localhost:3000/api/concerts").then((res) => {
        context.commit("setConcerts", res.data);
      });
    },
    CONCERTS_UPDATE(context, { id, input }) {
      console.log(input);
      // let item = context.state.contents.find((item) => {
      //   return item.properties.id == id;
      // });
      // if (!item) return false;
      return axios
        .patch(`http://localhost:3000/api/concerts/${id}`, {
          content: input,
        })
        .then(() => {
          console.log("Update Done!");
        });
    },
  },
  modules: {},
});
