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
        const type = data.type;
        if(type == 'bus'){
            //查询商家列表首页
            return axios.post('/store/list', data, config())
        }else if(type == 'meal'){
            //查询套餐列表首页
            return axios.post('/package/index', data, config())
        }else{
            //其他情况，说明传参有误
            console.log('接口参数异常')
        }
    },
    //查询筛选条件
    qryBusTag:function(data){
        return axios.post('/store/busTag', data, config())
    },
    //商家详情
    qryBusDetails:function(data){
        return axios.post('/store/busDetails', data, config())
    }
}
