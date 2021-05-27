import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './pages/Home.vue';
import Maze from './pages/Maze.vue';
import NotFoundComponent from './pages/NotFoundComponent.vue';

const routes =[
  {
    path: '/',
    component: Home
  },
  {
    path: '/portfolio',
    component: () => import('./pages/Portfolio.vue')
  },
  {
    path: '/maze',
    component: Maze
  },
  {
    path: '/world',
    component: () => import('./pages/World.vue')
  },
  {
    path: '/:pathMatch(.*)', 
    component: NotFoundComponent 
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})

export default router;