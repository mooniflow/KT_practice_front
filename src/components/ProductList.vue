<template>
  <div class="product-list-container">
    <div class="header">
      <h2>Product List</h2>
      <button @click="navigateToCart" class="cart-button">
        장바구니 보기
      </button>
    </div>
    
    <div class="search-container">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="상품명을 입력하세요"
        class="search-input"
      />
    </div>

    <div v-if="filteredProducts.length === 0">검색 결과가 없습니다.</div>
    <ul>
      <li v-for="product in filteredProducts" :key="product.productId" @click="viewProductDetail(product.productId)">
        <div class="product-info">
          <h3>{{ product.productName }}</h3>
          <p>{{ product.productDescription }}</p>
          <p>가격: {{ product.productPrice }}원</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      searchQuery: ''
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => 
        product.productName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  async created() {
    try {
      const jsonApi = axios.create({
        baseURL: 'http://localhost:8080',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const response = await jsonApi.get('/api/products');
      
      this.products = response.data.map(product => ({
        productId: product.productId,
        productName: product.productName,
        productDescription: product.productDescription,
        productPrice: product.productPrice
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },
  methods: {
    viewProductDetail(productId) {
      this.$router.push({ 
        name: 'product-detail', 
        params: { id: productId.toString() }
      });
    },
    navigateToCart() {
      this.$router.push({ name: 'cart' });
    }
  }
};
</script>

<style scoped>
.product-list-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.search-container {
  margin: 20px 0;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.search-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 15px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

li:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.product-info {
  flex: 1;
}

h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

p {
  margin: 5px 0 0;
  color: #666;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.cart-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.cart-button:hover {
  background-color: #0056b3;
}
</style>
