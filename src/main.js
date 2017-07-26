import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store/index'
import VueLazyload from 'vue-lazyload'
import BaiduMap from 'vue-baidu-map'

import './assets/css/common.css'
import './assets/css/iconfont.css'

Vue.use(VueLazyload, {
　　// 设置默认显示的图片
　　loading: require('./../static/images/logo.png')
})

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'WD7d9EzbElOncV5U22gMpGeq5mBX6RTD'
})

var app = new Vue({
    el: '#app',
    router,
    store,
    ...App,
});
