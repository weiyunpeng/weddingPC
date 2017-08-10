import {BUS_LIST,BUS_CLEAR,BUS_CHANGE} from '../types'

const state = {
    list: [],
    page: {},
};

const mutations = {
    [BUS_LIST](state, data){
        state.list = data.list;
        state.page = data.page;
    },
    [BUS_CLEAR](state,data){
        state.list = [];
    },
    [BUS_CHANGE](state,data){
        console.log(data)
        state.list[data.index].showAll = data.showAll
    }
};

export default {
    state,
    mutations
}
