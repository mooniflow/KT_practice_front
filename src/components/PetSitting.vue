<template>
  <div class="pet-sitting-container">
    <h2>펫시터 서비스</h2>
    <div class="service-menu">
      <router-link to="/sitter-list-area" class="menu-item">
        <div class="menu-icon">🔍</div>
        <div class="menu-text">
          <h3>목록 조회</h3>
          <p>원하는 지역의 펫시터 목록을 조회</p>
        </div>
      </router-link>

      <router-link to="/sitter-detail-page" class="menu-item">
        <div class="menu-icon">📋</div>
        <div class="menu-text">
          <h3>상세 페이지</h3>
          <p>선택한 펫시터에 대한 상세 내용 표시</p>
        </div>
      </router-link>

      <router-link to="/sitter-booking" class="menu-item">
        <div class="menu-icon">📅</div>
        <div class="menu-text">
          <h3>예약 요청</h3>
          <p>날짜와 시간을 지정하여 예약 요청</p>
        </div>
      </router-link>

      <router-link to="/booking-approval" class="menu-item">
        <div class="menu-icon">✔️</div>
        <div class="menu-text">
          <h3>예약 승인</h3>
          <p>대상 펫시터가 요청을 승인할 시 예약 확정</p>
        </div>
      </router-link>

      <router-link to="/booking-chat" class="menu-item">
        <div class="menu-icon">💬</div>
        <div class="menu-text">
          <h3>채팅</h3>
          <p>예약 당일 펫시터와 채팅 기능</p>
        </div>
      </router-link>

      <router-link to="/my-bookings" class="menu-item">
        <div class="menu-icon">📅</div>
        <div class="menu-text">
          <h3>예약 내역</h3>
          <p>나의 펫시팅 예약 내역 확인</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PetSitting'
};
</script>

<style scoped>
.pet-sitting-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.service-menu {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-decoration: none;
  color: #333;
  transition: all 0.3s ease;
}

.menu-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.menu-icon {
  font-size: 2em;
  margin-right: 15px;
}

.menu-text h3 {
  margin: 0 0 5px 0;
  color: #333;
}

.menu-text p {
  margin: 0;
  color: #666;
  font-size: 0.9em;
}
</style> 