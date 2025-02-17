<template>
  <div class="sitter-registration-container">
    <h2>펫시터 등록</h2>
    <form @submit.prevent="handleSubmit" class="registration-form">
      <!-- 기본 정보 섹션 -->
      <div class="form-section">
        <h3>기본 정보</h3>
        <div class="form-group">
          <label for="name">이름</label>
          <input type="text" id="name" v-model="form.name" required>
        </div>
        <div class="form-group">
          <label for="location">활동 지역</label>
          <input type="text" id="location" v-model="form.location" required>
        </div>
      </div>

      <!-- 자격 및 경험 섹션 -->
      <div class="form-section">
        <h3>자격 및 경험</h3>
        <div class="form-group">
          <label>자격증</label>
          <div class="certification-list">
            <div v-for="(cert, index) in form.certifications" :key="index" class="certification-item">
              <input type="text" v-model="form.certifications[index]">
              <button type="button" @click="removeCertification(index)" class="remove-btn">삭제</button>
            </div>
          </div>
          <button type="button" @click="addCertification" class="add-btn">자격증 추가</button>
        </div>
        <div class="form-group">
          <label for="experience">경력 사항</label>
          <textarea id="experience" v-model="form.experience" rows="3"></textarea>
        </div>
      </div>

      <!-- 서비스 정보 섹션 -->
      <div class="form-section">
        <h3>서비스 정보</h3>
        <div class="form-group">
          <label>돌봄 가능한 반려동물 크기</label>
          <select v-model="form.petSize">
            <option value="1">소형견 (10kg 이하)</option>
            <option value="2">중형견 (10kg~25kg)</option>
            <option value="3">대형견 (25kg 초과)</option>
          </select>
        </div>
        <div class="form-group">
          <label>제공 가능한 서비스</label>
          <input type="text" v-model="form.services" placeholder="산책, 방문 돌봄, 위탁 돌봄 등">
        </div>
        <div class="form-group">
          <label>서비스 요금 (시간당)</label>
          <input type="number" v-model="form.price" min="0">
        </div>
      </div>

      <!-- 활동 가능 시간 섹션 -->
      <div class="form-section">
        <h3>활동 가능 시간</h3>
        <div v-for="(timeRange, index) in form.availableTimes" :key="index" class="time-range">
          <input type="datetime-local" v-model="timeRange.startTime">
          <span>~</span>
          <input type="datetime-local" v-model="timeRange.endTime">
          <button type="button" @click="removeTimeRange(index)" class="remove-btn">삭제</button>
        </div>
        <button type="button" @click="addTimeRange" class="add-btn">시간대 추가</button>
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
        location: '',
        certifications: [],
        experience: '',
        services: '',
        petSize: 1,
        price: 0,
        availableTimes: [],
        isActive: true
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

        const response = await axios.post('http://localhost:8080/api/pet-sitters', {
          ...this.form,
          userId: this.currentUser.id
        });

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
}

.form-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, select, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.time-range {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
}

.add-btn, .remove-btn {
  padding: 5px 10px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.add-btn {
  background: #4CAF50;
  color: white;
}

.remove-btn {
  background: #f44336;
  color: white;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-btn:hover {
  background: #1976D2;
}
</style>
