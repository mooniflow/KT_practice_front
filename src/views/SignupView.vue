<template>
  <Background>
    <div class="signup-container">
      <div class="signup-card">
        <h2>Create Account</h2>
        <p class="subtitle">Please fill in the details to sign up</p>
        <Signup @signup="handleSignup" />
      </div>
    </div>
  </Background>
</template>

<script>
import Signup from '@/components/Signup.vue';
import Background from '@/components/Background.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    Signup,
    Background
  },
  methods: {
    ...mapActions(['signup']),
    async handleSignup(user) {
      try {
        console.log('Signup data:', user);
        await this.signup(user);
        this.$router.push({ name: 'home' }); // 회원가입 성공 시 홈 화면으로 이동
      } catch (error) {
        console.error('Signup error:', error);
      }
    }
  }
};
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  padding: 20px;
}

.signup-card {
  width: 100%;
  max-width: 480px;
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
</style>



