import {BUS_SAMPLE,BUS_SAMPLE_CLEAR} from '../types'

const state = {
    list: [],
    store: {},
    page: {},
};

const mutations = {
    [BUS_SAMPLE](state, data){
        state.list = data.list;
        state.store = data.store;
        state.page = data.page;
    },
    [BUS_SAMPLE_CLEAR](state,data){
        state.list = [];
    }
};

export default {
    state,
    mutations
}
