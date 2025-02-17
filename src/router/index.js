import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';
import UserDetail from '../components/UserDetail.vue';
import UserList from '../components/UserList.vue';
import EditProfile from '../components/EditProfile.vue';
import CodeManagement from '../views/CodeManagement.vue';
import ShoppingService from '@/views/ShoppingService.vue';
import PaymentTest from '@/components/PaymentTest.vue';
import ProductList from '../components/ProductList.vue';
import Cart from '../components/Cart.vue';
import ProductDetail from '../components/ProductDetail.vue';

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
  },
  {
    path: '/shopping-service',
    name: 'shopping-service',
    component: ShoppingService
  },
  {
    path: '/payment-test',
    name: 'payment-test',
    component: PaymentTest
  },
  {
    path: '/products',
    name: 'product-list',
    component: ProductList
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/products/:id',
    name: 'product-detail',
    component: ProductDetail,
    props: route => ({ productId: Number(route.params.id) })
  },
  {
    path: '/pet-management',
    name: 'pet-management',
    component: () => import('@/components/PetManagement.vue'),
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;