import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    currentUser: null,
  },
  mutations: {
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
    },
    CLEAR_CURRENT_USER(state) {
      state.currentUser = null;
    },
  },
  actions: {
    login({ commit }, { username, password }) {
      return axios.post('/api/users/login', { username, password })
        .then(response => {
          commit('SET_CURRENT_USER', response.data);
        });
    },
    logout({ commit }) {
      return axios.post('/api/users/logout')
        .then(() => {
          commit('CLEAR_CURRENT_USER');
        });
    },
    signup({ commit }, user) {
      return axios.post('/api/users/signup', user)
        .then(response => {
          commit('SET_CURRENT_USER', response.data);
        });
    },
  },
  getters: {
    isAuthenticated: state => !!state.currentUser,
    currentUser: state => state.currentUser,
  },
});