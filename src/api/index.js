import axios from 'axios'
const qs = require('querystring');

axios.defaults.timeout = 50000;

const ROOT = (process.env.NODE_ENV === 'production')
    ? 'dev.hunjia.qqdayu.com'
    :'http://10.97.204.99:1300';
//http://10.97.204.142:81
function config() {
    const base = {
        baseURL: ROOT
    };
    return base
}

export default {
    //查询商家列表首页
    qryBusList:function (data) {
       return axios.post('/store/list', qs.stringify(data), config())
    },
    //搜索店铺列表
    qryBusTag:function(){
       return axios.get('/store/index', config())
    },
    //商家详情
    qryBusDetails:function(data){
        return axios.post('/store/detail', qs.stringify(data), config())
    },
    //某店铺的套餐列表
    qryThisMealList:function(data){
        return axios.post('/package/storelist', qs.stringify(data), config())
    },
    //查询套餐列表首页
    qryMealList:function (data) {
        return axios.post('/package/list', qs.stringify(data), config())
    },
    //搜索套餐列表
    qryMealTag:function(data){
        return axios.get('/package/index', config())
    },
    //套餐详情
    qryMealDetails:function(data){
        return axios.post('/package/detail', qs.stringify(data), config())
    },
    //摄影师详情
    qryCamaramanDetails:function(data){
        return axios.post('/cameraman', qs.stringify(data), config())
    },
    //化妆师详情
    qryMakeupDetails:function(data){
        return axios.post('/makeup', qs.stringify(data), config())
    },
}
