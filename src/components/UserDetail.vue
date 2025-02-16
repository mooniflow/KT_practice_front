<template>
  <div class="user-detail-container">
    <div class="user-detail-header">
      <h2>Profile Information</h2>
      <p class="subtitle">Manage your profile details</p>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading profile data...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <div class="error-icon">⚠️</div>
      <p>{{ error }}</p>
    </div>

    <div v-else-if="user" class="user-info-card">
      <div class="profile-header">
        <div class="profile-image">
          👤
        </div>
        <div class="profile-title">
          <h3>{{ user.username }}</h3>
          <span class="role-badge">{{ user.role }}</span>
        </div>
      </div>

      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">Email</span>
          <span class="info-value">{{ user.email }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Phone</span>
          <span class="info-value">{{ user.phone }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Address</span>
          <span class="info-value">{{ user.address }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'UserDetail',
  data() {
    return {
      loading: true,
      error: null
    };
  },
  computed: {
    ...mapGetters(['currentUser']),
    user() {
      return this.currentUser;
    }
  },
  methods: {
    ...mapActions(['fetchUserDetail']),
    async loadUserData() {
      try {
        this.loading = true;
        this.error = null;
        const userId = this.$route.params.id;
        if (!userId) {
          throw new Error('사용자 ID가 없습니다.');
        }
        await this.fetchUserDetail(userId);
      } catch (error) {
        console.error('사용자 정보 로딩 실패:', error);
        this.error = '사용자 정보를 불러오는데 실패했습니다.';
      } finally {
        this.loading = false;
      }
    }
  },
  async created() {
    await this.loadUserData();
  }
};
</script>

<style scoped>
.user-detail-container {
  padding: 20px;
}

.user-detail-header {
  margin-bottom: 32px;
}

h2 {
  font-size: 24px;
  font-weight: 700;
  color: #2B3674;
  margin-bottom: 8px;
}

.subtitle {
  color: #A3AED0;
}

.user-info-card {
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #E0E5F2;
}

.profile-image {
  width: 80px;
  height: 80px;
  background: #F6F8FD;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
}

.profile-title h3 {
  font-size: 20px;
  font-weight: 600;
  color: #2B3674;
  margin-bottom: 8px;
}

.role-badge {
  padding: 6px 12px;
  background: #4318FF;
  color: white;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 500;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.info-item {
  padding: 16px;
  background: #F6F8FD;
  border-radius: 16px;
}

.info-label {
  display: block;
  font-size: 12px;
  color: #A3AED0;
  margin-bottom: 8px;
}

.info-value {
  font-size: 14px;
  color: #2B3674;
  font-weight: 500;
}

.loading-state, .error-state {
  text-align: center;
  padding: 40px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #E9EDF7;
  border-top-color: #4318FF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-icon {
  font-size: 32px;
  margin-bottom: 16px;
  color: #FF4B4B;
}
</style>