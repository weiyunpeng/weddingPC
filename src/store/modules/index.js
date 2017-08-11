import { INDEX_LIST,PHOTO_CLEAR } from '../types'

const state = {
    banner:'',
    logo:'',
    nav:[],
    guide:[],
    list: [],
    store: [],
};

const mutations = {
    [INDEX_LIST](state, data) {
        state.nav = data.list.nav;
        state.guide = data.list.guide;
        state.store = data.list.store;
        state.list = data.list.photo;
        state.banner = data.list.banner;
        state.logo = data.list.logo;
    },
    [PHOTO_CLEAR](state){
        state.list = [];
    }
};

export default {
    state,
    mutations
}
