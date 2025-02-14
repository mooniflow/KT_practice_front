import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    currentUserId: null,
  },
  mutations: {
    SET_CURRENT_USER_ID(state, userId) {
      state.currentUserId = userId;
    },
    CLEAR_CURRENT_USER_ID(state) {
      state.currentUserId = null;
    },
  },
  actions: {
    login({ commit }, { username, password }) {
      return axios.post('/api/users/login', { username, password })
        .then(response => {
          commit('SET_CURRENT_USER_ID', response.data);
        });
    },
    logout({ commit }) {
      return axios.post('/api/users/logout')
        .then(() => {
          commit('CLEAR_CURRENT_USER_ID');
        });
    },
    signup({ commit }, user) {
      return axios.post('/api/users/signup', user)
        .then(response => {
          commit('SET_CURRENT_USER_ID', response.data);
        });
    },
  },
  getters: {
    isAuthenticated: state => !!state.currentUserId,
    currentUserId: state => state.currentUserId,
  },
});