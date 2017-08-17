import {SHOPSTORE_LIST_TAG,SHOPSTORE_LIST_TAG_CLEAR,SHOPSTORE_LIST_TAG_CHANGE} from '../types'

const state = {
    list: []
};

const mutations = {
    [SHOPSTORE_LIST_TAG](state, data){
        state.list = data.list;
    },
    [SHOPSTORE_LIST_TAG_CLEAR](state, data){
        state.list = [];
    },
    [SHOPSTORE_LIST_TAG_CHANGE](state, data){
        state.list[data.number].selected = data.index;
    }
};

export default {
    state,
    mutations
}
