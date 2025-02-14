<template>
  <div class="login-view">
    <h1>Login</h1>
    <Login @login="handleLogin" />
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <div v-if="successMessage" class="success-message">
      <p>{{ successMessage }}</p>
      <button @click="goHome">확인</button>
    </div>
  </div>
</template>

<script>
import Login from '@/components/Login.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    Login
  },
  data() {
    return {
      errorMessage: '',
      successMessage: ''
    };
  },
  methods: {
    ...mapActions(['login']),
    async handleLogin(credentials) {
      console.log('handleLogin called with credentials:', credentials);
      try {
        await this.login(credentials);
        this.successMessage = '로그인 성공';
        this.errorMessage = ''; // Clear error message on success
        this.goHome(); // 로그인 성공 시 홈 화면으로 이동
      } catch (error) {
        console.error('Login error:', error);
        this.errorMessage = 'Invalid username or password';
        this.successMessage = ''; // Clear success message on error
      }
    },
    goHome() {
      this.$router.push({ name: 'home' });
    }
  }
};
</script>

<style scoped>
.login-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.error {
  color: red;
  text-align: center;
  margin-top: 10px;
}

.success-message {
  text-align: center;
  margin-top: 20px;
}

.success-message p {
  font-size: 18px;
  color: green;
}

.success-message button {
  padding: 10px 20px;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.success-message button:hover {
  background-color: #005bb5;
}
</style>