<template>
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
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'UserDetail',
  computed: {
    ...mapGetters(['currentUser']),
    user() {
      return this.currentUser;
    }
  }
};
</script>

<style scoped>
.user-detail {
  padding: 20px;
}
</style>