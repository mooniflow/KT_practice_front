<template>
  <div class="find-account-container">
    <h2>Find Account</h2>
    <form @submit.prevent="handleFindAccount">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <button type="submit">Find Account</button>
      <p v-if="message" class="message">{{ message }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      message: ''
    };
  },
  methods: {
    async handleFindAccount() {
      try {
        // API 호출
        const response = await this.$axios.post('/api/users/find-account', { email: this.email });
        this.message = response.data.message;
      } catch (error) {
        console.error('Find account error:', error);
        this.message = 'Error finding account. Please try again.';
      }
    }
  }
};
</script>

<style scoped>
.find-account-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #666666;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  box-sizing: border-box;
  color: #333333;
  background-color: #f9f9f9;
}

button {
  width: 100%;
  padding: 10px;
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

.message {
  color: green;
  text-align: center;
  margin-top: 10px;
}
</style>
