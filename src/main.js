import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store/index'
import VueLazyload from 'vue-lazyload'

import './assets/css/common.css'
import './assets/css/iconfont.css'

Vue.use(VueLazyload, {
　　// 设置默认显示的图片
　　loading: require('./../static/images/logo.png')
})

var app = new Vue({
    el: '#app',
    router,
    store,
    ...App,
});
