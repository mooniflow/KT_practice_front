<template>
  <Background>
    <div class="home">
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <button @click="navigateToProductList">Shopping Service</button>
    </div>
  </Background>
</template>

<script>
import Background from '@/components/Background.vue';
import PaymentTest from '@/components/PaymentTest.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    Background,
    PaymentTest
  },
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
    navigateToProductList() {
      this.$router.push({ name: 'product-list' });
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
    },
    navigateToCodeManagement() {
      this.$router.push({ name: 'code-management' });
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
}

.error-message {
  margin-top: 20px;
  color: red;
  font-size: 18px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #005bb5;
}
</style>