import { PHOTO_LIST,PHOTO_CLEAR,PHOTO_LIKE_USER } from '../types'

const state = {
    list: [],
};

const mutations = {
    [PHOTO_LIST](state, data) {
        state.list = state.list.concat(data.list);
    },
    [PHOTO_CLEAR](state){
        state.list = [];
    },
    [PHOTO_LIKE_USER](state,data){
        state.list[data.index].likeCount = data.likeCount;
    }
};

export default {
    state,
    mutations
}
