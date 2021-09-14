import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selection: "",
    myLists: [],
    predefinedLists: [],
    currentList: [],
    productsToBuy: [],
    currentCart: [],
    history: [],
  },
  mutations: {
    setSelection(state, value) {
      state.selection = value;
    },
    addItem(state, item) {
      state.currentList.push(item);
    },
    clearList(state) {
      state.currentList = [];
    },
    clearEverything(state) {
      state.currentCart = [];
      state.productsToBuy = [];
    },
    deleteItem(state, item) {
      state.currentList = state.currentList.filter((i) => i !== item);
    },
    removeFromToBuyList(state, item) {
      state.productsToBuy = state.productsToBuy.filter((i) => i !== item);
    },
    setProductsToBuy(state, products) {
      state.productsToBuy = products;
    },
    addToCart(state, item) {
      state.currentCart.push(item);
    },
  },
  actions: {},
  modules: {},
  plugins: [vuexLocal.plugin],
});
