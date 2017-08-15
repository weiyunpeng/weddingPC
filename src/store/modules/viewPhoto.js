import { PHOTO_LIST,VIEW_PHOTO_MODAL,PHOTO_STATUS,PHOTO_CLEAR} from '../types'

const state = {
    list: [],
    photoInfo:null,
    photoList: [],
    status: 0
};

const mutations = {
    [VIEW_PHOTO_MODAL](state, data) {
        state.list = data.data.list;
        state.photoInfo = data.data;
    },
    [PHOTO_LIST](state, data) {
        state.photoList = state.photoList.concat(data.list);
        state.status = data.status;
    },
    [PHOTO_STATUS](state, data){
        state.status = data.status;
    },
    [PHOTO_CLEAR](state){
        state.photoList = [];
        state.status = 0;
    }
};

export default {
    state,
    mutations
}
