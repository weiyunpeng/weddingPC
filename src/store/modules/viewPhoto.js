import { VIEW_PHOTO,VIEW_PHOTO_INDEX} from '../types'

const state = {
    list: [],
    photo: [],
};

const mutations = {
    [VIEW_PHOTO](state, data) {
        state.list = data.list;
    },
    [VIEW_PHOTO_INDEX](state, data) {
        state.photo = data.list;
    }
};

export default {
    state,
    mutations
}
