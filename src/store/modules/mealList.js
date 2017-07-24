import {MEAL_LIST,MEAL_STATUS,MEAL_CLEAR} from '../types'

const state = {
    list: [],
    status: 1,
};

const mutations = {
    [MEAL_LIST](state, data){
        state.list = data.list;
        state.status = data.status;
    },
    [MEAL_STATUS](state, data){
        state.status = data.status;
    },
    [MEAL_CLEAR](state,data){
        state.list = [];
        state.status = 1;
    }
};

export default {
    state,
    mutations
}
