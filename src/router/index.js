import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PetDetailView from '../views/PetDetailView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/pet/:id',
      name: 'PetDetail',
      component: PetDetailView,
    },
    {
      path: '/about',
      name: 'About',
      component: AboutView,
    },
  ],
})

export default router
