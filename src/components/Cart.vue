<template>
  <div class="cart-container">
    <h2>Your Cart</h2>
    <div v-if="cartItems.length === 0" class="empty-cart">
      Your cart is empty.
    </div>
    <div v-else>
      <ul class="cart-items">
        <li v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="item.image" alt="Product Image" class="cart-item-image" />
          <div class="cart-item-details">
            <h3>{{ item.name }}</h3>
            <p>Price: ${{ item.price }}</p>
            <button @click="removeFromCart(item.id)">Remove</button>
          </div>
        </li>
      </ul>
      <div class="cart-total">
        <p>Total: ${{ totalPrice }}</p>
        <button @click="proceedToCheckout">Proceed to Checkout</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: []
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((total, item) => total + item.price, 0);
    }
  },
  methods: {
    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter(item => item.id !== productId);
    },
    proceedToCheckout() {
      this.$router.push({ name: 'checkout' });
    }
  },
  async created() {
    try {
      const response = await this.$axios.get('/api/cart');
      this.cartItems = response.data;
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  }
};
</script>

<style scoped>
.cart-container {
  max-width: 800px;
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

.empty-cart {
  text-align: center;
  color: #666666;
}

.cart-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.cart-item-image {
  width: 80px;
  height: 80px;
  margin-right: 20px;
}

.cart-item-details {
  flex: 1;
}

button {
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

.cart-total {
  text-align: right;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
}
</style>
