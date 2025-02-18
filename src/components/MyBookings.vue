<template>
  <div class="my-bookings-container">
    <h2>내 예약 내역</h2>
    <div v-if="bookings.length === 0" class="no-bookings">
      예약 내역이 없습니다.
    </div>
    <div v-else class="bookings-list">
      <div v-for="booking in bookings" :key="booking.id" class="booking-info">
        <p><strong>예약 ID:</strong> {{ booking.id }}</p>
        <p><strong>서비스:</strong> {{ booking.service }}</p>
        <p><strong>날짜:</strong> {{ formatDate(booking.startTime) }}</p>
        <p><strong>시간:</strong> 
          {{ new Date(booking.startTime).toLocaleTimeString() }} - 
          {{ new Date(booking.endTime).toLocaleTimeString() }}
        </p>
        <p><strong>위치:</strong> {{ booking.location }}</p>
        <p><strong>가격:</strong> {{ booking.price }}원</p>
        <p><strong>결제 상태:</strong> {{ booking.paymentStatus === 'paid' ? '결제 완료' : '미결제' }}</p>
        <button v-if="booking.paymentStatus !== 'paid'" 
                @click="onPayment(booking)" 
                class="payment-btn">
          결제하기
        </button>
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
      bookings: []
    };
  },
  computed: {
    ...mapState(['currentUser'])
  },
  async created() {
    if (this.currentUser) {
      await this.fetchUserBookings();
      const script = document.createElement('script');
      script.src = 'https://cdn.iamport.kr/v1/iamport.js';
      document.head.appendChild(script);
    } else {
      this.$router.push('/login');
    }
  },
  methods: {
    async fetchUserBookings() {
      try {
        const response = await axios.get(`http://localhost:8080/api/bookings/user/${this.currentUser.id}`);
        this.bookings = response.data;
      } catch (error) {
        console.error('예약 내역 조회 실패:', error);
        this.bookings = [];
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    onPayment(booking) {
      const { IMP } = window;
      IMP.init('imp85533822');

      const data = {
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: `booking_${booking.id}_${new Date().getTime()}`,
        amount: booking.price,
        name: `펫시팅 서비스 - ${booking.service}`,
        buyer_name: this.currentUser.username,
        buyer_tel: '010-5176-2808',
        buyer_email: 'munchan2808@gmail.com',
        buyer_addr: booking.location,
        buyer_postcode: '123-456'
      };

      IMP.request_pay(data, (response) => this.callback(response, booking.id));
    },
    async callback(response, bookingId) {
      const { success, error_msg } = response;
      
      if (success) {
        try {
          await axios.put(`http://localhost:8080/api/bookings/${bookingId}/payment`, {
            paymentStatus: 'paid'
          });
          await this.fetchUserBookings();
          alert('결제가 완료되었습니다.');
        } catch (error) {
          console.error('결제 상태 업데이트 실패:', error);
          alert('결제는 성공했으나 상태 업데이트에 실패했습니다.');
        }
      } else {
        alert(`결제 실패: ${error_msg}`);
      }
    }
  }
};
</script>

<style scoped>
.my-bookings-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.no-bookings {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 18px;
}

.bookings-list {
  display: grid;
  gap: 20px;
}

.booking-info {
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f8f9fa;
}

.booking-info p {
  margin: 8px 0;
  color: #333;
}

.payment-btn {
  display: block;
  width: 100%;
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

.payment-btn:hover {
  background-color: #45a049;
}
</style> 