import {COMMENT_LIST} from '../types'

const state = {
    list: [],
    page: {},
};

const mutations = {
    [COMMENT_LIST](state, data){
        state.list = data.list;
        state.page = data.page;
},
};

export default {
    state,
    mutations
}
