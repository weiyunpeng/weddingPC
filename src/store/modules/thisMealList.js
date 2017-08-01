import {THIS_MEAL_LIST,THIS_MEAL_PAGE} from '../types'

const state = {
    list: [],
    store:{},
    currentPage:{}
};

const mutations = {
    [THIS_MEAL_LIST](state, data){
        state.list = data.list;
        state.store = data.store;
    },
    [THIS_MEAL_PAGE](state, data){
        state.currentPage = data.currentPage;
    }
};

export default {
    state,
    mutations
}
