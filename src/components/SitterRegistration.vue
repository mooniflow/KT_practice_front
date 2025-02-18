<template>
  <div class="sitter-registration-container">
    <h2>펫시터 등록</h2>
    <form @submit.prevent="handleSubmit" class="registration-form">
      <!-- 기본 정보 섹션 -->
      <div class="form-section">
        <h3>기본 정보</h3>
        <div class="form-group">
          <label>이름</label>
          <input v-model="form.name" type="text" required>
        </div>
        <div class="form-group">
          <label>연락처</label>
          <input v-model="form.phone" type="tel" required>
        </div>
        <div class="form-group">
          <label>위치</label>
          <input v-model="form.location" type="text" required>
        </div>
        <div class="form-group">
          <label>돌봄 가능 시간</label>
          <div v-for="(time, index) in form.availableTimes" :key="index" class="time-range">
            <input v-model="time.startTime" type="datetime-local" required>
            <span>-</span>
            <input v-model="time.endTime" type="datetime-local" required>
            <button type="button" @click="removeTimeRange(index)">삭제</button>
          </div>
          <button type="button" @click="addTimeRange">시간대 추가</button>
        </div>
        <div class="form-group">
          <label>시간당 요금</label>
          <input v-model="form.price" type="number" required>
        </div>
      </div>

      <!-- 자기소개 및 돌봄 경험 섹션 -->
      <div class="form-section">
        <h3>자기소개 및 돌봄 경험</h3>
        <div class="form-group">
          <label>자기소개</label>
          <textarea v-model="form.introduction" required></textarea>
        </div>
        <div class="form-group">
          <label>돌봄 경험</label>
          <textarea v-model="form.experience" required></textarea>
        </div>
      </div>

      <!-- 자격증 및 인증 섹션 -->
      <div class="form-section">
        <h3>자격증 및 인증</h3>
        <div class="form-group">
          <label>자격증 URL</label>
          <div v-for="(url, index) in form.certifications" :key="index">
            <input v-model="form.certifications[index]" type="text" placeholder="자격증 URL">
            <button type="button" @click="removeCertification(index)">삭제</button>
          </div>
          <button type="button" @click="addCertification">자격증 URL 추가</button>
        </div>
      </div>

      <!-- 서비스 선택 섹션 -->
      <div class="form-section">
        <h3>제공 가능한 서비스</h3>
        <div class="form-group">
          <label>
            <input type="checkbox" v-model="form.services.walk"> 산책
          </label>
          <label>
            <input type="checkbox" v-model="form.services.visit"> 방문 돌봄
          </label>
          <label>
            <input type="checkbox" v-model="form.services.care"> 위탁 돌봄
          </label>
        </div>
        <div class="form-group">
          <h4>돌봄 가능한 반려동물 크기</h4>
          <label>
            <input type="checkbox" v-model="form.petSizes.small"> 소형견(10kg이하)
          </label>
          <label>
            <input type="checkbox" v-model="form.petSizes.medium"> 중형견(10kg~25kg)
          </label>
          <label>
            <input type="checkbox" v-model="form.petSizes.large"> 대형견(25kg초과)
          </label>
        </div>
      </div>

      <button type="submit" class="submit-btn">등록하기</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      form: {
        name: '',
        phone: '',
        location: '',
        certifications: [],
        experience: '',
        introduction: '',
        services: {
          walk: false,
          visit: false,
          care: false
        },
        petSizes: {
          small: false,
          medium: false,
          large: false
        },
        price: 0,
        isActive: true,
        availableTimes: []
      }
    };
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    addCertification() {
      this.form.certifications.push('');
    },
    removeCertification(index) {
      this.form.certifications.splice(index, 1);
    },
    addTimeRange() {
      this.form.availableTimes.push({
        startTime: '',
        endTime: ''
      });
    },
    removeTimeRange(index) {
      this.form.availableTimes.splice(index, 1);
    },
    async handleSubmit() {
      try {
        if (!this.currentUser) {
          alert('로그인이 필요합니다.');
          return;
        }

        const formData = {
          userId: this.currentUser.id,
          name: this.form.name,
          phone: this.form.phone,
          location: this.form.location,
          certifications: this.form.certifications,
          experience: this.form.experience,
          introduction: this.form.introduction,
          services: Object.keys(this.form.services).filter(key => this.form.services[key]).join(','),
          petSize: Object.keys(this.form.petSizes)
            .filter(key => this.form.petSizes[key])
            .map(size => size.toUpperCase())
            .join(','),
          price: this.form.price,
          isActive: this.form.isActive,
          availableTimes: this.form.availableTimes
        };

        console.log('Form Data:', formData);

        const response = await axios.post('http://localhost:8080/api/pet-sitters', formData);

        alert('펫시터 등록이 완료되었습니다.');
        this.$router.push('/sitter-profile');
      } catch (error) {
        console.error('펫시터 등록 실패:', error);
        alert('등록 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  }
};
</script>

<style scoped>
.sitter-registration-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  max-height: 100vh;
  overflow-y: auto;
}

.form-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}
</style>