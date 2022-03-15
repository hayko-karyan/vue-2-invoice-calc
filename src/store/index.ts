import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { InvoicesStore } from "./invoice";

const dataState = createPersistedState({
  paths: ["InvoicesStore"],
});

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    InvoicesStore,
  },
  plugins: [dataState],
});
