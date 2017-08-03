import {MEAL_LIST,MEAL_CLEAR} from '../types'

const state = {
    list: [],
    page: {},
};

const mutations = {
    [MEAL_LIST](state, data){
        state.list = data.list;
        state.page = data.page;
    },
    [MEAL_CLEAR](state,data){
        state.list = [];
    }
};

export default {
    state,
    mutations
}
