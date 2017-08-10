import { COLLECT_LIST} from '../types'

const state = {
    user: null,
    list:[]
};

const mutations = {
    [COLLECT_LIST](state, data) {
        state.user = data.data.user;
        state.list = data.data.list;
    }
};

export default {
    state,
    mutations
}
