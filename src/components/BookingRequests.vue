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
          <button @click="processPayment(request.id)" class="payment-btn">결제하기</button>
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
          userId: request.userId,
          sitterId: request.sitterId,
          startTime: request.startTime,
          endTime: request.endTime,
          service: request.service,
          status: request.status,
          location: request.location,
          price: request.price,
          paymentStatus: request.paymentStatus
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
    },
    async processPayment(requestId) {
      try {
        // 결제 로직을 여기에 추가
        alert('결제가 완료되었습니다.');
        // 결제 완료 후 추가 로직
      } catch (error) {
        console.error('결제 실패:', error);
        alert('결제 중 오류가 발생했습니다.');
      }
    },
    async submitBooking() {
      if (!this.currentUser) {
        alert('로그인이 필요합니다.');
        return;
      }

      if (!this.selectedPetId) {
        alert('반려동물을 선택해주세요.');
        return;
      }

      try {
        const selectedPet = this.userPets.find(pet => pet.id === this.selectedPetId);
        
        const bookingData = {
          userId: this.currentUser.id,
          userName: this.currentUser.username,
          petId: this.selectedPetId,
          petName: selectedPet.name,
          sitterId: this.sitter.id,
          sitterName: this.sitter.name,
          startTime: new Date(`${this.booking.date}T${this.booking.startTime}`).toISOString(),
          endTime: new Date(`${this.booking.date}T${this.booking.endTime}`).toISOString(),
          service: this.booking.service,
          status: 'PENDING',
          location: this.sitter.location,
          price: this.sitter.price,
          paymentStatus: request.paymentStatus
        };

        await axios.post('http://localhost:8080/api/bookings', bookingData);
        alert('예약 요청이 완료되었습니다.');
        this.$router.push({ 
          name: 'MyBookings', 
          query: { 
            bookingInfo: JSON.stringify(bookingData) 
          } 
        });
      } catch (error) {
        console.error('예약 요청 실패:', error);
        alert('예약 요청에 실패했습니다.');
      }
    }
  }
};
</script> 