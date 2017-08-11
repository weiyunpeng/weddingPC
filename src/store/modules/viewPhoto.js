import { VIEW_PHOTO,VIEW_PHOTO_INDEX} from '../types'

const state = {
    list: [],
    photoInfo:null,
    photo: [],
};

const mutations = {
    [VIEW_PHOTO](state, data) {
        state.list = data.data.list;
        state.photoInfo = data.data;
    },
    [VIEW_PHOTO_INDEX](state, data) {
        state.photo = data.list;
    }
};

export default {
    state,
    mutations
}
