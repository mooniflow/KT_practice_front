<template>
  <Background>
    <Signup @signup="handleSignup" />
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
        await this.signup(user);
        this.$router.push({ name: 'home' }); // 회원가입 성공 시 홈 화면으로 이동
      } catch (error) {
        console.error('Signup error:', error);
      }
    }
  }
};
</script>



