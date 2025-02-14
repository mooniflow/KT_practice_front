<template>
  <Background>
    <div class="user-detail">
      <h2>User Details</h2>
      <div v-if="user">
        <p><strong>Username:</strong> {{ user.username }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Phone:</strong> {{ user.phone }}</p>
        <p><strong>Address:</strong> {{ user.address }}</p>
        <p><strong>Role:</strong> {{ user.role }}</p>
      </div>
      <div v-else>
        <p>User not found.</p>
      </div>
    </div>
  </Background>
</template>

<script>
import axios from 'axios';
import Background from '@/components/Background.vue';

export default {
  name: 'UserDetail',
  components: {
    Background
  },
  data() {
    return {
      user: null
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      const userId = this.$route.params.id;
      try {
        const response = await axios.get(`/api/users/${userId}`);
        this.user = response.data;
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
  }
};
</script>

<style scoped>
.user-detail {
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>