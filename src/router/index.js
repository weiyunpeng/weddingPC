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

//组件控制
import mealList from '../components/meal/mealList.vue';

const routes = [{
    path: '/',
    component: index
},{
    path : '/meal',
    component : meal
},{
    path : '/busDeatils',
    component : busDeatils
}];

const router = new VueRouter({
    mode: 'history',
    saveScrollPosition: true,
    routes
});

export default router;

