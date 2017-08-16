import api from '../api/index'
import * as types from './types'


//----------------------------------------------------------------------------------------------
export const showMsg = ({ commit }, data) => {
    const id = new Date().getTime();
    data.id = id;
    commit(types.SHOW_MSG, data);
    setTimeout(() => commit(types.HIDE_MSG, id), 2000)
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
export const getUserInfo = ({ commit },data) => {
    api.getUserInfo(data).then(function (response) {
        if(response.data.code == 0){
            //说明获取用户信息成功
            if(!response.data.data || response.data.data==''){
                //说明游客访问
            }else{
                //说明有用户信息，为用户登录
                commit(types.AUTH_INFO, {
                    token: response.data.data
                })
            }
        }else{
            //获取用户信息失败
            commit(types.AUTH_INFO_CLEAR)
        }
    })
        .catch(function (error) {
            console.log(error)
        });
};
export const loginOut = ({ commit },data) => {
    api.loginOut(data).then(function(response){
        commit(types.USER_LOGOUT)
    })
    .catch(function (error) {
            console.log(error)
        });
};
//----------------------------------------------------------------------------------------------

//-------------------------------查询商家首页列表---------------------------------------------------------------
export const qryBusList = ({ commit },data) => {
    api.qryBusList(data).then(function (response) {
        for(var i = 0; i<response.data.data.list.length;i++){
            response.data.data.list[i].showAll = false
            commit(types.BUS_LIST, {
                list: response.data.data.list,
                page: response.data.data.page
            })
        }
    })
        .catch(function (error) {
            commit(types.BUS_LIST);
            console.log(error)
        });
};

export const busChange = ({ commit },data) => {
    commit(types.BUS_CHANGE,data)
};

export const busClear = ({ commit }) => {
    commit(types.BUS_CLEAR)
};
//----------------------------------------------------------------------------------------------

//---------------------------------商家首页分类-------------------------------------------------------------
export const qrybusTag = ({ commit },data) => {
    api.qryBusTag(data).then(function (response) {
        commit(types.BUS_TAG_LIST, {
            list: response.data.data
        })
    })
        .catch(function (error) {
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

//----------------------------------商家详情------------------------------------------------------------
export const qryBusDetails = ({ commit },data) => {
    api.qryBusDetails(data).then(function (response) {
        commit(types.BUS_INFO, {
            data: response.data.data.bus_info
        })
        commit(types.BUS_DETAILS_LIST, {
            list: response.data.data.list
        })
    })
        .catch(function (error) {
            console.log(error)
        });
};
//----------------------------------------------------------------------------------------------

//-------------------------------查询商家的官方案例---------------------------------------------------------------
export const qryBusSample = ({ commit },data) => {
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
    commit(types.BUS_CLEAR)
};
//----------------------------------------------------------------------------------------------

//---------------------------------商家官方案例分类-------------------------------------------------------------
export const qryBusSampleTag = ({ commit },data) => {
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

export const busSampleTagChange = ({ commit },data) => {
    commit(types.BUS_SAMPLE_TAG_CHANGE,data)
};
//----------------------------------------------------------------------------------------------



//------------------------------------查询套餐首页列表----------------------------------------------------------
export const qryMealList = ({ commit },data) => {
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
export const qryMealTag = ({ commit },data) => {
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

export const mealTagChange = ({ commit },data) => {
    commit(types.MEAL_TAG_CHANGE,data)
};
//----------------------------------------------------------------------------------------------

//-----------------------------------------套餐详情-----------------------------------------------------
export const qryMealDetails = ({ commit },data) => {
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
export const qryThisMealList = ({ commit },data) => {
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
export const qryThisMealTag = ({ commit },data) => {
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

export const busThisMealTagChange = ({ commit },data) => {
    commit(types.THIS_MEAL_TAG_CHANGE,data)
};
//----------------------------------------------------------------------------------------------

//--------------------------------------摄影师详情--------------------------------------------------------
export const qryCamaramanDetails = ({ commit },data) => {
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
export const qryMakeupDetails = ({ commit },data) => {
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

//----------------------------------------首页未登录状态------------------------------------------------------
export const qryIndex = ({ commit },data) => {
    api.qryIndex(data).then(function (response) {
        let photoCount = 0;
        if(response.data.data.photo.length<=0){
            commit(types.INDEX_LIST, {
                list: response.data.data,
            })
            return false
        }
        for(let i=0;i < response.data.data.photo.length;i++){
            const tempImage = new Image();
            tempImage.onload = function() {
                photoCount++;
                response.data.data.photo[i].height = tempImage.height + 30;
                response.data.data.photo[i].width = tempImage.width;
                if( photoCount == response.data.data.photo.length) {
                    commit(types.INDEX_LIST, {
                        list: response.data.data,
                    })
                }
            };
            tempImage.onerror = function(){
                photoCount++;
                response.data.data.photo[i].height = 0;
                if( photoCount == response.data.data.photo.length) {
                    commit(types.INDEX_LIST, {
                        list: response.data.data,
                    })
                }
            };
            tempImage.src = response.data.data.photo[i].img;
        }
    })
        .catch(function (error) {
            console.log(error)
        });
};
//----------------------------------------------------------------------------------------------

//----------------------------------------查看图组详情------------------------------------------------------
export const qryViewPhoto = ({ commit },data) => {
    api.qryViewPhoto(data).then(function (response) {
        let photoCount = 0;
        for(let i=0;i < response.data.data.list.length;i++){
            const tempImage = new Image();
            tempImage.onload = function() {
                photoCount++;
                response.data.data.list[i].height = tempImage.height /2 + 15;
                response.data.data.list[i].width = tempImage.width/2;
                if( photoCount == response.data.data.list.length) {
                    commit(types.VIEW_PHOTO_MODAL, {
                        data: response.data.data,
                    })
                }
            };
            tempImage.onerror = function(){
                photoCount++;
                response.data.data.list[i].height = 0;
                if( photoCount == response.data.data.list.length) {
                    commit(types.VIEW_PHOTO_MODAL, {
                        list: response.data.data.list,
                    })
                }
            };
            tempImage.src = response.data.data.list[i].img;
        }
    })
        .catch(function (error) {
            console.log(error)
        });
};
//----------------------------------------------------------------------------------------------

//----------------------------------------首页已登录状态------------------------------------------------------
export const qryLoginIndex = ({ commit },data) => {
    api.qryLoginIndex(data).then(function (response) {
        commit(types.USER_INFO, {
            data: response.data.data.user,
        })
    })
        .catch(function (error) {
            console.log(error)
        });
};
//----------------------------------------------------------------------------------------------

//----------------------------------------首页图片瀑布流------------------------------------------------------
export const qryPhotoFlow = ({ commit },data) => {
    commit(types.PHOTO_STATUS, {status: 1});
    api.qryPhotoFlow(data).then(function (response) {
        if(response.data.data.photo.length == 0){
            return commit(types.PHOTO_STATUS, {status: 2});
        }
        let photoCount = 0;
        for(let i=0;i < response.data.data.photo.length;i++){
            const tempImage = new Image();
            tempImage.onload = function() {
                photoCount++;
                response.data.data.photo[i].height = tempImage.height + 30;
                response.data.data.photo[i].width = tempImage.width;
                if( photoCount == response.data.data.photo.length) {
                    commit(types.PHOTO_LIST, {
                        list: response.data.data.photo,
                        status: status
                    })
                }
            };
            tempImage.onerror = function(){
                photoCount++;
                response.data.data.photo[i].height = 0;
                if( photoCount == response.data.data.photo.length) {
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
            commit(types.PHOTO_STATUS, {status: 0});
            console.log(error)
        });
};
export const photoClear = ({ commit }) => {
    commit(types.PHOTO_CLEAR)
};
//----------------------------------------------------------------------------------------------

//----------------------------------------攻略------------------------------------------------------
export const qryGuideList = ({ commit },data) => {
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
export const collectPhoto = ({ commit },data) => {
    api.collectPhoto(data).then(function (response) {
        console.log(response.data.msg)
    })
        .catch(function (error) {
            console.log(error)
        });
};
//----------------------------------------------------------------------------------------------

//----------------------------------------取消收藏图片------------------------------------------------------
export const cancelCollectPhoto = ({ commit },data) => {
    api.cancelCollectPhoto(data).then(function (response) {
        console.log(response.data.msg)
    })
        .catch(function (error) {
            console.log(error)
        });
};
//----------------------------------------------------------------------------------------------

//----------------------------------------我的收藏------------------------------------------------------
export const qryMyCollectList = ({ commit },data) => {
    api.qryMyCollectList(data).then(function (response) {
        commit(types.COLLECT_LIST, {
            data: response.data.data,
        })
    })
        .catch(function (error) {
            console.log(error)
        });
};
//----------------------------------------------------------------------------------------------