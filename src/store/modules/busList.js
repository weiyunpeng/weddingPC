import {BUS_LIST,BUS_CLEAR} from '../types'

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
    }
};

export default {
    state,
    mutations
}
