import {MEAL_INFO,MEAL_DETAILS} from '../types'

const state = {
    info: {},
    detail:[]
};

const mutations = {
    [MEAL_INFO](state, data){
        state.info = data.info;
    },
    [MEAL_DETAILS](state, data){
        state.detail = data.detail;
    }
};

export default {
    state,
    mutations
}
