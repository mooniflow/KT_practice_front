<template>
  <div class="cart-container">
    <h2>장바구니</h2>
    <div v-if="cartItems.length === 0" class="empty-cart">
      장바구니가 비어있습니다.
    </div>
    <div v-else>
      <ul class="cart-items">
        <li v-for="item in cartItems" :key="item.productId" class="cart-item">
          <div class="cart-item-details">
            <h3>{{ item.productName }}</h3>
            <p>가격: {{ item.price }}원</p>
            <p>수량: {{ item.quantity }}</p>
            <p>총 가격: {{ item.totalPrice }}원</p>
            <button @click="removeFromCart(item.productId)" class="remove-button">삭제</button>
          </div>
        </li>
      </ul>
      <div class="cart-total">
        <p>총 결제 금액: {{ totalPrice }}원</p>
        <button @click="onPayment" class="checkout-button">결제하기</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState({
      cartItems: state => state.cart
    }),
    totalPrice() {
      return this.cartItems.reduce((total, item) => 
        total + parseFloat(item.totalPrice), 0).toFixed(0);
    }
  },
  methods: {
    ...mapActions(['removeFromCart']),
    onPayment() {
      const { IMP } = window;
      IMP.init('imp85533822');

      const data = {
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: `mid_${new Date().getTime()}`,
        amount: this.totalPrice,
        name: `장바구니 상품 ${this.cartItems.length}개`,
        buyer_name: '구매자이름',
        buyer_tel: '010-1234-5678',
        buyer_email: 'buyer@example.com',
        buyer_addr: '서울특별시 강남구 삼성동',
        buyer_postcode: '123-456'
      };

      IMP.request_pay(data, this.callback);
    },
    callback(response) {
      const { success, error_msg } = response;
      if (success) {
        alert('결제 성공');
        // 여기에 결제 성공 후 장바구니 비우기 등의 로직 추가 가능
      } else {
        alert(`결제 실패: ${error_msg}`);
      }
    }
  }
};
</script>

<style scoped>
.cart-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.empty-cart {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 18px;
}

.cart-items {
  list-style: none;
  padding: 0;
}

.cart-item {
  padding: 20px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f8f9fa;
}

.cart-item-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cart-item-details h3 {
  margin: 0;
  color: #333;
}

.cart-item-details p {
  margin: 0;
  color: #666;
}

.remove-button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.remove-button:hover {
  background-color: #c82333;
}

.cart-total {
  margin-top: 30px;
  padding: 20px;
  border-top: 2px solid #eee;
  text-align: right;
}

.cart-total p {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.checkout-button {
  padding: 12px 24px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.checkout-button:hover {
  background-color: #218838;
}
</style>
