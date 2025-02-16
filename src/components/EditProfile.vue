<template>
  <div class="edit-profile-container">
    <h2>Edit Profile</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="form.username" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="form.password" required />
      </div>
      <div class="form-group">
        <label for="phone">Phone:</label>
        <input type="text" id="phone" v-model="form.phone" />
      </div>
      <div class="form-group">
        <label for="address">Address:</label>
        <input type="text" id="address" v-model="form.address" />
      </div>
      <div class="form-group">
        <label for="role">Role:</label>
        <input type="text" id="role" v-model="form.role" />
      </div>
      <button type="submit" class="submit-button">Save Changes</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        role: ''
      }
    };
  },
  methods: {
    async handleSubmit() {
      try {
        // 서버에 프로필 업데이트 요청
        const response = await axios.put(`http://localhost:8080/users/${this.$route.params.id}`, {
          username: this.form.username,
          email: this.form.email,
          password: this.form.password,
          phone: this.form.phone,
          address: this.form.address,
          role: this.form.role
        });
        console.log('Profile updated:', response.data);
        alert('프로필이 성공적으로 업데이트되었습니다.');
        this.$router.push({ name: 'user-details', params: { id: this.$route.params.id } });
      } catch (error) {
        console.error('Profile update error:', error);
        alert('프로필 업데이트에 실패했습니다. 다시 시도해 주세요.');
      }
    }
  },
  created() {
    // 초기 데이터 로딩 로직을 여기에 추가하세요.
    // 예: this.form = this.$store.getters.currentUser;
  }
};
</script>

<style scoped>
.edit-profile-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #2B3674;
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

.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.submit-button:hover {
  background-color: #005bb5;
}
</style>
