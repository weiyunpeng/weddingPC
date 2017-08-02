import {MAKEUP_DETAILS} from '../types'

const state = {
    bus_info: {},
    makeup:{},
    packages:[]
};

const mutations = {
    [MAKEUP_DETAILS](state, data){
        state.bus_info = data.data.bus_info;
        state.makeup = data.data.makeup;
        state.packages = data.data.packages;
    }
};

export default {
    state,
    mutations
}
