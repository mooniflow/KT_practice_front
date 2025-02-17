import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    currentUserId: null,
    currentUser: null,
    cart: []
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
    ADD_TO_CART(state, item) {
      const existingItem = state.cart.find(i => i.productId === item.productId);
      if (existingItem) {
        existingItem.quantity += item.quantity;
        existingItem.totalPrice = (existingItem.quantity * existingItem.price).toFixed(2);
      } else {
        state.cart.push(item);
      }
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter(item => item.productId !== productId);
    }
  },
  actions: {
    login({ commit, dispatch }, { username, password }) {
      return axios.post('/api/users/login', { username, password })
        .then(response => {
          const userId = response.data.id || response.data;
          commit('SET_CURRENT_USER_ID', userId);
          return dispatch('fetchUserDetail', userId);
        });
    },
    async fetchUserDetail({ commit }, userId) {
      try {
        console.log('Fetching user detail for ID:', userId);
        const id = userId?.id || userId;
        const response = await axios.get(`http://localhost:8080/users/${id}`);
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
    async deleteUserAccount({ commit }, userId) {
      try {
        await axios.delete(`/api/users/${userId}`);
        commit('CLEAR_CURRENT_USER_ID');
      } catch (error) {
        console.error('회원탈퇴 실패:', error);
        throw error;
      }
    },
    addToCart({ commit }, item) {
      commit('ADD_TO_CART', item);
    },
    removeFromCart({ commit }, productId) {
      commit('REMOVE_FROM_CART', productId);
    }
  },
  getters: {
    isAuthenticated: state => !!state.currentUserId,
    currentUserId: state => state.currentUserId,
    currentUser: state => state.currentUser,
  },
});