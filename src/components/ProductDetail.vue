<template>
  <div class="product-detail-container" v-if="product">
    <h2>{{ product.name }}</h2>
    <img :src="product.image" alt="Product Image" class="product-image" />
    <p class="product-description">{{ product.description }}</p>
    <p class="product-price">Price: ${{ product.price }}</p>
    <button @click="addToCart(product.id)">Add to Cart</button>
  </div>
</template>

<script>
export default {
  props: {
    productId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      product: null
    };
  },
  async created() {
    try {
      const response = await this.$axios.get(`/api/products/${this.productId}`);
      this.product = response.data;
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  },
  methods: {
    addToCart(productId) {
      this.$emit('add-to-cart', productId);
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

button {
  width: 100%;
  padding: 10px;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #005bb5;
}
</style>
