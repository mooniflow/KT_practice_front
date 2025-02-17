<template>
  <div class="booking-requests-container">
    <h2>예약 요청 관리</h2>
    <div v-if="requests.length === 0" class="no-requests">
      대기 중인 예약 요청이 없습니다.
    </div>
    <div v-else class="requests-list">
      <div v-for="request in requests" :key="request.id" class="request-item">
        <div class="request-info">
          <p><strong>예약자:</strong> {{ request.userName }}</p>
          <p><strong>반려동물:</strong> {{ request.petName }}</p>
          <p><strong>서비스:</strong> {{ request.service }}</p>
          <p><strong>날짜:</strong> {{ formatDate(request.startTime) }}</p>
          <p><strong>시간:</strong> 
            {{ new Date(request.startTime).toLocaleTimeString() }} - 
            {{ new Date(request.endTime).toLocaleTimeString() }}
          </p>
          <p><strong>위치:</strong> {{ request.location }}</p>
          <p><strong>가격:</strong> {{ request.price }}원</p>
        </div>
        <div class="request-actions">
          <button @click="handleRequest(request.id, 'approve')" class="approve-btn">승인</button>
          <button @click="handleRequest(request.id, 'reject')" class="reject-btn">거절</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      requests: [],
      sitterProfile: null
    };
  },
  computed: {
    ...mapState(['currentUser'])
  },
  async created() {
    if (this.currentUser) {
      await this.fetchSitterProfile();
      if (this.sitterProfile) {
        await this.fetchPendingRequests();
      } else {
        this.$router.push('/sitter-registration');
      }
    } else {
      this.$router.push('/login');
    }
  },
  methods: {
    async fetchSitterProfile() {
      try {
        const response = await axios.get('http://localhost:8080/api/pet-sitters');
        this.sitterProfile = response.data.find(sitter => sitter.userId === this.currentUser.id);
      } catch (error) {
        console.error('펫시터 프로필 조회 실패:', error);
      }
    },
    async fetchPendingRequests() {
      try {
        if (!this.sitterProfile) {
          console.error('펫시터 프로필을 찾을 수 없습니다.');
          return;
        }
        const response = await axios.get(`http://localhost:8080/api/bookings/pending/${this.sitterProfile.id}`);
        
        // 응답이 없거나 데이터가 없는 경우 처리
        if (!response || !response.data) {
          this.requests = [];
          return;
        }

        // BookingDTO 형식에 맞게 데이터 매핑
        this.requests = Array.isArray(response.data) ? response.data.map(request => ({
          id: request.id,
          userName: request.userName || '알 수 없음',
          petName: request.petName || '알 수 없음',
          service: request.service,
          startTime: request.startTime,
          endTime: request.endTime,
          location: request.location,
          price: request.price,
          status: request.status
        })) : [];
      } catch (error) {
        console.error('예약 요청 조회 실패:', error);
        this.requests = [];
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    async handleRequest(requestId, action) {
      try {
        await axios.put(`http://localhost:8080/api/bookings/${requestId}/${action}`);
        await this.fetchPendingRequests();
        alert(`예약이 ${action === 'approve' ? '승인' : '거절'}되었습니다.`);
      } catch (error) {
        console.error('예약 처리 실패:', error);
        alert('예약 처리 중 오류가 발생했습니다.');
      }
    }
  }
};
</script> 