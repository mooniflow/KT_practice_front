<template>
  <div class="sitter-profile-container">
    <h2>내 프로필 관리</h2>
    <div v-if="sitter" class="profile-content">
      <form @submit.prevent="updateProfile" class="profile-form">
        <!-- 기본 정보 섹션 -->
        <div class="form-section">
          <h3>기본 정보</h3>
          <div class="form-group">
            <label>이름</label>
            <input v-model="sitter.name" type="text" required>
          </div>
          <div class="form-group">
            <label>연락처</label>
            <input v-model="sitter.phone" type="tel" required>
          </div>
          <div class="form-group">
            <label>위치</label>
            <input v-model="sitter.location" type="text" required>
          </div>
          <div class="form-group">
            <label>활동 상태</label>
            <label>
              <input type="checkbox" v-model="sitter.isActive"> 활동 중
            </label>
          </div>
          <div class="form-group">
            <label>돌봄 가능 시간</label>
            <div v-for="(time, index) in sitter.availableTimes" :key="index" class="time-range">
              <input v-model="time.startTime" type="datetime-local" required>
              <span>-</span>
              <input v-model="time.endTime" type="datetime-local" required>
              <button type="button" @click="removeTimeRange(index)">삭제</button>
            </div>
            <button type="button" @click="addTimeRange">시간대 추가</button>
          </div>
          <div class="form-group">
            <label>시간당 요금</label>
            <input v-model="sitter.price" type="number" required>
          </div>
        </div>

        <!-- 자기소개 및 돌봄 경험 섹션 -->
        <div class="form-section">
          <h3>자기소개 및 돌봄 경험</h3>
          <div class="form-group">
            <label>자기소개</label>
            <textarea v-model="sitter.introduction" required></textarea>
          </div>
          <div class="form-group">
            <label>돌봄 경험</label>
            <textarea v-model="sitter.experience" required></textarea>
          </div>
        </div>

        <!-- 자격증 섹션 -->
        <div class="form-section">
          <h3>자격증</h3>
          <div class="form-group">
            <div v-for="(cert, index) in sitter.certifications" :key="index">
              <input v-model="sitter.certifications[index]" type="text" placeholder="자격증 URL">
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
              <input type="checkbox" v-model="sitter.services.walk"> 산책
            </label>
            <label>
              <input type="checkbox" v-model="sitter.services.visit"> 방문 돌봄
            </label>
            <label>
              <input type="checkbox" v-model="sitter.services.care"> 위탁 돌봄
            </label>
          </div>
          <div class="form-group">
            <h4>돌봄 가능한 반려동물 크기</h4>
            <label>
              <input type="checkbox" v-model="sitter.petSizes.small"> 소형견(10kg이하)
            </label>
            <label>
              <input type="checkbox" v-model="sitter.petSizes.medium"> 중형견(10kg~25kg)
            </label>
            <label>
              <input type="checkbox" v-model="sitter.petSizes.large"> 대형견(25kg초과)
            </label>
          </div>
        </div>

        <button type="submit" class="submit-btn">프로필 수정</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      sitter: {
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
        isActive: false,
        availableTimes: []
      }
    };
  },
  computed: {
    ...mapState(['currentUser'])
  },
  async created() {
    if (this.currentUser) {
      await this.fetchSitterProfile();
    } else {
      this.$router.push('/login');
    }
  },
  methods: {
    async fetchSitterProfile() {
      try {
        if (!this.currentUser) {
          console.error('로그인이 필요합니다.');
          this.$router.push('/login');
          return;
        }

        const response = await axios.get('http://localhost:8080/api/pet-sitters');
        const myProfile = response.data.find(sitter => sitter.userId === this.currentUser.id);
        
        if (myProfile) {
          // 서비스와 반려동물 크기를 객체로 변환
          const servicesArray = myProfile.services ? myProfile.services.split(',') : [];
          const petSizesArray = myProfile.petSize ? myProfile.petSize.split(',') : [];
          
          this.sitter = {
            ...myProfile,
            services: {
              walk: servicesArray.includes('walk'),
              visit: servicesArray.includes('visit'),
              care: servicesArray.includes('care')
            },
            petSizes: {
              small: petSizesArray.includes('SMALL'),
              medium: petSizesArray.includes('MEDIUM'),
              large: petSizesArray.includes('LARGE')
            }
          };
        } else {
          this.$router.push('/sitter-registration');
        }
      } catch (error) {
        console.error('프로필 조회 실패:', error);
      }
    },
    async updateProfile() {
      try {
        if (!this.currentUser) {
          alert('로그인이 필요합니다.');
          return;
        }

        const formData = {
          id: this.sitter.id,
          userId: this.currentUser.id,
          name: this.sitter.name,
          phone: this.sitter.phone,
          location: this.sitter.location,
          certifications: this.sitter.certifications,
          experience: this.sitter.experience,
          introduction: this.sitter.introduction,
          services: Object.keys(this.sitter.services)
            .filter(key => this.sitter.services[key])
            .join(','),
          petSize: Object.keys(this.sitter.petSizes)
            .filter(key => this.sitter.petSizes[key])
            .map(size => size.toUpperCase())
            .join(','),
          price: this.sitter.price,
          isActive: this.sitter.isActive,
          availableTimes: this.sitter.availableTimes.map(time => ({
            startTime: time.startTime,
            endTime: time.endTime
          }))
        };

        await axios.put(`http://localhost:8080/api/pet-sitters/${this.sitter.id}`, formData);
        alert('프로필이 수정되었습니다.');
        await this.fetchSitterProfile();
      } catch (error) {
        console.error('프로필 수정 실패:', error);
        alert('프로필 수정에 실패했습니다.');
      }
    },
    addTimeRange() {
      this.sitter.availableTimes.push({
        startTime: '',
        endTime: ''
      });
    },
    removeTimeRange(index) {
      this.sitter.availableTimes.splice(index, 1);
    },
    addCertification() {
      this.sitter.certifications.push('');
    },
    removeCertification(index) {
      this.sitter.certifications.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.sitter-profile-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  max-height: 100vh;
  overflow-y: auto;
}

.profile-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.image-preview {
  max-width: 200px;
  margin-top: 10px;
  border-radius: 4px;
}

.submit-btn {
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background: #0056b3;
}
</style>
