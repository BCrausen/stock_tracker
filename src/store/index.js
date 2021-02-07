import Vue from 'vue';
import Vuex from 'vuex';
import symbols from './symbols';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    symbols
  }
})
