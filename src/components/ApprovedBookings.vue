<template>
  <div class="approved-bookings-container">
    <h2>승인된 예약 관리</h2>
    <div v-if="approvedBookings.length === 0" class="no-bookings">
      승인된 예약이 없습니다.
    </div>
    <div v-else class="bookings-list">
      <div v-for="booking in approvedBookings" :key="booking.id" class="booking-item">
        <div class="booking-info">
          <p><strong>예약자:</strong> {{ booking.userName }}</p>
          <p><strong>반려동물:</strong> {{ booking.petName }}</p>
          <p><strong>서비스:</strong> {{ booking.service }}</p>
          <p><strong>날짜:</strong> {{ formatDate(booking.startTime) }}</p>
          <p><strong>시간:</strong> 
            {{ new Date(booking.startTime).toLocaleTimeString() }} - 
            {{ new Date(booking.endTime).toLocaleTimeString() }}
          </p>
          <p><strong>위치:</strong> {{ booking.location }}</p>
          <p><strong>가격:</strong> {{ booking.price }}원</p>
          <p><strong>상태:</strong> {{ booking.status }}</p>
        </div>
        <div class="booking-actions">
          <button @click="completeBooking(booking.id)" 
                  class="complete-btn"
                  v-if="booking.status === 'APPROVED'">
            서비스 완료
          </button>
          <button @click="cancelBooking(booking.id)" 
                  class="cancel-btn"
                  v-if="booking.status === 'APPROVED'">
            예약 취소
          </button>
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
      approvedBookings: [],
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
        await this.fetchApprovedBookings();
      } else {
        this.$router.push('/sitter-registration');
      }
    } else {
      this.$router.push('/login');
    }
  },
  methods: {
    async fetchApprovedBookings() {
      try {
        if (!this.sitterProfile) {
          console.error('펫시터 프로필을 찾을 수 없습니다.');
          return;
        }
        const response = await axios.get(`http://localhost:8080/api/bookings/approved/${this.sitterProfile.id}`);
        
        // 응답이 없거나 데이터가 없는 경우 처리
        if (!response || !response.data) {
          this.approvedBookings = [];
          return;
        }

        // BookingDTO 형식에 맞게 데이터 매핑
        this.approvedBookings = Array.isArray(response.data) ? response.data.map(booking => ({
          id: booking.id,
          userName: booking.userName || '알 수 없음',
          petName: booking.petName || '알 수 없음',
          service: booking.service,
          startTime: booking.startTime,
          endTime: booking.endTime,
          location: booking.location,
          price: booking.price,
          status: booking.status
        })) : [];
      } catch (error) {
        console.error('승인된 예약 조회 실패:', error);
        this.approvedBookings = [];
      }
    },
    async completeBooking(bookingId) {
      try {
        await axios.put(`http://localhost:8080/api/bookings/${bookingId}/complete`);
        await this.fetchApprovedBookings();
        alert('서비스가 완료되었습니다.');
      } catch (error) {
        console.error('서비스 완료 처리 실패:', error);
      }
    },
    async cancelBooking(bookingId) {
      try {
        await axios.put(`http://localhost:8080/api/bookings/${bookingId}/cancel`);
        await this.fetchApprovedBookings();
        alert('예약이 취소되었습니다.');
      } catch (error) {
        console.error('예약 취소 실패:', error);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    async fetchSitterProfile() {
      try {
        const response = await axios.get('http://localhost:8080/api/pet-sitters');
        this.sitterProfile = response.data.find(sitter => sitter.userId === this.currentUser.id);
      } catch (error) {
        console.error('펫시터 프로필 조회 실패:', error);
      }
    }
  }
};
</script> 