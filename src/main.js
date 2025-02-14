import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/tailwind.css';
import './assets/styles.css'; // 전역 스타일 불러오기

createApp(App)
  .use(router)
  .use(store)
  .mount('#app');