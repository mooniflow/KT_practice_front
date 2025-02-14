<template>
  <div>
    <h1>User Management</h1>
    <UserList @select-user="fetchUserDetail" />
    <UserDetail v-if="selectedUser" :user="selectedUser" />
  </div>
</template>

<script>
import UserList from '@/components/UserList.vue';
import UserDetail from '@/components/UserDetail.vue';
import { ref } from 'vue';

export default {
  components: {
    UserList,
    UserDetail
  },
  setup() {
    const selectedUser = ref(null);

    const fetchUserDetail = (user) => {
      selectedUser.value = user;
    };

    return {
      selectedUser,
      fetchUserDetail
    };
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>