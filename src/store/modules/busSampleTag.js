import {BUS_SAMPLE_TAG,BUS_SAMPLE_TAG_CLEAR,BUS_SAMPLE_TAG_CHANGE} from '../types'

const state = {
    list: []
};

const mutations = {
    [BUS_SAMPLE_TAG](state, data){
        state.list = data.list;
    },
    [BUS_SAMPLE_TAG_CLEAR](state, data){
        state.list = [];
    },
    [BUS_SAMPLE_TAG_CHANGE](state, data){
        state.list[data.number].selected = data.index;
    }
};

export default {
    state,
    mutations
}
