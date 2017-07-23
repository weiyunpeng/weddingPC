import {BUS_LIST,BUS_STATUS} from '../types'

const state = {
    list: [],
    status: 0,
};

const mutations = {
    [BUS_LIST](state, data){
        console.log(data)
        state.list = state.list.concat(data.list);
        state.status = data.status;
    },
    [BUS_STATUS](state, data){
        state.status = data.status;
    }
};

export default {
    state,
    mutations
}
