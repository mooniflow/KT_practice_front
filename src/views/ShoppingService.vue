<template>
  <Background>
    <div class="shopping-service">
      <h2>Shopping Service</h2>
      <button @click="navigateTo('cart')">Cart</button>
      <button @click="navigateTo('payment-test')">Payment Test</button>
      <button @click="navigateTo('product-detail')">Product Detail</button>
      <button @click="navigateTo('search-bar')">Search Bar</button>
    </div>
  </Background>
</template>

<script>
import Background from '@/components/Background.vue';

export default {
  components: {
    Background
  },
  methods: {
    navigateTo(route) {
      this.$router.push({ name: route });
    }
  }
};
</script>

<style scoped>
.shopping-service {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
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
