import {USER_LOGOUT,AUTH_INFO,AUTH_INFO_CLEAR} from '../types'

const state = {
    token: null,
};

const mutations = {
    [AUTH_INFO](state, data) {
        localStorage.setItem('user',JSON.stringify(data.token));
        state.token = data.token;
    },
    [AUTH_INFO_CLEAR](state) {
        localStorage.removeItem('user');
        state.token = null;
    },
    [USER_LOGOUT](state) {
        localStorage.removeItem('user');
        state.token = null;
    }
};

export default {
    state,
    mutations
}
