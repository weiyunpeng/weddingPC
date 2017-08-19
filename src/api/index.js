import axios from 'axios'
import store from './../store/index'
const qs = require('querystring');

axios.defaults.timeout = 50000;
// http request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
    // 通过状态码来识别服务器提示信息
    switch (response.status) {
        case 200:
            break;
    }
    let code=response.data.code
    if(code==-99){
        //说明登录失效
        localStorage.removeItem('user');
        window.location.href = '/'
        return false
    }
    if(code==-1){
        //说明服务端错误
        const data = {
            content: response.data.msg,
            type: 'info'
        };
        store.dispatch('showMsg',data);
        return false
    }
    return response;
}, function (error) {
    // 非状态码错误  在此通过正则处理
    console.log('捕获到一个错误，错误信息：' + error)
    if (/Network Error/i.test(error)) {
        alert('您当前无法上网，请检查你的移动数据开关或wifi是否正常')
    }
    if (/ms exceeded/i.test(error)) {
        alert('您的网络连接不稳定，请检查你的移动数据开关或wifi是否正常')
        $(".weui_loading_toast").hide()
    }
    if (/code 500/i.test(error)) {
        alert('网络异常，请稍后重试')
    }
    return Promise.reject(error);
});

const ROOT = (process.env.NODE_ENV === 'production')
    ? ''
    :'http://localhost:1300';
//http://10.97.204.142:81
function config() {
    const base = {
        baseURL: ROOT
    };
    return base
}

export default {
    //查询商家首页列表
    qryStoreList:function (data) {
       return axios.post('/store/comments', qs.stringify(data), config())
    },
    //商家首页分类
    qryStoreTag:function(data){
       return axios.post('/store/index', qs.stringify(data), config())
    },
    //商家详情
    qryStoreDetails:function(data){
        return axios.post('/store/detail', qs.stringify(data), config())
    },
    //查询商家的官方案例
    qryBusSample:function(data){
        return axios.post('/store/sample', qs.stringify(data), config())
    },
    //商家官方案例的分类
    qryBusSampleTag:function(data){
        return axios.post('/store/sample_tag', qs.stringify(data), config())
    },
    

    //查询套餐首页列表
    qryMealList:function (data) {
        return axios.post('/package/list', qs.stringify(data), config())
    },
    //套餐首页分类
    qryMealTag:function(data){
        return axios.get('/package/index', config())
    },
    //套餐详情
    qryMealDetails:function(data){
        return axios.post('/package/detail', qs.stringify(data), config())
    },
    //查询商家的套餐列表
    qryThisMealList:function(data){
        return axios.post('/package/storelist', qs.stringify(data), config())
    },
    //查询商家的套餐列表的分类
    qryThisMealTag:function(data){
        return axios.post('/package/search_tag', qs.stringify(data), config())
    },


    //摄影师详情
    qryCamaramanDetails:function(data){
        return axios.post('/cameraman', qs.stringify(data), config())
    },
    //化妆师详情
    qryMakeupDetails:function(data){
        return axios.post('/makeup', qs.stringify(data), config())
    },

    //首页未登录状态
    qryIndex:function(){
        return axios.get('/site/index', config())
    },
    //查看图组详情
    qryViewPhoto:function(data){
        return axios.post('/site/view_photo',qs.stringify(data), config())
    },
    //首页已登录状态
    qryLoginIndex:function(data){
        return axios.post('/site/index_login',qs.stringify(data), config())
    },

    //首页图片瀑布流
    qryPhotoFlow:function(data){
        return axios.post('/site/photo_flow',qs.stringify(data), config())
    },

    //攻略
    qryGuideList:function(){
        return axios.get('/guide/index', config())
    },

    //收藏图片
    collectPhoto:function(data){
        return axios.post('/user/collect',qs.stringify(data), config())
    },
    //取消收藏
    cancelCollectPhoto:function(data){
        return axios.post('/user/cancel',qs.stringify(data), config())
    },

    //获取用户信息
    getUserInfo:function(){
        return axios.get('/user/get', config())
    },
    //退出登录
    loginOut:function(){
        return axios.get('/user/logout', config())
    },
     //我的收藏
    qryMyCollectList:function(data){
        return axios.post('/user/collect_list',qs.stringify(data), config())
    },
}
