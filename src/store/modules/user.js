import { USER_INFO,USER_INFO_CLEAR} from '../types'

const state = {
    data: [],
};

const mutations = {
    [USER_INFO](state, data) {
        state.data = data.data;
    }
};

export default {
    state,
    mutations
}
