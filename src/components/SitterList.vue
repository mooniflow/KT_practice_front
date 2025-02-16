<template>
  <div class="sitter-list-container">
    <h2>Available Pet Sitters</h2>
    <div v-if="sitters.length === 0" class="empty-list">
      No sitters available in your area.
    </div>
    <ul class="sitter-list">
      <li v-for="sitter in sitters" :key="sitter.id" class="sitter-item">
        <img :src="sitter.profileImage" alt="Sitter Image" class="sitter-image" />
        <div class="sitter-details">
          <h3>{{ sitter.name }}</h3>
          <p>Location: {{ sitter.location }}</p>
          <button @click="viewSitterDetails(sitter.id)">View Details</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sitters: []
    };
  },
  async created() {
    try {
      const response = await this.$axios.get('/api/sitters');
      this.sitters = response.data;
    } catch (error) {
      console.error('Error fetching sitters:', error);
    }
  },
  methods: {
    viewSitterDetails(sitterId) {
      this.$router.push({ name: 'sitter-detail', params: { id: sitterId } });
    }
  }
};
</script>

<style scoped>
.sitter-list-container {
  max-width: 800px;
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

.empty-list {
  text-align: center;
  color: #666666;
}

.sitter-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sitter-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.sitter-image {
  width: 80px;
  height: 80px;
  margin-right: 20px;
  border-radius: 50%;
}

.sitter-details {
  flex: 1;
}

button {
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
</style>
