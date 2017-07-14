import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

//状态控制
import store from '../store/index'

//页面控制
import index from '../page/index'
import meal from '../page/meal.vue'
import business from '../page/business.vue'

//组件控制
import mealDeatils from '../components/meal/mealDeatils.vue'

const routes = [{
    path: '/',
    component: index
},{
    path : '/meal',
    component : meal,
    children : [{
        path: '',
        name: 'mealDeatils',
        component : mealDeatils,
    }]
},{
    path : '/business',
    component : business,
    children : []
}];

const router = new VueRouter({
    mode: 'history',
    saveScrollPosition: true,
    routes
});

export default router;

