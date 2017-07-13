import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import store from '../store/index'

import index from '../page/index'

const routes = [{
    path: '/',
    component: index
}];

const router = new VueRouter({
    mode: 'history',
    saveScrollPosition: true,
    routes
});

export default router;

