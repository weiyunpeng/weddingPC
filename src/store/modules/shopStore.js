import {SHOPSTORE_LIST,SHOPSTORE_INFO,SHOPSTORE_DETAILS,SHOPSTORE_LIST_CLEAR,SHOPSTORE_LIST_CHANGE} from '../types'

const state = {
    list:[],
    page: {},
    shopInfo: {},
    shopDetails:[]
};

const mutations = {
    [SHOPSTORE_LIST](state, data){
        state.list = data.list;
        state.page = data.page;
    },
    [SHOPSTORE_INFO](state, data){
        state.shopInfo = data;
    },
    [SHOPSTORE_DETAILS](state, data){
        state.shopDetails = data;
    },
    [SHOPSTORE_LIST_CLEAR](state,data){
        state.list = [];
        state.page = 1;
    },
    [SHOPSTORE_LIST_CHANGE](state,data){
        let obj = state.list[data.index]
        obj.showAll = !obj.showAll
        state.list[data.index].showAll = data.showAll
        state.list.splice(data.index, 1, obj)
    }
};

export default {
    state,
    mutations
}
