<template>
  <div class="sitter-profile-container">
    <h2>내 프로필 관리</h2>
    <div v-if="sitter" class="profile-content">
      <form @submit.prevent="updateProfile" class="profile-form">
        <div class="form-group">
          <label>프로필 이미지</label>
          <input type="file" @change="handleImageUpload" accept="image/*">
          <img v-if="imagePreview" :src="imagePreview" class="image-preview" alt="프로필 이미지">
        </div>
        <div class="form-group">
          <label>이름</label>
          <input type="text" v-model="sitter.name" required>
        </div>
        <div class="form-group">
          <label>활동 지역</label>
          <input type="text" v-model="sitter.location" required>
        </div>
        <div class="form-group">
          <label>연락처</label>
          <input type="tel" v-model="sitter.contact" required>
        </div>
        <div class="form-group">
          <label>소개글</label>
          <textarea v-model="sitter.introduction" rows="4"></textarea>
        </div>
        <div class="form-group">
          <label>시간당 요금</label>
          <input type="number" v-model="sitter.price" min="0" required>
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
      sitter: null,
      imagePreview: null
    };
  },
  computed: {
    ...mapState(['currentUser'])
  },
  async created() {
    await this.fetchSitterProfile();
  },
  methods: {
    async fetchSitterProfile() {
      try {
        const response = await axios.get(`/api/sitters/profile/${this.currentUser.id}`);
        this.sitter = response.data;
        this.imagePreview = this.sitter.profileImage;
      } catch (error) {
        console.error('프로필 조회 실패:', error);
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.imagePreview = URL.createObjectURL(file);
        this.sitter.profileImage = file;
      }
    },
    async updateProfile() {
      try {
        const formData = new FormData();
        Object.keys(this.sitter).forEach(key => {
          formData.append(key, this.sitter[key]);
        });

        await axios.put(`/api/sitters/${this.sitter.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        alert('프로필이 수정되었습니다.');
      } catch (error) {
        console.error('프로필 수정 실패:', error);
        alert('프로필 수정에 실패했습니다.');
      }
    }
  }
};
</script>
