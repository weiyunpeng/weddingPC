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
