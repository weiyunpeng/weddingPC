import axios from 'axios'
const qs = require('querystring');

const ROOT = (process.env.NODE_ENV === 'production')
    ? 'http://localhost:3000'
    :'http://localhost:3000';

function config() {
    const base = {
        baseURL: ROOT
    };
    return base
}

export default {
    businessList:function () {
        return axios.get('', config())
    },
}
