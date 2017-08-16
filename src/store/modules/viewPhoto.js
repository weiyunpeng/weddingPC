import { PHOTO_LIST,VIEW_PHOTO_MODAL,PHOTO_STATUS,PHOTO_CLEAR,PHOTO_LIKE_USER,CANCEL_PHOTO_LIKE_USER} from '../types'

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
    },
    [PHOTO_LIKE_USER](state, data){
        const obj = state.photoList[data.order]
        obj.is_fav = !obj.is_fav
        state.photoList[data.order].is_fav = obj.is_fav
        state.photoList[data.order].fav_num++
        state.photoList.splice(data.order, 1, obj)

        if(state.list[data.index]){
            const objModal = state.list[data.index]
            objModal.is_fav = !objModal.is_fav
            state.list[data.index].is_fav = objModal.is_fav
            state.list[data.index].fav_num++
            state.list.splice(data.index, 1, objModal)
        }
    },
    [CANCEL_PHOTO_LIKE_USER](state, data){
        const obj = state.photoList[data.order]
        obj.is_fav = !obj.is_fav
        state.photoList[data.order].is_fav = obj.is_fav
        state.photoList[data.order].fav_num--
        state.photoList.splice(data.order, 1, obj)

        if(state.list[data.index]){
            const objModal = state.list[data.index]
            objModal.is_fav = !objModal.is_fav
            state.list[data.index].is_fav = objModal.is_fav
            state.list[data.index].fav_num--
            state.list.splice(data.index, 1, objModal)
        }
    }
};

export default {
    state,
    mutations
}
