/*jshint esversion:6*/
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const isMobile = /(iphone|android|mobile|micromessenger)/i.test(navigator.userAgent.toLowerCase())
const isWeixin = /micromessenger/.test(navigator.userAgent.toLowerCase())

let curVisitUrl = window.location.href
let pcOrigin = /m.dev.hunjia.qqdayu.com/.test(curVisitUrl) ? 'http://dev.hunjia.qqdayu.com' : 'http://xnb.qqdayu.com'
let moOrigin = /dev.hunjia.qqdayu.com/.test(curVisitUrl) ? 'http://m.dev.hunjia.qqdayu.com' : 'http://m.xnb.qqdayu.com'

let curVisitUrlPath = window.location.pathname

// PC端和移动端链接对应
let matchUrl = {
	'/': '/', 				// 首页
	'/index': '/', 				// 首页
	'/user': '/vp',		// 看照片
	'/comment': '/search',		// 找商家
	'/packageDetails': '/detail', // 套餐详情
	'/storeList': '/detail', // 套餐列表
	'/storeDetails': '/detail', // 商家详情页
	'/busSample': '/detail', // 案例列表
	'/makeupman': '/detail', // 化妆师详情页
	'/cameraman': '/detail', // 摄影师详情页
	'/meal': '/search', // 套餐搜索列表页
	'/guide': '/guide',		// 攻略
	'/collect': '/uc'			// 个人中心
}

if(curVisitUrl.indexOf('?busId=') > -1){
    let pathArr = curVisitUrl.split('?busId=')
    let idArr = pathArr[pathArr.length - 1]
    let storeId = idArr.split("&",1)
    curVisitUrlPath = '/detail/' + storeId
}else{
    curVisitUrlPath = matchUrl[curVisitUrlPath]
}


//状态控制
import store from '../store/index';

//页面控制
import index from '../page/index';
import meal from '../page/meal.vue';
import storeDetails from '../page/storeDetails.vue';
import packageDetails from '../page/packageDetails.vue';
import storeList from '../page/storeList.vue';
import cameraman from '../page/cameraman.vue';
import makeupman from '../page/makeupman.vue';
import busSample from '../page/busSample.vue';
import user from '../page/user.vue';
import guide from '../page/guide.vue';
import comment from '../page/comment.vue';
import collect from '../page/collect.vue';
import bottompage from '../page/bottompage.vue';


const routes = [{
    path: '/',
    component: index,
    redirect: {path: '/index', component: index, name: 'index'},
    children: [
        { path: '/index', component: index, name: 'index'}
    ]
},{
    path: '/user',
    name:'user',
    component: user
},{
    path : '/meal',
    name:'meal',
    component : meal
},{
    path : '/storeDetails/:busId',
    name:'storeDetails',
    component : storeDetails
},{
    path : '/packageDetails/:busId/:mealId',
    name:'packageDetails',
    component : packageDetails
},{
    path : '/storeList/:storeId',
    name:'storeList',
    component : storeList
},{
    path : '/busSample/:busId/:sampleId',
    name:'busSample',
    component : busSample
},{
    path : '/cameraman/:busId/:cameramanId',
    name:'cameraman',
    component : cameraman
},{
    path : '/makeupman/:busId/:makeupId',
    name:'makeupman',
    component : makeupman
},{
    path : '/guide',
    name:'guide',
    component : guide
},{
    path : '/comment/:cid',
    name:'comment',
    component : comment
},{
    path : '/collect/:type',
    name:'collect',
    component : collect
},
{
    path : '/bottompage/:id/:type',
    name:'bottompage',
    component : bottompage,
},
{
    path: '*',
    name: 'page404',
    component: resolve => require(['./../page/index.vue'], resolve)
}];

const router = new VueRouter({
    mode: 'history',
    saveScrollPosition: true,
    routes
});

router.beforeEach(({meta, path}, from, next) => {
    if (isMobile) { 
        //说明是移动端
        window.location.href = moOrigin + curVisitUrlPath
        return false
    }
    var { auth = true } = meta;
    next()
});

export default router;

