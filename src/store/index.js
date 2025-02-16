import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    currentUserId: null,
    currentUser: null,
  },
  mutations: {
    SET_CURRENT_USER_ID(state, userId) {
      state.currentUserId = userId;
    },
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
    },
    CLEAR_CURRENT_USER_ID(state) {
      state.currentUserId = null;
      state.currentUser = null;
    },
  },
  actions: {
    login({ commit, dispatch }, { username, password }) {
      return axios.post('/api/users/login', { username, password })
        .then(response => {
          commit('SET_CURRENT_USER_ID', response.data);
          return dispatch('fetchUserDetail', response.data);
        });
    },
    async fetchUserDetail({ commit }, userId) {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        commit('SET_CURRENT_USER', response.data);
        return response.data;
      } catch (error) {
        console.error('사용자 정보 조회 실패:', error);
        throw error;
      }
    },
    logout({ commit }) {
      return axios.post('/api/users/logout')
        .then(() => {
          commit('CLEAR_CURRENT_USER_ID');
        });
    },
    signup({ commit }, user) {
      const { username, email, password, phone, address, role } = user;
      return axios.post('/api/users/signup', { username, email, password, phone, address, role })
        .then(response => {
          commit('SET_CURRENT_USER_ID', response.data);
        });
    },
  },
  getters: {
    isAuthenticated: state => !!state.currentUserId,
    currentUserId: state => state.currentUserId,
    currentUser: state => state.currentUser,
  },
});