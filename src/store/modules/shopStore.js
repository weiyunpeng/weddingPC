import {SHOPSTORE_INFO,SHOPSTORE_DETAILS} from '../types'

const state = {
    shopInfo: {},
    shopDetails:[]
};

const mutations = {
    [SHOPSTORE_INFO](state, data){
        state.shopInfo = data;
    },
    [SHOPSTORE_DETAILS](state, data){
        state.shopDetails = data;
    }
};

export default {
    state,
    mutations
}
