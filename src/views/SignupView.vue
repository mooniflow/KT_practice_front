<template>
  <div class="signup-view">
    <Signup @signup="handleSignup" />
  </div>
</template>

<script>
import Signup from '@/components/Signup.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    Signup
  },
  methods: {
    ...mapActions(['signup']),
    async handleSignup(user) {
      try {
        await this.signup(user);
        this.$router.push({ name: 'home' }); // 회원가입 성공 시 홈 화면으로 이동
      } catch (error) {
        console.error('Signup error:', error);
      }
    }
  }
};
</script>



