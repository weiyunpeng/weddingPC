import { PHOTO_LIST,VIEW_PHOTO_MODAL,HIDE_PHOTO_MODAL,PHOTO_STATUS,PHOTO_CLEAR,PHOTO_LIKE_USER,CANCEL_PHOTO_LIKE_USER} from '../types'

const state = {
    list: [],
    photoInfo:{},
    photoList: [],
    photoListFill: [],
    status: 0,
    photoModelStatus:0,
    stumb:[]
};

const mutations = {
    [VIEW_PHOTO_MODAL](state, data) {
        state.photoModelStatus = 0;
        state.list = data.data.list;
        state.photoInfo = data.data;
        data.data.list.forEach(element => {
            let st = {}
            st['width'] = element.width
            st['height'] = element.height
            st['thumb'] = element.thumb
            state.stumb.push(st)
        });
    },
    [HIDE_PHOTO_MODAL](state, data) {
        state.list = [];
        state.photoInfo = null;
        state.photoModelStatus = -1;
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
        if(state.photoList[data.order]){
            //看婚纱瀑布流
            const obj = state.photoList[data.order]
            obj.is_fav = !obj.is_fav
            state.photoList[data.order].is_fav = obj.is_fav
            state.photoList[data.order].fav_num++
            state.photoList.splice(data.order, 1, obj)
        }

        if(state.list[data.index]){
            //底层页瀑布流
            const objModal = state.list[data.index]
            objModal.is_fav = !objModal.is_fav
            state.list[data.index].is_fav = objModal.is_fav
            state.list[data.index].fav_num++
            state.list.splice(data.index, 1, objModal)
        }
    },
    [CANCEL_PHOTO_LIKE_USER](state, data){
        if(state.photoList[data.order]){
            const obj = state.photoList[data.order]
            obj.is_fav = !obj.is_fav
            state.photoList[data.order].is_fav = obj.is_fav
            state.photoList[data.order].fav_num--
            state.photoList.splice(data.order, 1, obj)
        }

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
