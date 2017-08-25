import { PHOTO_LIST,VIEW_PHOTO_MODAL,HIDE_PHOTO_MODAL,PHOTO_STATUS,PHOTO_CLEAR,PHOTO_LIKE_USER,CANCEL_PHOTO_LIKE_USER} from '../types'

const state = {
    list: [],
    photoInfo:{},
    photoList: [],
    photoListFill: [],
    status: 0,
    photoModelStatus:0
};

const mutations = {
    [VIEW_PHOTO_MODAL](state, data) {
        state.photoModelStatus = 0;
        state.list = data.data.list;
        state.photoInfo = data.data;
        //console.log(state.photoInfo)
    },
    [HIDE_PHOTO_MODAL](state, data) {
        state.list = [];
        state.photoInfo = null;
        state.photoModelStatus = -1;
    },
    [PHOTO_LIST](state, data) {
   /* 原来的代码    for(var i=0;i<Math.floor(data.list.length/4);i++){
            state.photoListFill = state.photoListFill.concat(data.list[i]);
        }
        for(var j=Math.floor(data.list.length/4);j<data.list.length;j++){
            state.photoList = state.photoList.concat(data.list[j]);
        }*/
   // 解决bug:已登录的瀑布流间距异常问题
        console.log(data)
        var temp1=[];
        var temp2=[];
        var length= data.list.length; // 待分配数据总数
        var buffer=0;// 缓冲区
        var bufferLength=4;// 缓冲区总长度
        for(var i=0;i<length;i++){
            if(buffer==3){
                temp1.push(data.list[i])
            }else{
                temp2.push(data.list[i])
            }
            buffer++;
            if(buffer==bufferLength){
                buffer=0
            }
            if(i==length){
                buffer = 0
            }
        }
        var h1 = document.querySelector(".user-info").offsetHeight;
        var h2 = document.querySelector(".user-water").offsetHeight;
        if((h1-h2)>110){
            console.log('补差')
            var shift = temp1.shift();
            temp2 = temp2.concat(shift);
        }
        state.photoListFill = state.photoListFill.concat(temp1);
        state.photoList = state.photoList.concat(temp2);
        console.log(temp1.length+'   右侧：'+temp2.length)
        
        state.status = data.status;
    },
    [PHOTO_STATUS](state, data){
        state.status = data.status;
    },
    [PHOTO_CLEAR](state){
        state.photoList = [];
        state.status = 0;
    },
    [PHOTO_LIKE_USER](state, data){
        if(state.photoList[data.order]){
            if(data.isFill){
                const obj = state.photoListFill[data.order]
                obj.is_fav = !obj.is_fav
                state.photoListFill[data.order].is_fav = obj.is_fav
                state.photoListFill[data.order].fav_num++
                state.photoListFill.splice(data.order, 1, obj)
            }else{
                const obj = state.photoList[data.order]
                obj.is_fav = !obj.is_fav
                state.photoList[data.order].is_fav = obj.is_fav
                state.photoList[data.order].fav_num++
                state.photoList.splice(data.order, 1, obj)
            }
        }

        if(state.list[data.index]){
            const objModal = state.list[data.index]
            objModal.is_fav = !objModal.is_fav
            state.list[data.index].is_fav = objModal.is_fav
            state.list[data.index].fav_num++
            state.list.splice(data.index, 1, objModal)
        }
    },
    [CANCEL_PHOTO_LIKE_USER](state, data){
        if(state.photoList[data.order]){
            if(data.isFill){
                const obj = state.photoListFill[data.order]
                obj.is_fav = !obj.is_fav
                state.photoListFill[data.order].is_fav = obj.is_fav
                state.photoListFill[data.order].fav_num--
                state.photoListFill.splice(data.order, 1, obj)
            }else{
                const obj = state.photoList[data.order]
                obj.is_fav = !obj.is_fav
                state.photoList[data.order].is_fav = obj.is_fav
                state.photoList[data.order].fav_num--
                state.photoList.splice(data.order, 1, obj)
            }
        }

        if(state.list[data.index]){
            const objModal = state.list[data.index]
            objModal.is_fav = !objModal.is_fav
            state.list[data.index].is_fav = objModal.is_fav
            state.list[data.index].fav_num--
            state.list.splice(data.index, 1, objModal)
        }
    }
};

export default {
    state,
    mutations
}
