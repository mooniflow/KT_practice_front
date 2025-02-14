<template>
  <div class="user-list">
    <h1>User List</h1>
    <ul>
      <li v-for="user in users" :key="user.id" class="user-item">
<span>{{ user.username }} - {{ user.email }}</span>
        <router-link :to="{ name: 'UserDetail', params: { id: user.id } }" class="view-details">View Details</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: []
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('/api/users');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
  }
};
</script>

<style scoped>
.user-list {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

h1 {
  font-size: 2em;
  margin-bottom: 20px;
text-align: center;
}

ul {
  list-style-type: none;
  padding: 0;
}

.user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.user-item:last-child {
  border-bottom: none;
}

.view-details {
  color: #007bff;
  text-decoration: none;
}

.view-details:hover {
  text-decoration: underline;
}
</style>