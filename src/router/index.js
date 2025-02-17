import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';
import UserDetail from '../components/UserDetail.vue';
import UserList from '../components/UserList.vue';
import EditProfile from '../components/EditProfile.vue';
import CodeManagement from '../views/CodeManagement.vue';

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
    path: '/users/:id',
    name: 'user-details',
    component: UserDetail
  },
  {
    path: '/users',
    name: 'user-list',
    component: UserList
  },
  {
    path: '/edit-profile/:id',
    name: 'edit-profile',
    component: EditProfile
  },
  {
    path: '/code-management',
    name: 'code-management',
    component: CodeManagement
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;