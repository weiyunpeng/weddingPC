import {CAMARAMAN_DETAILS} from '../types'

const state = {
    bus_info: {},
    cameraman:{},
    packages:[]
};

const mutations = {
    [CAMARAMAN_DETAILS](state, data){
        state.bus_info = data.data.bus_info;
        state.cameraman = data.data.cameraman;
        state.packages = data.data.packages;
    }
};

export default {
    state,
    mutations
}
