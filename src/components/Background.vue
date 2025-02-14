<template>
  <div class="background-container">
    <!-- 배경 이미지 -->
    <img :src="currentImage" alt="Background" class="background-image" />

    <!-- 네비게이션 바 -->
    <nav class="navbar">
      <div class="nav-left">
        <button @click="navigateTo('home')" class="nav-title">KT Pet care</button>
      </div>
      <div class="nav-right">
        <button v-if="!isAuthenticated" @click="navigateTo('login')" class="nav-button">Sign in</button>
        <button v-if="!isAuthenticated" @click="navigateTo('signup')" class="nav-button">Sign up</button>
        <button v-if="isAuthenticated" @click="navigateToUserDetails" class="nav-button">User Details</button>
        <button v-if="isAuthenticated" @click="logout" class="nav-button">Log out</button>
      </div>
    </nav>

    <!-- 콘텐츠 삽입 부분 -->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      images: [
        require('@/assets/background-image1.jpg'),
        require('@/assets/background-image2.jpg'),
        require('@/assets/background-image3.jpg')
      ],
      currentImageIndex: 0
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'currentUserId']),
    currentImage() {
      return this.images[this.currentImageIndex];
    }
  },
  methods: {
    ...mapActions(['logout']),
    navigateTo(route) {
      this.$router.push({ name: route });
    },
    navigateToUserDetails() {
      if (this.currentUserId) {
        this.$router.push({ name: 'user-details', params: { id: this.currentUserId } });
      } else {
        this.errorMessage = 'User ID is missing.';
      }
    },
    changeImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }
  },
  mounted() {
    setInterval(this.changeImage, 5000);
  }
};
</script>

<style scoped>
/* 🌟 전체 컨테이너 */
.background-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

/* 🌟 배경 이미지 (네비게이션 바 아래로 가게 설정) */
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1; /* 네비게이션 바보다 뒤로 */
}

/* 🌟 네비게이션 바 (투명 & 블러 효과) */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background: rgba(255, 255, 255, 0.05); /* 더 높은 투명도 */
  backdrop-filter: blur(10px); /* 블러 효과 */
  z-index: 10; /* 배경보다 위 */
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

/* 🌟 네비게이션 버튼 스타일 */
.nav-title {
  font-size: 24px;
  font-weight: bold;
  color: white;
  cursor: pointer;
}

.nav-left {
  display: flex;
  align-items: center;
}

.nav-right {
  display: flex;
  align-items: center;
}

.nav-button {
  margin-left: 15px;
  font-size: 16px;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

.nav-button:hover {
  color: rgba(255, 255, 255, 0.8);
}

/* 🌟 콘텐츠 영역 */
.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  z-index: 5;
}
</style>
