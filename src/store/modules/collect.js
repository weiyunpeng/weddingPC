import { COLLECT_LIST,COLLECT_LIST_CHANGE} from '../types'

const state = {
    user: null,
    list:[]
};

const mutations = {
    [COLLECT_LIST](state, data) {
        state.user = data.data.user;
        state.list = data.data.list;
    },
    [COLLECT_LIST_CHANGE](state,data){
        const obj = state.list[data]
        obj.showall = !obj.showall
        state.list[data].showall = obj.showall
        state.list.splice(data, 1, obj)
    }
};

export default {
    state,
    mutations
}
