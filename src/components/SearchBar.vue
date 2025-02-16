<template>
  <div class="search-bar-container">
    <input 
      type="text" 
      v-model="searchQuery" 
      placeholder="Search for products..." 
      @input="handleSearch"
    />
    <button @click="handleSearch">Search</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.searchQuery);
    }
  }
};
</script>

<style scoped>
.search-bar-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 10px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  box-sizing: border-box;
  color: #333333;
  background-color: #f9f9f9;
}

button {
  padding: 10px 20px;
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
