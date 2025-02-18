<template>
    <div class="sitter-detail-container" v-if="sitter">
      <div class="profile-section">
        <img :src="sitter.profileImage" :alt="sitter.name" class="profile-image">
        <div class="profile-info">
          <h2>{{ sitter.name }}</h2>
          <p class="location">{{ sitter.location }}</p>
          <p class="experience">경력 {{ sitter.experience }}</p>
          <p class="introduction">{{ sitter.introduction }}</p>
          <div class="services">
            <h3>제공 서비스</h3>
            <ul>
              <li v-for="service in servicesList" :key="service">{{ service }}</li>
            </ul>
          </div>
          <div class="pet-sizes">
            <h3>돌봄 가능한 반려동물 크기</h3>
            <p>{{ sitter.petSize }}</p>
          </div>
          <div class="certifications" v-if="sitter.certifications && sitter.certifications.length > 0">
            <h3>자격증</h3>
            <ul>
              <li v-for="cert in sitter.certifications" :key="cert">{{ cert }}</li>
            </ul>
          </div>
        </div>
      </div>
  
      <div class="booking-section">
        <h3>예약하기</h3>
        <form @submit.prevent="submitBooking" class="booking-form">
          <div class="form-group">
            <label>반려동물 선택</label>
            <select v-model="selectedPetId" required>
              <option v-for="pet in userPets" :key="pet.id" :value="pet.id">
                {{ pet.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>날짜 선택</label>
            <input type="date" v-model="booking.date" required>
          </div>
          <div class="form-group">
            <label>시작 시간</label>
            <input type="time" v-model="booking.startTime" required>
          </div>
          <div class="form-group">
            <label>종료 시간</label>
            <input type="time" v-model="booking.endTime" required>
          </div>
          <div class="form-group">
            <label>서비스 선택</label>
            <select v-model="booking.service" required>
              <option v-for="service in servicesList" :key="service" :value="service">
                {{ service }}
              </option>
            </select>
          </div>
          <p class="price-info">시간당 {{ sitter.price }}원</p>
          <button type="submit" class="submit-btn">예약 요청</button>
        </form>
      </div>
  
      <div class="available-times">
        <h3>가능 시간</h3>
        <div v-for="(time, index) in sitter.availableTimes" :key="index" class="time-slot">
          {{ formatDateTime(time.startTime) }} - {{ formatDateTime(time.endTime) }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { mapState } from 'vuex';
  
  export default {
    props: {
      id: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        sitter: null,
        selectedPetId: null,
        userPets: [],
        booking: {
          date: '',
          startTime: '',
          endTime: '',
          service: ''
        }
      };
    },
    computed: {
      ...mapState(['currentUser']),
      servicesList() {
        return this.sitter?.services?.split(',') || [];
      }
    },
    async created() {
      await this.fetchSitterDetails();
      if (this.currentUser) {
        await this.fetchUserPets();
      }
    },
    methods: {
      async fetchSitterDetails() {
        try {
          const response = await axios.get(`http://localhost:8080/api/pet-sitters/user/${this.id}`);
          this.sitter = response.data;
        } catch (error) {
          console.error('펫시터 정보 조회 실패:', error);
        }
      },
      async fetchUserPets() {
        try {
          const response = await axios.get(`http://localhost:8080/pets`, {
            params: {
              userId: this.currentUser.id
            }
          });
          
          if (response.data) {
            this.userPets = response.data;
            if (this.userPets.length > 0) {
              this.selectedPetId = this.userPets[0].id;
            } else {
              alert('등록된 반려동물이 없습니다. 반려동물을 먼저 등록해주세요.');
              this.$router.push('/pet-registration');
            }
          }
        } catch (error) {
          console.error('반려동물 목록 조회 실패:', error);
          this.userPets = [];
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
            sitterId: this.sitter.id,
            startTime: new Date(`${this.booking.date}T${this.booking.startTime}`).toISOString(),
            endTime: new Date(`${this.booking.date}T${this.booking.endTime}`).toISOString(),
            service: this.booking.service,
            status: 'PENDING',
            location: this.sitter.location,
            price: this.sitter.price,
            paymentStatus: 'unpaid'
          };
  
          console.log('Booking Data:', bookingData);
          
          await axios.post('http://localhost:8080/api/bookings', bookingData);
          alert('예약 요청이 완료되었습니다.');
          this.$router.push({ name: 'MyBookings', params: { bookingInfo: bookingData } });
        } catch (error) {
          console.error('예약 요청 실패:', error);
          alert('예약 요청에 실패했습니다.');
        }
      },
      formatDateTime(dateTime) {
        return new Date(dateTime).toLocaleString();
      }
    }
  };
  </script>
  
  <style scoped>
  .sitter-detail-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    max-height: 100vh;
    overflow-y: auto;
  }
  
  .profile-section, .booking-section, .available-times {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .profile-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .profile-info h2 {
    margin-bottom: 10px;
    color: #333;
  }
  
  .location, .experience {
    color: #666;
    margin-bottom: 8px;
  }
  
  .introduction {
    margin: 15px 0;
    line-height: 1.6;
  }
  
  .services ul, .pet-sizes ul, .certifications ul {
    list-style: none;
    padding: 0;
    margin: 10px 0;
  }
  
  .booking-form .form-group {
    margin-bottom: 15px;
  }
  
  .booking-form label {
    display: block;
    margin-bottom: 5px;
    color: #333;
  }
  
  .booking-form input,
  .booking-form select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .price-info {
    font-weight: bold;
    margin: 15px 0;
    color: #2c3e50;
  }
  
  .submit-btn {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .submit-btn:hover {
    background-color: #45a049;
  }
  
  .time-slot {
    padding: 8px;
    margin: 5px 0;
    background-color: #f8f9fa;
    border-radius: 4px;
  }
  </style>