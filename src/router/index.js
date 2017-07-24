/*jshint esversion:6*/
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

//状态控制
import store from '../store/index';

//页面控制
import index from '../page/index';
import meal from '../page/meal.vue';
import busDeatils from '../page/busDetails.vue';
import mealDeatils from '../page/mealDetails.vue';


const routes = [{
    path: '/',
    name:'/',
    component: index
},{
    path : '/meal',
    name:'meal',
    component : meal
},{
    path : '/busDeatils',
    name:'busDeatils',
    component : busDeatils
},{
    path : '/mealDeatils',
    name:'mealDeatils',
    component : mealDeatils
}];

const router = new VueRouter({
    mode: 'history',
    saveScrollPosition: true,
    routes
});

export default router;

