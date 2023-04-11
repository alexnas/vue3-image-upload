import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active-link',
  linkExactActiveClass: 'exact-active-link',

  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import('../views/UploadView.vue'),
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('../views/GalleryView.vue'),
    },
  ],
});

export default router;
