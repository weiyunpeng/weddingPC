import axios from 'axios'
const qs = require('querystring');

axios.defaults.timeout = 50000;

const ROOT = (process.env.NODE_ENV === 'production')
    ? 'http://dev.hunjia.qqdayu.com'
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
    qryBusList:function (data) {
       return axios.post('/store/comments', qs.stringify(data), config())
    },
    //商家首页分类
    qryBusTag:function(data){
       return axios.post('/store/index', qs.stringify(data), config())
    },
    //商家详情
    qryBusDetails:function(data){
        return axios.post('/store/detail', qs.stringify(data), config())
    },
    //查询商家的官方案例
    qryBusSample:function(data){
        return axios.post('/store/sample', qs.stringify(data), config())
    },
    //商家官方案例的分类
    qryBusSampleTag:function(data){
        return axios.post('/store/sampletag', qs.stringify(data), config())
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
        return axios.post('/package/storetag', qs.stringify(data), config())
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
