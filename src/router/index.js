import { createRouter, createWebHashHistory } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import Net from '@/views/Net.vue';
import Bluetooth from '@/views/Bluetooth.vue';
import Login from '@/views/Login.vue';
import notFound from '@/views/Error.vue';
import BasicLayout from '@/layouts/BasicLayout.vue';
const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: notFound,  // 引入 组件
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Dashboard',
    component: BasicLayout,
    beforeEnter: (to, from) => {
      if (!localStorage.getItem('token')) {
        return { path: '/login' }
      }
    },
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: '/net',
        name: 'Net',
        component: Net
      },
      {
        path: '/bluetooth',
        name: 'Bluetooth',
        component: Bluetooth
      }]
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
