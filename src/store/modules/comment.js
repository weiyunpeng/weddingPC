import {COMMENT_LIST} from '../types'

const state = {
    list: [],
};

const mutations = {
    [COMMENT_LIST](state, data){
        state.list = data.data.list;
    }
};

export default {
    state,
    mutations
}
