import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/survey-taker/:id',
    name: 'SurveyTaker',
    component: () => import('../views/SurveyTaker.vue'),
  },
  {
    path: '/survey-viewer',
    name: 'SurveyViewer',
    component: () => import('../views/SurveyViewer.vue'),
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

export default router;
