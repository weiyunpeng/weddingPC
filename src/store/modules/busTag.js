import {BUS_TAG_LIST,BUS_TAG_CLEAR,BUS_TAG_CHANGE} from '../types'

const state = {
    list: []
};

const mutations = {
    [BUS_TAG_LIST](state, data){
        state.list = data.list;
    },
    [BUS_TAG_CLEAR](state, data){
        state.list = [];
    },
    [BUS_TAG_CHANGE](state, data){
        state.list[data.number].isTag = data.index;
    }
};

export default {
    state,
    mutations
}
