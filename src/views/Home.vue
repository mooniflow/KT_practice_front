<template>
  <div class="home">
    <header>
      <div class="header-left">
        <button @click="showError('Shop')">Shop</button>
        <button @click="showError('Pet Service')">Pet Service</button>
      </div>
      <div class="header-right">
        <button v-if="!isAuthenticated" @click="navigateTo('login')">Sign in</button>
        <button v-if="!isAuthenticated" @click="navigateTo('signup')">Sign up</button>
        <button v-if="isAuthenticated" @click="navigateToUserDetails">User Details</button>
        <button v-if="isAuthenticated" @click="logout">Log out</button>
      </div>
    </header>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      errorMessage: ''
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'currentUserId'])
  },
  methods: {
    ...mapActions(['logout']),
    navigateTo(route) {
      this.$router.push({ name: route });
    },
    navigateToUserDetails() {
      if (this.currentUserId) {
        this.$router.push({ name: 'user-details', params: { id: this.currentUserId } });
      } else {
        this.errorMessage = 'User ID is missing.';
      }
    },
    showError(page) {
      this.errorMessage = `${page} 페이지는 아직 구성되지 않았습니다.`;
    }
  }
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
}

header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header-left {
  display: flex;
  gap: 10px;
}

.header-right {
  display: flex;
  gap: 10px;
}

button {
  padding: 10px 20px;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #005bb5;
}

.error-message {
  margin-top: 20px;
  color: red;
  font-size: 18px;
}
</style>