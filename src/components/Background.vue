<template>
  <div class="background-container">
    <div class="left-sidebar">
      <div class="logo-section">
        <button @click="navigateTo('home')" class="nav-title">KT Pet care</button>
      </div>
      <div class="menu-section">
        <div class="button-container">
          <button v-if="!isAuthenticated" @click="navigateTo('login')" class="menu-button">
            <span class="icon">🔑</span>
            <span>Sign in</span>
          </button>
          <button v-if="!isAuthenticated" @click="navigateTo('signup')" class="menu-button">
            <span class="icon">📝</span>
            <span>Sign up</span>
          </button>
          <button v-if="isAuthenticated" @click="navigateToUserDetails" class="menu-button">
            <span class="icon">👤</span>
            <span>User Details</span>
          </button>
          <button v-if="isAuthenticated" @click="navigateTo('sitter-management')" class="menu-button">
            <span class="icon">👨‍💼</span>
            <span>펫시터 관리</span>
          </button>
          <button v-if="isAuthenticated" @click="logout" class="menu-button">
            <span class="icon">🚪</span>
            <span>Log out</span>
          </button>
          <button class="menu-button" @click="navigateTo('code-management')">
            <span class="icon">📋</span>
            <span>코드 관리</span>
          </button>
          <button v-if="isAuthenticated" @click="navigateTo('pet-management')" class="menu-button">
            <span class="icon">🐾</span>
            <span>반려동물 관리</span>
          </button>
        </div>
      </div>
    </div>
    
    <div class="main-content">
      <div class="top-bar">
        <div class="search-bar">
          <input type="text" placeholder="Search..." />
          <span class="search-icon">🔍</span>
        </div>
        <div class="user-profile">
          <span class="notification-icon">🔔</span>
          <span class="profile-image">👤</span>
        </div>
      </div>
      
      <div class="content-area">
        <slot></slot>
      </div>
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
    },
    onPayment() {
      // 결제 로직 추가
    }
  },
  mounted() {
    setInterval(this.changeImage, 5000);
  }
};
</script>

<style scoped>
.background-container {
  display: flex;
  min-height: 100vh;
  background: #F7F9FB;
}

.left-sidebar {
  width: 280px;
  background: white;
  padding: 24px;
  border-right: 1px solid #EDF2F7;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.logo-section {
  padding: 12px 0;
}

.nav-title {
  font-size: 24px;
  font-weight: 700;
  color: #2B3674;
  background: none;
  border: none;
  cursor: pointer;
}

.menu-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.menu-button {
  padding: 10px 20px;
  color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: left;
  background-color: transparent;
}

.menu-button:hover {
  background-color: #e0e0e0;
}

.icon {
  font-size: 20px;
}

.main-content {
  flex: 1;
  padding: 24px 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
}

.search-bar {
  position: relative;
  width: 300px;
}

.search-bar input {
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: 1px solid #E0E5F2;
  border-radius: 12px;
  background: white;
}

.search-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 20px;
}

.notification-icon, .profile-image {
  font-size: 24px;
  cursor: pointer;
}

.content-area {
  flex: 1;
  background: white;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
</style>

