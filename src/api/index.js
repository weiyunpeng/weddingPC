import axios from 'axios'
const qs = require('querystring');

axios.defaults.timeout = 50000;

const ROOT = (process.env.NODE_ENV === 'production')
    ? 'http://localhost:1300'
    :'http://localhost:1300';

function config() {
    const base = {
        baseURL: ROOT
    };
    return base
}

export default {
    //查询商家列表
    qryBusList:function (data) {
        return axios.post('/index/qryBusList', data, config())
    },
    //查询筛选条件
    qryBusTag:function(data){
        return axios.post('/index/busTag', data, config())
    },
    //商家详情
    qryBusDetails:function(data){
        return axios.post('/index/busDetails', data, config())
    }
}
