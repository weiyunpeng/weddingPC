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
    qryBusList:function (data) {
        return axios.post('/index/qryBusList', data, config())
    },
}
