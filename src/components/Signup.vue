<template>
  <div class="signup">
    <h2>Sign Up</h2>
    <form @submit.prevent="handleSignup">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <div class="form-group">
        <label for="phone">Phone:</label>
        <input type="text" v-model="phone" />
      </div>
      <div class="form-group">
        <label for="address">Address:</label>
        <input type="text" v-model="address" />
      </div>
      <div class="form-group">
        <label for="role">Role:</label>
        <input type="text" v-model="role" />
      </div>
      <button type="submit">Sign Up</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      role: '',
      errorMessage: ''
    };
  },
  methods: {
    async handleSignup() {
      try {
        const user = {
          username: this.username,
          email: this.email,
          password: this.password,
          phone: this.phone,
          address: this.address,
          role: this.role
        };
        this.$emit('signup', user);
      } catch (error) {
        console.error('Signup error:', error);
        this.errorMessage = error.message;
      }
    }
  }
};
</script>

<style scoped>
.signup {
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
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  box-sizing: border-box;
  color: black;
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

.error {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>