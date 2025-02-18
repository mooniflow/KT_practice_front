<template>
  <div class="sitter-management-container">
    <h2>펫시터 관리</h2>
    
    <!-- 펫시터로 등록되지 않은 경우 -->
    <div v-if="!isSitter" class="not-registered">
      <p>아직 펫시터로 등록되지 않았습니다.</p>
      <router-link to="/sitter-registration" class="register-btn">
        펫시터 등록하기
      </router-link>
    </div>

    <!-- 펫시터로 등록된 경우 -->
    <div v-else class="management-buttons">
      <router-link to="/booking-requests" class="management-button">
        예약 요청 관리
      </router-link>
      <router-link to="/approved-bookings" class="management-button">
        승인된 예약 관리
      </router-link>
      <router-link to="/my-sitter-profile" class="management-button">
        프로필 관리
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      isSitter: false
    };
  },
  computed: {
    ...mapState(['currentUser'])
  },
  async created() {
    if (this.currentUser) {
      await this.checkSitterStatus();
    } else {
      this.$router.push('/login');
    }
  },
  methods: {
    async checkSitterStatus() {
      try {
        const response = await axios.get('http://localhost:8080/api/pet-sitters');
        const myProfile = response.data.find(sitter => sitter.userId === this.currentUser.id);
        this.isSitter = !!myProfile;
      } catch (error) {
        console.error('펫시터 상태 확인 실패:', error);
      }
    }
  }
};
</script>

<style scoped>
.sitter-management-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
  background-color: #f5f5f5;
}

h2 {
  color: #333;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
}

.not-registered {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  text-align: center;
  margin-top: 20px;
  border: 1px solid #e0e0e0;
}

.not-registered p {
  color: #666;
  font-size: 16px;
  margin-bottom: 20px;
}

.register-btn {
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
  border: 1px solid #0056b3;
}

.register-btn:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.management-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  padding: 20px;
}

.management-button {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  text-decoration: none;
  color: #333;
  font-weight: 500;
  text-align: center;
  transition: all 0.2s;
  border: 1px solid #e0e0e0;
  position: relative;
  overflow: hidden;
}

.management-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  border-color: #007bff;
  color: #007bff;
}

.management-button::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #007bff;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.management-button:hover::after {
  transform: scaleX(1);
}
</style>
