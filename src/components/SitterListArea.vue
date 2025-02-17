<template>
  <div class="sitter-list-container">
    <h2>지역별 펫시터 목록</h2>
    <div class="search-section">
      <div class="form-group">
        <label>지역 선택</label>
        <select v-model="selectedArea">
          <option value="">전체 지역</option>
          <option v-for="area in areas" :key="area" :value="area">
            {{ area }}
          </option>
        </select>
      </div>
    </div>

    <div class="sitters-grid">
      <div v-for="sitter in filteredSitters" :key="sitter.id" class="sitter-card">
        <img :src="sitter.profileImage" :alt="sitter.name" class="sitter-image">
        <div class="sitter-info">
          <h3>{{ sitter.name }}</h3>
          <p class="location">{{ sitter.location }}</p>
          <p class="experience">경력 {{ sitter.experience }}년</p>
          <router-link :to="{ name: 'sitter-detail-page', params: { id: sitter.userId }}" class="detail-btn">
            상세 정보 보기
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      sitters: [],
      selectedArea: '',
      areas: ['서울', '경기', '인천', '부산', '대구', '광주', '대전', '울산']
    };
  },
  computed: {
    filteredSitters() {
      if (!this.selectedArea) return this.sitters;
      return this.sitters.filter(sitter => sitter.location.includes(this.selectedArea));
    }
  },
  async created() {
    await this.fetchSitters();
  },
  methods: {
    async fetchSitters() {
      try {
        const response = await axios.get('http://localhost:8080/api/pet-sitters');
        this.sitters = response.data;
      } catch (error) {
        console.error('펫시터 목록 조회 실패:', error);
      }
    }
  }
};
</script>

<style scoped>
.sitter-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  overflow-x: hidden;
}

.search-section {
  margin-bottom: 30px;
}

.sitters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 10px;
}

.sitter-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sitter-card:hover {
  transform: translateY(-5px);
}

.sitter-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.sitter-info {
  padding: 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.sitter-info h3 {
  margin: 0 0 10px 0;
  font-size: 1.2rem;
  word-break: break-word;
}

.location, .experience {
  margin: 5px 0;
  word-break: break-word;
}

.detail-btn {
  margin-top: auto;
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  text-align: center;
  transition: background-color 0.3s;
}

@media (max-width: 768px) {
  .sitters-grid {
    grid-template-columns: 1fr;
  }
  
  .sitter-card {
    max-width: 100%;
  }
}
</style> 