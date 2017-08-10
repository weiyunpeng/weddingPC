<template>
    <div class="user">
        <com-header></com-header>
        <div class="container">
            <div class="user-info" v-show="isAuth">
                <img class="user-head fl" v-lazy="getUser.head" width="124" height="124">
                <div class="user-nike">
                    <p>{{getUser.nike}}</p>
                    <label>我的收藏</label>
                </div>
                <ul class="user_category user_category_style">
                    <li v-for="(item,s) in style" :key="s">
                         <span class="show_list">{{item.name}}</span> 
                         <div class="line">
                            <div class="bar" v-bind:style="{ width: item.value }"></div>
                        </div> 
                         <span class="percent">{{item.value}}</span> 
                    </li>
                    <img style="margin:20px 0" src="/static/images/icon_photo_from.png">
                </ul>
                <ul class="user_category user_category_store">
                    <li v-for="(item,s) in stores" :key="s">
                        <div class="show_img"><img :src="item.logo" width="64" height="64"></div>
                         <div class="line line-store">
                            <div class="bar" v-bind:style="{ width: item.value}"></div>
                        </div> 
                         <span class="percent">{{item.value}}</span> 
                    </li>
                </ul>
            </div>
            <div class="user-water">
            <waterfall :line-gap="300" :min-line-gap="320" :max-line-gap="640" :single-max-width="640" :watch="getViewPhotoIndex">
                    <waterfall-slot v-for="(item, flowNum) in getViewPhotoIndex" :width="300" :height="item.height" :order="flowNum" :key="flowNum" move-class="photo_move">
                        <div class="panel photo_box hover_sh">
                            <img :src="item.img" @click="showPhotoModal(item, flowNum)">
                            <div class="photo_info">
                                <span class="photo_like" @click="photoLikeBtn(item.id,flowNum)">
                                    <!-- <i class="icon_like_act"></i>  -->
                                    <i class="icon_like"></i> {{item.fav_num}}
                                </span>
                                <ul>
                                    <li v-for="(tag,t) in item.tag" :key="t">{{tag}}</li>
                                </ul>
                            </div>
    
                        </div>
                    </waterfall-slot>
                </waterfall>
            </div>
        </div>
        <com-photoModal v-model="show" :value="show" :photoModal="photoModal" :index="index">
        </com-photoModal>
    </div>
</template>

<script>
import header from './../components/user/userHead'
import { waterfall, waterfallSlot } from 'vue-waterfall'
import photoModal from './../components/photoModal'
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        'comHeader': header,
        'waterfall': waterfall,
        'waterfallSlot': waterfallSlot,
        'comPhotoModal': photoModal
    },
    computed: {
        ...mapGetters({
            getUser:'getUser',
            getViewPhotoIndex: 'getViewPhotoIndex'
        }),
        ...mapActions({
            qryLoginIndex:'qryLoginIndex'
        })
    },
    data() {
        return {
            isAuth:false,
            style:null,
            stores:null,
            show: false,
            photoModal: {},
            index: null,
        }
    },
    mounted() {
        let data={
            page:1
        }
        this.$store.dispatch('qryPhotoFlow', data)
        try{
            let token = JSON.parse(localStorage.getItem('user'));
            let isLogin = Boolean(token);
            if(isLogin){
                this.isAuth = true
                let data={
                    uid:token.uid
                }
                this.$store.dispatch('qryLoginIndex', data)
            }else{
                this.isAuth = false
            }
        }catch(e){
            console.log(e)
        }
    },
    methods: {
        photoLikeBtn() {
            alert('登录后才能收藏哦~')
        },
        showPhotoModal(item, index) {
            this.photoModal = item;
            this.index = index;
            this.show = true;
            const ajaxdata = {
                id: this.photoModal.id
            }
            this.$store.dispatch('qryViewPhoto', ajaxdata)
        }
    },
    watch: {
        getUser(){
            this.style = this.getUser.category.style
            this.stores = this.getUser.category.stores
        }
    },
    beforeDestroy() {
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.user-head {
    position: relative;
    top: -45px;
    left: 5px;
    z-index: 9;
}

.user-info {
    float:left;
    z-index: 6;
    position: relative;
    top: 50px;
    width: 290px;
    height: 565px;
    background: #ffffff;
    padding: 2px 10px;
}
.user-water{
    position: relative;
    left:10px;
    overflow: hidden;
}

.user-nike {
    position: relative;
    left: 20px;
    top: 18px;
    p {
        color: #4c4c4c;
        font-size: 22px;
        line-height: 27.28px;
    }
    label {
        display: block;
        color: #b2b2b2;
        font-size: 14px;
        line-height: 27.28px;
    }
}

.user_category {
    position: absolute;
    width: 275px;
    overflow: hidden;
    li {
        width: 100%;
        height: 28.06px;
        margin-top: 10px;
        line-height: 28.06px;
    }
}
.user_category_style{
    top: 100px;
}

.show_list {
    float: left;
    width: 70px;
    font-size: 16px;
    color: #4c4c4c;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.user_category_store{
    top: 260px;
    li{
        height: 60px;
        line-height: 88.06px;
    }
}

.show_img{
    width: 70px;
    line-height: 38.06px;
    float: left;
}

.line {
    float: left;
    width: 55%;
    border: 1px solid #ffa9b7;
    height: 8px;
    border-radius: 10px;
    background: #ffffff;
    margin-right: 7px;
    margin-top: 10px;
}
.line-store{
    margin-top: 40px;
}

.percent{
    float: left;
    color: #808080;
    font-size: 14px;
}

.bar {
    background: #ffa9b7;
    float: left;
    height: 100%;
    border-radius: 10px;
}

.bar {
    animation: animate-positive 2s;
}

@-webkit-keyframes animate-positive {
    0% {
        width: 0;
    }
}

@keyframes animate-positive {
    0% {
        width: 0;
    }
}

@-moz-keyframes animate-positive {
    0% {
        width: 0;
    }
}
</style>
