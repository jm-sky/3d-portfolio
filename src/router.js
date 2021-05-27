import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './pages/Home.vue';
import About from './pages/About.vue';
import Portfolio from './pages/Portfolio.vue';
import Maze from './pages/Maze.vue';
import World from './pages/World.vue';
import NotFoundComponent from './pages/NotFoundComponent.vue';

const routes =[
  {
    path: '/',
    component: Home
  },
  {
    path: '/portfolio',
    component: Portfolio
  },
  {
    path: '/maze',
    component: Maze
  },
  {
    path: '/world',
    component: World
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