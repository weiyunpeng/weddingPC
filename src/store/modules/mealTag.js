import {MEAL_TAG_LIST,MEAL_TAG_CLEAR,MEAL_TAG_CHANGE} from '../types'

const state = {
    list: []
};

const mutations = {
    [MEAL_TAG_LIST](state, data){
        state.list = data.list;
    },
    [MEAL_TAG_CLEAR](state, data){
        state.list = [];
    },
    [MEAL_TAG_CHANGE](state, data){
        state.list[data.number].selected = data.index;
    }
};

export default {
    state,
    mutations
}
