<template>
  <Background>
    <div class="login-container">
      <div class="login-card">
        <h2>Welcome Back</h2>
        <p class="subtitle">Please enter your details to sign in</p>
        
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="username">Username</label>
            <div class="input-wrapper">
              <span class="input-icon">👤</span>
              <input 
                type="text" 
                id="username" 
                v-model="username" 
                placeholder="Enter your username"
                required 
              />
            </div>
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <div class="input-wrapper">
              <span class="input-icon">🔒</span>
              <input 
                type="password" 
                id="password" 
                v-model="password" 
                placeholder="Enter your password"
                required 
              />
            </div>
          </div>

          <button type="submit" class="submit-button">
            Sign In
          </button>
        </form>

        <p v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </p>
      </div>
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
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 420px;
  padding: 40px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 28px;
  font-weight: 700;
  color: #2B3674;
  margin-bottom: 8px;
}

.subtitle {
  color: #A3AED0;
  margin-bottom: 32px;
}

.form-group {
  margin-bottom: 24px;
}

label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #2B3674;
  margin-bottom: 8px;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #A3AED0;
}

input {
  width: 100%;
  padding: 12px 16px 12px 48px;
  border: 1px solid #E0E5F2;
  border-radius: 16px;
  font-size: 14px;
  color: #2B3674;
  transition: all 0.3s ease;
}

input:focus {
  border-color: #4318FF;
  outline: none;
  box-shadow: 0 0 0 3px rgba(67, 24, 255, 0.1);
}

.submit-button {
  width: 100%;
  padding: 14px;
  background: linear-gradient(90deg, #4318FF 0%, #868CFF 100%);
  border: none;
  border-radius: 16px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(67, 24, 255, 0.2);
}

.error-message {
  margin-top: 16px;
  color: #FF4B4B;
  text-align: center;
  font-size: 14px;
}
</style>