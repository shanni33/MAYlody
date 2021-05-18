import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'


Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    rawData: [],
  },
  mutations: {
    setDatas(state, data){
      state.rawData = data;
    }
  },
  actions: {
    DATAS_READ(context) {
      // console.log("context= ", context);
      // 讀資料 要return
      return axios.get("http://localhost:3000/api/data").then((res) => {
        context.commit("setDatas", res.data.features);
      });
    },
  },
  modules: {},
});
