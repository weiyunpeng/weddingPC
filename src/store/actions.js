import api from '../api/index'
import * as types from './types'


//----------------------------------------------------------------------------------------------
export const showMsg = ({ commit }, data) => {
    const id = new Date().getTime();
    data.id = id;
    commit(types.SHOW_MSG, data);
    setTimeout(() => commit(types.HIDE_MSG, id), 1000)
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

//----------------------------------------获取用户信息------------------------------------------------------
export const getUserInfo = ({ commit }, data) => {
    api.getUserInfo(data).then(function (response) {
        if (response.data.code == 0) {
            //说明获取用户信息成功
            if (!response.data.data || response.data.data == '') {
                //说明游客访问
                commit(types.AUTH_INFO_CLEAR)
            } else {
                //说明有用户信息，为用户登录
                commit(types.AUTH_INFO, {
                    token: response.data.data
                })
            }
        } else {
            //获取用户信息失败
            showMsg({ commit },{
                content: response.data.msg || '登录失败',
                type: 'danger'
            })
        }
    })
        .catch(function (error) {
            showMsg({ commit },{
                content: error.response.data.errorMsg || '登录失败',
                type: 'danger'
            })
        });
};
export const loginOut = ({ commit }, data) => {
    api.loginOut(data).then(function (response) {
        commit(types.USER_LOGOUT)
    })
        .catch(function (error) {
            console.log(error)
        });
};
//----------------------------------------------------------------------------------------------

//----------------------------------------首页------------------------------------------------------
export const qryIndex = ({ commit }, data) => {
    api.qryIndex(data).then(function (response) {
        commit(types.INDEX_LIST, {
            list: response.data.data,
        })
    })
        .catch(function (error) {
            console.log(error)
        });
};
//----------------------------------------------------------------------------------------------

//-------------------------------查询商家首页列表---------------------------------------------------------------
export const qryStoreList = ({ commit }, data) => {
    api.qryStoreList(data).then(function (response) {
        if (response.data.data.list && response.data.data.list.length > 0) {
            for (var i = 0; i < response.data.data.list.length; i++) {
                response.data.data.list[i].showAll = false
                commit(types.SHOPSTORE_LIST, {
                    list: response.data.data.list,
                    page: response.data.data.page
                })
            }
        } else {
            commit(types.SHOPSTORE_LIST, {
                list: response.data.data.list,
                page: response.data.data.page
            })
        }
    })
        .catch(function (error) {
            console.log(error)
        });
};

export const shopListChange = ({ commit }, data) => {
    commit(types.SHOPSTORE_LIST_CHANGE, data)
};

export const shopListClear = ({ commit }) => {
    commit(types.SHOPSTORE_LIST_CLEAR)
};
//----------------------------------------------------------------------------------------------

//---------------------------------商家首页分类-------------------------------------------------------------
export const qryStoreTag = ({ commit }, data) => {
    api.qryStoreTag(data).then(function (response) {
        commit(types.SHOPSTORE_LIST_TAG, {
            list: response.data.data
        })
    })
        .catch(function (error) {
            console.log(error)
        });
};

export const busTagClear = ({ commit }) => {
    commit(types.SHOPSTORE_LIST_TAG_CLEAR)
};

export const busTagChange = ({ commit }, data) => {
    commit(types.SHOPSTORE_LIST_TAG_CHANGE, data)
};
//----------------------------------------------------------------------------------------------

//----------------------------------商家详情------------------------------------------------------------
export const qryStoreDetails = ({ commit }, data) => {
    api.qryStoreDetails(data).then(function (response) {
        commit(types.SHOPSTORE_INFO, response.data.data.bus_info)
        commit(types.SHOPSTORE_DETAILS, response.data.data)
    })
        .catch(function (error) {
            console.log(error)
        });
};
//----------------------------------------------------------------------------------------------

//-------------------------------查询商家的官方案例---------------------------------------------------------------
export const qryBusSample = ({ commit }, data) => {
    api.qryBusSample(data).then(function (response) {
        commit(types.BUS_SAMPLE, {
            list: response.data.data.list,
            store: response.data.data.store,
            page: response.data.data.page
        })
    })
        .catch(function (error) {
            console.log(error)
        });
};

export const busSampleClear = ({ commit }) => {
    // commit(types.BUS_CLEAR)
};
//----------------------------------------------------------------------------------------------

//---------------------------------商家官方案例分类-------------------------------------------------------------
export const qryBusSampleTag = ({ commit }, data) => {
    api.qryBusSampleTag(data).then(function (response) {
        commit(types.BUS_SAMPLE_TAG, {
            list: response.data.data
        })
    })
        .catch(function (error) {
            console.log(error)
        });
};

export const busSampleTagClear = ({ commit }) => {
    commit(types.BUS_SAMPLE_TAG_CLEAR)
};

export const busSampleTagChange = ({ commit }, data) => {
    commit(types.BUS_SAMPLE_TAG_CHANGE, data)
};
//----------------------------------------------------------------------------------------------



//------------------------------------查询套餐首页列表----------------------------------------------------------
export const qryMealList = ({ commit }, data) => {
    api.qryMealList(data).then(function (response) {
        commit(types.MEAL_LIST, {
            list: response.data.data.list,
            page: response.data.data.page
        })
    })
        .catch(function (error) {
            console.log(error)
        });
};
export const mealClear = ({ commit }) => {
    commit(types.MEAL_CLEAR)
};
//----------------------------------------------------------------------------------------------

//---------------------------------------套餐首页分类-------------------------------------------------------
export const qryMealTag = ({ commit }, data) => {
    api.qryMealTag(data).then(function (response) {
        commit(types.MEAL_TAG_LIST, {
            list: response.data.data
        })
    })
        .catch(function (error) {
            console.log(error)
        });
};

export const mealTagClear = ({ commit }) => {
    commit(types.MEAL_TAG_CLEAR)
};

export const mealTagChange = ({ commit }, data) => {
    commit(types.MEAL_TAG_CHANGE, data)
};
//----------------------------------------------------------------------------------------------

//-----------------------------------------套餐详情-----------------------------------------------------
export const qryMealDetails = ({ commit }, data) => {
    api.qryMealDetails(data).then(function (response) {
        commit(types.MEAL_INFO, {
            info: response.data.data.package_info
        })
        commit(types.MEAL_DETAILS, {
            detail: response.data.data.package_detail
        })
    })
        .catch(function (error) {
            console.log(error)
        });
};
//----------------------------------------------------------------------------------------------

//--------------------------------------查询商家的套餐列表--------------------------------------------------------
export const qryThisMealList = ({ commit }, data) => {
    api.qryThisMealList(data).then(function (response) {
        commit(types.THIS_MEAL_LIST, {
            list: response.data.data.list,
            store: response.data.data.store,
        })
        commit(types.THIS_MEAL_PAGE, {
            currentPage: response.data.data.currentPage
        })
    })
        .catch(function (error) {
            console.log(error)
        });
};
//----------------------------------------------------------------------------------------------

//---------------------------------商家的套餐列表分类-------------------------------------------------------------
export const qryThisMealTag = ({ commit }, data) => {
    api.qryThisMealTag(data).then(function (response) {
        commit(types.THIS_MEAL_TAG, {
            list: response.data.data
        })
    })
        .catch(function (error) {
            console.log(error)
        });
};

export const busThisMealTagClear = ({ commit }) => {
    commit(types.THIS_MEAL_TAG_CLEAR)
};

export const busThisMealTagChange = ({ commit }, data) => {
    commit(types.THIS_MEAL_TAG_CHANGE, data)
};
//----------------------------------------------------------------------------------------------

//--------------------------------------摄影师详情--------------------------------------------------------
export const qryCamaramanDetails = ({ commit }, data) => {
    api.qryCamaramanDetails(data).then(function (response) {
        commit(types.CAMARAMAN_DETAILS, {
            data: response.data.data
        })
    })
        .catch(function (error) {
            console.log(error)
        });
};
//----------------------------------------------------------------------------------------------

//----------------------------------------化妆师详情------------------------------------------------------
export const qryMakeupDetails = ({ commit }, data) => {
    api.qryMakeupDetails(data).then(function (response) {
        commit(types.MAKEUP_DETAILS, {
            data: response.data.data
        })
    })
        .catch(function (error) {
            console.log(error)
        });
};
//----------------------------------------------------------------------------------------------



//----------------------------------------查看图组详情------------------------------------------------------
export const qryViewPhoto = ({ commit }, data) => {
    api.qryViewPhoto(data).then(function (response) {
        if (response.data.code == -1) {
            commit(types.HIDE_PHOTO_MODAL)
            return false
        }
        let photoCount = 0;
        for (let i = 0; i < response.data.data.list.length; i++) {
            const tempImage = new Image();
            tempImage.onload = function () {
                photoCount++;
                response.data.data.list[i].height = tempImage.height / 2 + 15;
                response.data.data.list[i].width = tempImage.width / 2;
                if (photoCount == response.data.data.list.length) {
                    commit(types.VIEW_PHOTO_MODAL, {
                        data: response.data.data,
                    })
                }
            };
            tempImage.onerror = function () {
                photoCount++;
                response.data.data.list[i].height = 0;
                if (photoCount == response.data.data.list.length) {
                    commit(types.VIEW_PHOTO_MODAL, {
                        data: response.data.data,
                    })
                }
            };
            tempImage.src = response.data.data.list[i].thumb;
        }
    })
        .catch(function (error) {
            console.log(error)
        });
};
export const hidePhotoModal = ({ commit }) => {
    commit(types.HIDE_PHOTO_MODAL)
};
//----------------------------------------------------------------------------------------------

//----------------------------------------首页已登录状态------------------------------------------------------
export const qryUserInfo = ({ commit }, data) => {
    api.qryUserInfo(data).then(function (response) {
        commit(types.USER_INFO, {
            data: response.data.data.user,
        })
    })
        .catch(function (error) {
            console.log(error)
        });
};
//----------------------------------------------------------------------------------------------


//----------------------------------------首页深度点评------------------------------------------------------
export const qryComment = ({ commit }, data) => {
    api.qryComment(data).then(function (response) {
        commit(types.COMMENT_LIST, {
            list: response.data.data.list,
            page: response.data.data.page
        })
    })
        .catch(function (error) {
            console.log(error)
        });
};
//----------------------------------------------------------------------------------------------


//----------------------------------------首页图片瀑布流------------------------------------------------------
export const qryPhotoFlow = ({ commit }, data) => {
    commit(types.PHOTO_STATUS, { status: 1 });
    api.qryPhotoFlow(data).then(function (response) {
        if (!response.data.data || response.data.data.photo.length == 0) {
            return commit(types.PHOTO_STATUS, { status: 2 });
        }
        const status = response.data.data.photo.length == 20 ? 0 : 2;
        let photoCount = 0;
        for (let i = 0; i < response.data.data.photo.length; i++) {
            const tempImage = new Image();
            tempImage.onload = function () {
                photoCount++;
                let rate = tempImage.width / tempImage.height;
                if(tempImage.height > 600){
                    response.data.data.photo[i].width = tempImage.width / 1.3715;
                }else{
                    response.data.data.photo[i].width = tempImage.width / 1.41;
                }
                response.data.data.photo[i].height = response.data.data.photo[i].width / rate + 70;
                if (photoCount == response.data.data.photo.length) {
                    commit(types.PHOTO_LIST, {
                        list: response.data.data.photo,
                        status: status
                    })
                }
            };
            tempImage.onerror = function () {
                photoCount++;
                response.data.data.photo[i].height = 0;
                if (photoCount == response.data.data.photo.length) {
                    commit(types.PHOTO_LIST, {
                        list: response.data.data.photo,
                        status: status
                    })
                }
            };
            tempImage.src = response.data.data.photo[i].img;
        }
    })
        .catch(function (error) {
            commit(types.PHOTO_STATUS, { status: 0 })
            console.log(error)
        });
};
export const photoClear = ({ commit }) => {
    commit(types.PHOTO_CLEAR)
};
//----------------------------------------------------------------------------------------------

//----------------------------------------攻略------------------------------------------------------
export const qryGuideList = ({ commit }, data) => {
    api.qryGuideList(data).then(function (response) {
        commit(types.GUIDE_LIST, {
            list: response.data.data,
        })
    })
        .catch(function (error) {
            console.log(error)
        });
};
//----------------------------------------------------------------------------------------------

//----------------------------------------收藏图片------------------------------------------------------
export const collectPhoto = ({ commit }, data) => {
    const ajaxdata = {
        id: data.id,
        uid: data.uid
    }
    api.collectPhoto(ajaxdata).then(function (response) {
        commit(types.PHOTO_LIKE_USER, data)
    })
        .catch(function (error) {
            console.log(error)
        });
};
//----------------------------------------------------------------------------------------------

//----------------------------------------取消收藏图片------------------------------------------------------
export const cancelCollectPhoto = ({ commit }, data) => {
    const ajaxdata = {
        id: data.id,
        uid: data.uid
    }
    api.cancelCollectPhoto(ajaxdata).then(function (response) {
        commit(types.CANCEL_PHOTO_LIKE_USER, data)
    })
        .catch(function (error) {
            console.log(error)
        });
};
//----------------------------------------------------------------------------------------------

//----------------------------------------我的收藏------------------------------------------------------
export const qryMyCollectList = ({ commit }, data) => {
    api.qryMyCollectList(data).then(function (response) {
        commit(types.COLLECT_LIST, {
            data: response.data.data,
        })
    })
        .catch(function (error) {
            console.log(error)
        });
};
export const collectListChange = ({ commit }, data) => {
    commit(types.COLLECT_LIST_CHANGE, data)
};
//----------------------------------------------------------------------------------------------
