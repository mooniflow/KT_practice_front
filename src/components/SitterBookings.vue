<template>
  <div class="bookings-container">
    <h2>예약 관리</h2>
    <div class="booking-tabs">
      <button 
        :class="['tab-btn', { active: activeTab === 'pending' }]"
        @click="activeTab = 'pending'"
      >
        대기중인 예약
      </button>
      <button 
        :class="['tab-btn', { active: activeTab === 'confirmed' }]"
        @click="activeTab = 'confirmed'"
      >
        확정된 예약
      </button>
    </div>
    
    <div class="bookings-list">
      <div v-for="booking in filteredBookings" :key="booking.id" class="booking-item">
        <div class="booking-info">
          <h3>예약자: {{ booking.userName }}</h3>
          <p>반려동물: {{ booking.petName }}</p>
          <p>날짜: {{ formatDate(booking.date) }}</p>
          <p>시간: {{ booking.startTime }} - {{ booking.endTime }}</p>
          <p>서비스: {{ booking.service }}</p>
        </div>
        <div class="booking-actions" v-if="booking.status === 'pending'">
          <button @click="confirmBooking(booking.id)" class="confirm-btn">수락</button>
          <button @click="rejectBooking(booking.id)" class="reject-btn">거절</button>
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
      bookings: [],
      activeTab: 'pending'
    };
  },
  computed: {
    ...mapState(['currentUser']),
    filteredBookings() {
      return this.bookings.filter(booking => {
        return this.activeTab === 'pending' ? 
          booking.status === 'pending' : 
          booking.status === 'confirmed';
      });
    }
  },
  async created() {
    await this.fetchBookings();
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    async fetchBookings() {
      try {
        const response = await axios.get(`/api/bookings/sitter/${this.currentUser.id}`);
        this.bookings = response.data;
      } catch (error) {
        console.error('예약 조회 실패:', error);
      }
    },
    async confirmBooking(bookingId) {
      try {
        await axios.put(`/api/bookings/${bookingId}/confirm`);
        await this.fetchBookings();
      } catch (error) {
        console.error('예약 확인 실패:', error);
      }
    },
    async rejectBooking(bookingId) {
      try {
        await axios.put(`/api/bookings/${bookingId}/reject`);
        await this.fetchBookings();
      } catch (error) {
        console.error('예약 거절 실패:', error);
      }
    }
  }
};
</script>
