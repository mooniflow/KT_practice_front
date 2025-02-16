<template>
  <div class="checkout-container">
    <h2>Checkout</h2>
    <form @submit.prevent="handleCheckout">
      <div class="form-group">
        <label for="cardNumber">Card Number:</label>
        <input type="text" id="cardNumber" v-model="paymentInfo.cardNumber" required />
      </div>
      <div class="form-group">
        <label for="expiryDate">Expiry Date:</label>
        <input type="text" id="expiryDate" v-model="paymentInfo.expiryDate" required />
      </div>
      <div class="form-group">
        <label for="cvv">CVV:</label>
        <input type="text" id="cvv" v-model="paymentInfo.cvv" required />
      </div>
      <button type="submit">Pay Now</button>
      <p v-if="message" class="message">{{ message }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paymentInfo: {
        cardNumber: '',
        expiryDate: '',
        cvv: ''
      },
      message: ''
    };
  },
  methods: {
    async handleCheckout() {
      try {
        // API 호출
        const response = await this.$axios.post('/api/orders', this.paymentInfo);
        this.message = 'Payment successful!';
        this.$router.push({ name: 'order-history' });
      } catch (error) {
        console.error('Payment error:', error);
        this.message = 'Error processing payment. Please try again.';
      }
    }
  }
};
</script>

<style scoped>
.checkout-container {
  max-width: 500px;
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

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #666666;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  box-sizing: border-box;
  color: #333333;
  background-color: #f9f9f9;
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

.message {
  color: green;
  text-align: center;
  margin-top: 10px;
}
</style>
