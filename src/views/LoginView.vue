<template>
  <Background>
    <div class="login-form bg-white p-6 rounded shadow-lg">
      <h2 class="text-2xl mb-4">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group mb-4">
          <label for="username" class="block text-gray-700">Username:</label>
          <input type="text" id="username" v-model="username" class="w-full p-2 border rounded" required />
        </div>
        <div class="form-group mb-4">
          <label for="password" class="block text-gray-700">Password:</label>
          <input type="password" id="password" v-model="password" class="w-full p-2 border rounded" required />
        </div>
        <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">Login</button>
        <p v-if="errorMessage" class="error text-red-500 text-center mt-4">{{ errorMessage }}</p>
      </form>
    </div>
  </Background>
</template>

<script>
import Background from '@/components/Background.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    Background
  },
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      successMessage: ''
    };
  },
  methods: {
    ...mapActions(['login']),
    async handleLogin() {
      try {
        await this.login({ username: this.username, password: this.password });
        this.errorMessage = ''; // Clear error message on success
        this.$router.push({ name: 'home' }); // 로그인 성공 시 홈 화면으로 이동
      } catch (error) {
        console.error('Login error:', error);
        this.errorMessage = 'Invalid username or password';
      }
    },
    goHome() {
      this.$router.push({ name: 'home' });
    }
  }
};
</script>

<style scoped>
.login-form {
  max-width: 400px;
  width: 100%;
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