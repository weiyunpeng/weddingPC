import api from '../api/index'
import * as types from './types'

export const showMsg = ({ commit }, data) => {
    const id = new Date().getTime();
    data.id = id;
    commit(types.SHOW_MSG, data);
    setTimeout(() => commit(types.HIDE_MSG, id), 5000)
};

export const hideMsg = ({ commit }, id) => {
    commit(types.HIDE_MSG, id)
};

export const showModal = ({ commit }, data) => {
    commit(types.SHOW_MODAL, data);
};

export const hideModal = ({ commit }, data) => {
    commit(types.HIDE_MODAL, data);
};

export const qryBusList = ({ commit },data) => {
    commit(types.BUS_STATUS, {status: 0});
    api.qryBusList(data).then(function (response) {
        console.log(response)
        const status = response.data.list.length == 20?0:2;
        commit(types.BUS_LIST, {
            list: response.data.list,
            status: status
        })
    })
        .catch(function (error) {
            commit(types.BUS_LIST);
            console.log(error)
        });
};

export const busClear = ({ commit }) => {
    commit(types.BUS_CLEAR)
};