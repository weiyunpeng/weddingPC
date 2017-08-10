import {GUIDE_LIST} from '../types'

const state = {
    list: [],
};

const mutations = {
    [GUIDE_LIST](state, data){
        state.list = data.list;
    }
};

export default {
    state,
    mutations
}
