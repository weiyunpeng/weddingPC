import { INDEX_LIST,PHOTO_CLEAR } from '../types'

const state = {
    list: [],
};

const mutations = {
    [INDEX_LIST](state, data) {
        state.list = data.list;
    },
    [PHOTO_CLEAR](state){
        state.list = [];
    }
};

export default {
    state,
    mutations
}
