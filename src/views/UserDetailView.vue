<template>
  <Background>
    <UserDetail />
  </Background>
</template>

<script>
import Background from '@/components/Background.vue';
import UserDetail from '@/components/UserDetail.vue';

export default {
  name: 'UserDetailView',
  components: {
    Background,
    UserDetail
  }
};
</script> 