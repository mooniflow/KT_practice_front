<template>
  <div class="pet-management-container">
    <div class="header">
      <h2>반려동물 관리</h2>
    </div>
    
    <!-- 반려동물 목록 -->
    <div class="pet-list">
      <div v-if="pets.length === 0" class="empty-list">
        등록된 반려동물이 없습니다.
      </div>
      <div v-else class="pet-grid">
        <div v-for="pet in pets" :key="pet.id" class="pet-card">
          <h3>{{ pet.name }}</h3>
          <div class="pet-info">
            <p>종류: {{ pet.type }}</p>
            <p>나이: {{ pet.age }}살</p>
            <p>특이사항: {{ pet.note }}</p>
          </div>
          <div class="pet-actions">
            <button @click="editPet(pet)" class="edit-button">수정</button>
            <button @click="confirmDelete(pet.id)" class="delete-button">삭제</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 반려동물 등록/수정 폼 -->
    <div v-if="showForm" class="pet-form-modal">
      <div class="modal-content">
        <h3>{{ isEditing ? '반려동물 정보 수정' : '새 반려동물 등록' }}</h3>
        <form @submit.prevent="submitPet">
          <div class="form-group">
            <label>이름</label>
            <input v-model="petForm.name" required>
          </div>
          <div class="form-group">
            <label>종류</label>
            <input v-model="petForm.type" required>
          </div>
          <div class="form-group">
            <label>나이</label>
            <input type="number" v-model="petForm.age" required>
          </div>
          <div class="form-group">
            <label>특이사항</label>
            <textarea v-model="petForm.note"></textarea>
          </div>
          <div class="form-group">
            <label>사진 URL</label>
            <input type="url" v-model="petForm.photo" placeholder="https://example.com/pet-image.jpg">
            <img v-if="petForm.photo" :src="petForm.photo" class="photo-preview" alt="미리보기">
          </div>
          <div class="form-actions">
            <button type="submit" class="submit-button">
              {{ isEditing ? '수정' : '등록' }}
            </button>
            <button type="button" @click="closeForm" class="cancel-button">취소</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 반려동물 등록 버튼 -->
    <button @click="showRegisterForm" class="add-pet-button">
      새 반려동물 등록
    </button>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      pets: [],
      showForm: false,
      isEditing: false,
      petForm: {
        name: '',
        type: '',
        age: '',
        note: '',
        photo: '',
        user: {
          id: null,
          username: '',
          email: '',
          password: '',
          phone: '',
          address: '',
          role: ''
        }
      },
      currentPetId: null
    };
  },
  computed: {
    ...mapState({
      currentUser: state => state.currentUser
    })
  },
  async created() {
    if (!this.currentUser) {
      alert('로그인이 필요합니다.');
      this.$router.push('/login');
      return;
    }
    await this.fetchPets();
  },
  methods: {
    async fetchPets() {
      try {
        const response = await axios.get(`http://localhost:8080/pets`, {
          params: {
            userId: this.currentUser.id
          }
        });
        this.pets = response.data;
      } catch (error) {
        console.error('반려동물 목록 조회 실패:', error);
      }
    },
    showRegisterForm() {
      this.isEditing = false;
      this.currentPetId = null;
      this.resetForm();
      this.showForm = true;
    },
    editPet(pet) {
      this.isEditing = true;
      this.currentPetId = pet.id;
      this.petForm = { ...pet };
      this.showForm = true;
    },
    async submitPet() {
      try {
        if (!this.currentUser) {
          alert('로그인이 필요합니다.');
          return;
        }

        const petData = {
          name: this.petForm.name,
          type: this.petForm.type,
          age: this.petForm.age,
          note: this.petForm.note,
          photo: this.petForm.photo,
          user: this.currentUser
        };

        if (this.isEditing) {
          await axios.put(`http://localhost:8080/pets/${this.currentPetId}`, petData);
        } else {
          await axios.post('http://localhost:8080/pets/register', petData);
        }
        await this.fetchPets();
        this.closeForm();
        alert(this.isEditing ? '반려동물 정보가 수정되었습니다.' : '새 반려동물이 등록되었습니다.');
      } catch (error) {
        console.error('반려동물 저장 실패:', error);
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    },
    async confirmDelete(petId) {
      if (confirm('정말로 이 반려동물을 삭제하시겠습니까?')) {
        try {
          await axios.delete(`http://localhost:8080/pets/${petId}`);
          await this.fetchPets();
          alert('반려동물이 삭제되었습니다.');
        } catch (error) {
          console.error('반려동물 삭제 실패:', error);
          alert('삭제 중 오류가 발생했습니다.');
        }
      }
    },
    closeForm() {
      this.showForm = false;
      this.resetForm();
    },
    resetForm() {
      this.petForm = {
        name: '',
        type: '',
        age: '',
        note: '',
        photo: '',
        user: {
          id: this.currentUser?.id || null,
          username: this.currentUser?.username || '',
          email: this.currentUser?.email || '',
          password: this.currentUser?.password || '',
          phone: this.currentUser?.phone || '',
          address: this.currentUser?.address || '',
          role: this.currentUser?.role || ''
        }
      };
      this.currentPetId = null;
    }
  }
};
</script>

<style scoped>
.pet-management-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.pet-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.pet-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.pet-actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.pet-form-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
}

.edit-button {
  background: #4CAF50;
  color: white;
}

.delete-button {
  background: #f44336;
  color: white;
}

.add-pet-button {
  background: #2196F3;
  color: white;
  margin-top: 20px;
}

.empty-list {
  text-align: center;
  padding: 40px;
  color: #666;
}

.photo-preview {
  max-width: 200px;
  max-height: 200px;
  margin-top: 10px;
  border-radius: 4px;
  object-fit: cover;
}

input[type="url"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 8px;
}
</style>
