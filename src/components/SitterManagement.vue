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
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.management-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}

.management-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #ffffff;
  color: #333333;
  text-decoration: none;
  border-radius: 8px;
  border: 1px solid #dddddd;
  text-align: center;
  transition: all 0.3s ease;
  height: 100px;
  font-size: 1.1em;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.management-button:hover {
  background-color: #007bff;
  color: #ffffff;
  border-color: #007bff;
  transform: translateY(-2px);
}

.not-registered {
  text-align: center;
  padding: 20px;
  border: 1px solid #dddddd;
  border-radius: 8px;
  margin-bottom: 20px;
}

.register-btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #ffffff;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.register-btn:hover {
  background-color: #0056b3;
}
</style>
