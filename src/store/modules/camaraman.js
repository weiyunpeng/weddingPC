import {CAMARAMAN_DETAILS} from '../types'

const state = {
    bus_info: {},
    camaraman:{},
    packages:[]
};

const mutations = {
    [CAMARAMAN_DETAILS](state, data){
        state.bus_info = data.data.bus_info;
        state.camaraman = data.data.camaraman;
        state.packages = data.data.packages;
    }
};

export default {
    state,
    mutations
}
