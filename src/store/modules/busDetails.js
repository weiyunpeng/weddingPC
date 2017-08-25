import {BUS_INFO,BUS_DETAILS_LIST,BUS_DETAILS_IMG} from '../types'

const state = {
    busInfo: {},
    list:[]
};

const mutations = {
    [BUS_INFO](state, data){
        state.busInfo = data.data;
    },
    [BUS_DETAILS_LIST](state, data){
        state.list = data.list;
    }
};

export default {
    state,
    mutations
}
