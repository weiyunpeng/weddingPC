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
import mealList from '../page/mealList.vue';
import cameraman from '../page/cameraman.vue';
import makeupman from '../page/makeupman.vue';
import busSample from '../page/busSample.vue';


const routes = [{
    path: '/',
    name:'首页',
    one:true,
    redirect: '/index',
    component: index,
    children: [
        { path: '/index', component: index, name: '主页' }
    ]
},{
    path : '/meal',
    name:'套餐列表首页',
    component : meal
},{
    path : '/busDeatils',
    name:'商家详情页',
    component : busDeatils
},{
    path : '/mealDeatils',
    name:'套餐详情页',
    component : mealDeatils
},{
    path : '/mealList',
    name:'商家的套餐列表',
    component : mealList
},{
    path : '/busSample',
    name:'商家的官方案例',
    component : busSample
},{
    path : '/cameraman',
    name:'摄影师',
    component : cameraman
},{
    path : '/makeupman',
    name:'化妆师',
    component : makeupman
}];

const router = new VueRouter({
    mode: 'history',
    saveScrollPosition: true,
    routes
});

export default router;

