
import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';

const state = {
};

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  modules,
  strict: process.env.NODE_ENV !== 'production',
});
