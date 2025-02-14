<template>
  <Background>
    <h1>User Management</h1>
    <UserList @select-user="fetchUserDetail" />
    <UserDetail v-if="selectedUser" :user="selectedUser" />
  </Background>
</template>

<script>
import UserList from '@/components/UserList.vue';
import UserDetail from '@/components/UserDetail.vue';
import Background from '@/components/Background.vue';
import { ref } from 'vue';

export default {
  components: {
    UserList,
    UserDetail,
    Background
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