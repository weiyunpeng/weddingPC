import {BUS_LIST,BUS_STATUS,BUS_CLEAR} from '../types'

const state = {
    list: [],
    status: 1,
};

const mutations = {
    [BUS_LIST](state, data){
        state.list = state.list.concat(data.list);
        state.status = data.status;
    },
    [BUS_STATUS](state, data){
        state.status = data.status;
    },
    [BUS_CLEAR](state,data){
        state.list = [];
        state.status = 1;
    }
};

export default {
    state,
    mutations
}
