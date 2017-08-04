import {THIS_MEAL_TAG,THIS_MEAL_TAG_CLEAR,THIS_MEAL_TAG_CHANGE} from '../types'

const state = {
    list: []
};

const mutations = {
    [THIS_MEAL_TAG](state, data){
        state.list = data.list;
    },
    [THIS_MEAL_TAG_CLEAR](state, data){
        state.list = [];
    },
    [THIS_MEAL_TAG_CHANGE](state, data){
        state.list[data.number].selected = data.index;
    }
};

export default {
    state,
    mutations
}
