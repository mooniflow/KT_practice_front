<template>
  <div class="sitter-detail-container" v-if="sitter">
    <h2>{{ sitter.name }}</h2>
    <img :src="sitter.profileImage" alt="Sitter Image" class="sitter-image" />
    <p>Location: {{ sitter.location }}</p>
    <p>Experience: {{ sitter.experience }} years</p>
    <p>Services: {{ sitter.services.join(', ') }}</p>
    <button @click="requestBooking">Request Booking</button>
  </div>
</template>

<script>
export default {
  props: {
    sitterId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      sitter: null
    };
  },
  async created() {
    try {
      const response = await this.$axios.get(`/api/sitters/${this.sitterId}`);
      this.sitter = response.data;
    } catch (error) {
      console.error('Error fetching sitter details:', error);
    }
  },
  methods: {
    requestBooking() {
      this.$router.push({ name: 'booking-form', params: { sitterId: this.sitterId } });
    }
  }
};
</script>

<style scoped>
.sitter-detail-container {
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

.sitter-image {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  border-radius: 10px;
}

p {
  margin-bottom: 10px;
  color: #666666;
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
</style>
