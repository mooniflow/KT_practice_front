<template>
  <form @submit.prevent="handleSubmit" class="signup-form">
    <div class="form-group">
      <label for="username">Username</label>
      <div class="input-wrapper">
        <span class="input-icon">👤</span>
        <input 
          type="text" 
          id="username" 
          v-model="formData.username" 
          placeholder="Choose a username"
          required 
        />
      </div>
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <div class="input-wrapper">
        <span class="input-icon">📧</span>
        <input 
          type="email" 
          id="email" 
          v-model="formData.email" 
          placeholder="Enter your email"
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
          v-model="formData.password" 
          placeholder="Create a password"
          required 
        />
      </div>
    </div>

    <div class="form-group">
      <label for="phone">Phone Number</label>
      <div class="input-wrapper">
        <span class="input-icon">📱</span>
        <input 
          type="tel" 
          id="phone" 
          v-model="formData.phone" 
          placeholder="Enter your phone number"
          required 
        />
      </div>
    </div>

    <div class="form-group">
      <label for="address">Address</label>
      <div class="input-wrapper">
        <span class="input-icon">🏠</span>
        <input 
          type="text" 
          id="address" 
          v-model="formData.address" 
          placeholder="Enter your address"
          required 
        />
      </div>
    </div>

    <div class="form-group">
      <label for="role">Role</label>
      <div class="input-wrapper">
        <span class="input-icon">👤</span>
        <input 
          type="text" 
          id="role" 
          v-model="formData.role" 
          placeholder="Enter your role"
          required 
        />
      </div>
    </div>

    <button type="submit" class="submit-button">
      Create Account
    </button>

    <p v-if="error" class="error-message">{{ error }}</p>
  </form>
</template>

<style scoped>
.signup-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  position: relative;
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
  margin-top: 16px;
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

<script>
export default {
  data() {
    return {
      formData: {
        username: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        role: ''
      },
      error: ''
    };
  },
  methods: {
    handleSubmit() {
      if (this.validateForm()) {
        console.log('Form data:', this.formData);
        this.$emit('signup', this.formData);
      } else {
        this.error = 'Please fill in all fields correctly.';
      }
    },
    validateForm() {
      return this.formData.username && this.formData.password && this.formData.email && this.formData.phone && this.formData.address && this.formData.role;
    }
  }
};
</script>