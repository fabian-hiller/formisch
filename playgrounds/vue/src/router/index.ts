import LoginView from '@/views/LoginView.vue';
import NestedView from '@/views/NestedView.vue';
import PaymentView from '@/views/PaymentView.vue';
import SpecialView from '@/views/SpecialView.vue';
import TodosView from '@/views/TodosView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/payment',
      name: 'payment',
      component: PaymentView,
    },
    {
      path: '/todos',
      name: 'todos',
      component: TodosView,
    },
    {
      path: '/special',
      name: 'special',
      component: SpecialView,
    },
    {
      path: '/nested',
      name: 'nested',
      component: NestedView,
    },
  ],
});

export default router;
