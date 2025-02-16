<template>
  <div class="sitter-profile-form-container">
    <h2>Register as a Pet Sitter</h2>
    <form @submit.prevent="handleSitterRegistration">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="sitter.name" required />
      </div>
      <div class="form-group">
        <label for="contact">Contact:</label>
        <input type="text" id="contact" v-model="sitter.contact" required />
      </div>
      <div class="form-group">
        <label for="location">Location:</label>
        <input type="text" id="location" v-model="sitter.location" required />
      </div>
      <div class="form-group">
        <label for="experience">Experience (years):</label>
        <input type="number" id="experience" v-model="sitter.experience" required />
      </div>
      <div class="form-group">
        <label for="services">Services:</label>
        <input type="text" id="services" v-model="sitter.services" placeholder="e.g., Walking, Boarding" required />
      </div>
      <div class="form-group">
        <label for="profileImage">Profile Image:</label>
        <input type="file" id="profileImage" @change="handleFileUpload" />
      </div>
      <button type="submit">Register</button>
      <p v-if="message" class="message">{{ message }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sitter: {
        name: '',
        contact: '',
        location: '',
        experience: null,
        services: '',
        profileImage: null
      },
      message: ''
    };
  },
  methods: {
    handleFileUpload(event) {
      this.sitter.profileImage = event.target.files[0];
    },
    async handleSitterRegistration() {
      try {
        const formData = new FormData();
        formData.append('name', this.sitter.name);
        formData.append('contact', this.sitter.contact);
        formData.append('location', this.sitter.location);
        formData.append('experience', this.sitter.experience);
        formData.append('services', this.sitter.services);
        if (this.sitter.profileImage) {
          formData.append('profileImage', this.sitter.profileImage);
        }

        // API 호출
        const response = await this.$axios.post('/api/sitters', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        this.message = 'Sitter registered successfully!';
      } catch (error) {
        console.error('Sitter registration error:', error);
        this.message = 'Error registering sitter. Please try again.';
      }
    }
  }
};
</script>

<style scoped>
.sitter-profile-form-container {
  max-width: 600px;
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

input[type="text"],
input[type="number"],
input[type="file"] {
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
