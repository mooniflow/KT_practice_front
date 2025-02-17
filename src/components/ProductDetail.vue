<template>
  <div class="product-detail-container" v-if="product">
    <h2>{{ product.productName }}</h2>
    <img :src="product.image" alt="Product Image" class="product-image" v-if="product.image"/>
    <p class="product-description">{{ product.productDescription }}</p>
    <p class="product-price">가격: {{ product.productPrice }}원</p>
    
    <div class="quantity-selector">
      <label for="quantity">수량:</label>
      <div class="quantity-controls">
        <button @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
        <input 
          type="number" 
          id="quantity" 
          v-model.number="quantity" 
          min="1"
          max="99"
        >
        <button @click="increaseQuantity">+</button>
      </div>
    </div>
    
    <div class="total-price">
      총 가격: {{ calculateTotalPrice }}원
    </div>
    
    <button @click="addToCart" class="add-to-cart-button">장바구니 담기</button>
  </div>
  <div v-else>
    <p>Loading product details...</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    productId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      product: null,
      quantity: 1
    };
  },
  computed: {
    calculateTotalPrice() {
      if (!this.product) return 0;
      return (this.product.productPrice * this.quantity).toFixed(2);
    }
  },
  async created() {
    console.log('ProductDetail created with productId:', this.productId);
    try {
      const jsonApi = axios.create({
        baseURL: 'http://localhost:8080',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const response = await jsonApi.get(`/api/products/${this.productId}`);
      console.log('Product detail response:', response.data);
      this.product = response.data;
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  },
  methods: {
    increaseQuantity() {
      if (this.quantity < 99) {
        this.quantity++;
      }
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    addToCart() {
      const cartItem = {
        productId: this.product.productId,
        productName: this.product.productName,
        quantity: this.quantity,
        price: this.product.productPrice,
        totalPrice: this.calculateTotalPrice
      };
      
      // 여기서 Vuex store에 장바구니 아이템을 추가하는 액션을 디스패치합니다
      this.$store.dispatch('addToCart', cartItem);
      alert('장바구니에 추가되었습니다!');
    }
  }
};
</script>

<style scoped>
.product-detail-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333333;
}

.product-image {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
}

.product-description {
  margin-bottom: 20px;
  color: #666666;
}

.product-price {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333333;
}

.quantity-selector {
  margin: 20px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-controls input {
  width: 60px;
  text-align: center;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.quantity-controls button {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background-color: #f8f8f8;
  border-radius: 4px;
  cursor: pointer;
}

.quantity-controls button:disabled {
  background-color: #eee;
  cursor: not-allowed;
}

.total-price {
  font-size: 1.2em;
  font-weight: bold;
  margin: 20px 0;
  color: #007aff;
}

.add-to-cart-button {
  width: 100%;
  padding: 15px;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.add-to-cart-button:hover {
  background-color: #0056b3;
}
</style>
