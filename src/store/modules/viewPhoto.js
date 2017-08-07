import { VIEW_PHOTO} from '../types'

const state = {
    list: [],
};

const mutations = {
    [VIEW_PHOTO](state, data) {
        state.list = data.list;
    }
};

export default {
    state,
    mutations
}
