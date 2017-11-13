import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store/index'
import VueLazyload from 'vue-lazyload'
import BaiduMap from 'vue-baidu-map'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import './assets/css/common.css'
import './assets/css/animate.css'
import './assets/css/iconfont.css'

const GIF_LOADING_SRC = '/static/images/red.png';
Vue.use(VueLazyload, {
    // 设置默认显示的图片
    preLoad: 5,
    error: GIF_LOADING_SRC,
    loading: GIF_LOADING_SRC,
    attempt: 20
})

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'WD7d9EzbElOncV5U22gMpGeq5mBX6RTD'
})

Vue.use(VueAwesomeSwiper)

// 解决IE9不支持requestAnimationFrame问题
window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

Vue.prototype.objExtend = function (target, source, deep) {
  /*
   * @param {Object} target 目标对象。
   * @param {Object} source 源对象。
   * @param {boolean} deep 是否复制(继承)对象中的对象。
   * @returns {Object} 返回继承了source对象属性的新对象。
   */
  target = target || {};
  var sType = typeof source,
    i = 1,
    options;
  if (sType === 'undefined' || sType === 'boolean') {
    deep = sType === 'boolean' ? source : false;
    source = target;
    target = this;
  }
  if (typeof source !== 'object' && Object.prototype.toString.call(source) !== '[object Function]')
    source = {};
  while (i <= 2) {
    options = i === 1 ? target : source;
    if (options != null) {
      for (var name in options) {
        var src = target[name],
          copy = options[name];
        if (target === copy)
          continue;
        if (deep && copy && typeof copy === 'object' && !copy.nodeType)
          target[name] = this.extend(src || (copy.length != null ? [] : {}), copy, deep);
        else if (copy !== undefined)
          target[name] = copy;
      }
    }
    i++;
  }
  return target;
}

Vue.prototype.onscroll = function (obj,type,fn) {
  if(obj.attachEvent){
        obj.attachEvent('on'+type,function(){
            fn.call(obj);
        })
    }else{
        obj.addEventListener(type,fn,false);
    }
}

var app = new Vue({
  el: '#app',
  router,
  store,
  ...App,
});
