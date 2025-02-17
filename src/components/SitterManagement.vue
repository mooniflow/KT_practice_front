<template>
  <div class="sitter-management-container">
    <h2>펫시터 관리</h2>
    <div class="management-buttons">
      <router-link to="/sitter-registration" class="management-button">
        펫시터 등록하기
      </router-link>
      <router-link to="/my-sitter-profile" class="management-button">
        내 프로필 관리
      </router-link>
      <router-link to="/sitter-schedule" class="management-button">
        일정 관리
      </router-link>
      <router-link to="/sitter-bookings" class="management-button">
        예약 관리
      </router-link>
      <router-link to="/sitter-reviews" class="management-button">
        리뷰 관리
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.sitter-management-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.management-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}

.management-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #ffffff;
  color: #333333;
  text-decoration: none;
  border-radius: 8px;
  border: 1px solid #dddddd;
  text-align: center;
  transition: all 0.3s ease;
  height: 100px;
  font-size: 1.1em;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.management-button:hover {
  background-color: #007bff;
  color: #ffffff;
  border-color: #007bff;
  transform: translateY(-2px);
}
</style>
