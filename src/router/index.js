import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';
import UserDetail from '../components/UserDetail.vue';
import UserList from '../components/UserList.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/user-details/:id',
    name: 'user-details',
    component: UserDetail
  },
  {
    path: '/users',
    name: 'user-list',
    component: UserList
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;