import api from '../api/index'
import * as types from './types'


//----------------------------------------------------------------------------------------------
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
//----------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------
export const qryBusList = ({ commit },data) => {
    commit(types.BUS_STATUS, {status: 0});
    api.qryBusList(data).then(function (response) {
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
//----------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------
export const qryMealList = ({ commit },data) => {
    commit(types.MEAL_STATUS, {status: 0});
    api.qryBusList(data).then(function (response) {
        const status = response.data.list.length == 20?0:2;
        commit(types.MEAL_LIST, {
            list: response.data.list,
            status: status
        })
    })
        .catch(function (error) {
            commit(types.MEAL_LIST);
            console.log(error)
        });
};
export const mealClear = ({ commit }) => {
    commit(types.MEAL_CLEAR)
};
//----------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------
export const qrybusTag = ({ commit },data) => {
    api.qryBusTag(data).then(function (response) {
        commit(types.BUS_TAG_LIST, {
            list: response.data.list
        })
    })
        .catch(function (error) {
            commit(types.BUS_TAG_LIST);
            console.log(error)
        });
};

export const busTagClear = ({ commit }) => {
    commit(types.BUS_TAG_CLEAR)
};

export const busTagChange = ({ commit },data) => {
    commit(types.BUS_TAG_CHANGE,data)
};
//----------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------
export const qryMealTag = ({ commit },data) => {
    api.qryBusTag(data).then(function (response) {
        commit(types.MEAL_TAG_LIST, {
            list: response.data.list
        })
    })
        .catch(function (error) {
            commit(types.MEAL_TAG_LIST);
            console.log(error)
        });
};

export const mealTagClear = ({ commit }) => {
    commit(types.MEAL_TAG_CLEAR)
};

export const mealTagChange = ({ commit },data) => {
    commit(types.MEAL_TAG_CHANGE,data)
};
//----------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------
export const qryBusDetails = ({ commit },data) => {
    api.qryBusDetails(data).then(function (response) {
        commit(types.BUS_INFO, {
            data: response.data.bus_info
        })
        commit(types.BUS_DETAILS_LIST, {
            list: response.data.list
        })
    })
        .catch(function (error) {
            console.log(error)
        });
};
//----------------------------------------------------------------------------------------------