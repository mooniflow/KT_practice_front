<template>
  <div class="pet-form-container">
    <h2>Register Pet</h2>
    <form @submit.prevent="handlePetRegistration">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="pet.name" required />
      </div>
      <div class="form-group">
        <label for="type">Type:</label>
        <input type="text" id="type" v-model="pet.type" required />
      </div>
      <div class="form-group">
        <label for="age">Age:</label>
        <input type="number" id="age" v-model="pet.age" required />
      </div>
      <div class="form-group">
        <label for="photo">Photo:</label>
        <input type="file" id="photo" @change="handleFileUpload" />
      </div>
      <button type="submit">Register Pet</button>
      <p v-if="message" class="message">{{ message }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pet: {
        name: '',
        type: '',
        age: null,
        photo: null
      },
      message: ''
    };
  },
  methods: {
    handleFileUpload(event) {
      this.pet.photo = event.target.files[0];
    },
    async handlePetRegistration() {
      try {
        const formData = new FormData();
        formData.append('name', this.pet.name);
        formData.append('type', this.pet.type);
        formData.append('age', this.pet.age);
        if (this.pet.photo) {
          formData.append('photo', this.pet.photo);
        }

        // API 호출
        const response = await this.$axios.post('/api/pets', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        this.message = 'Pet registered successfully!';
      } catch (error) {
        console.error('Pet registration error:', error);
        this.message = 'Error registering pet. Please try again.';
      }
    }
  }
};
</script>

<style scoped>
.pet-form-container {
  max-width: 500px;
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
