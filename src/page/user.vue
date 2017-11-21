<template>
    <div class="page-user">
        <com-header></com-header>
        <div style="position:relative">
            <div class="user-info fl" v-show="userShow && isAuth">
                <div class="Profile">
                    <div class="user-nike">
                        <img class="user-head fl" width="80" height="80" :src="getUser.head">
                        <div class="user-nike-ct fl">
                            <p>{{getUser.nike}}</p>
                            <a href="javascript:void(0)" target="_blank"><label @click="pageCollect" class="col-name">收藏的图片</label></a>
                        </div>
                        <span class="close-btn-new" @click="CloseClick"></span>
                    </div>
                    <ul class="user_category user_category_style" v-if="style&&style.length>0">
                        <li v-for="(item,s) in style" :key="s">
                            <span class="show_list">{{item.name}}</span>
                            <div class="line">
                                <div class="bar" v-bind:style="{ width: item.value }"></div>
                            </div>
                            <span class="percent">{{item.value}}</span>
                        </li>
                        <img src="/static/images/icon_photo_from.png" v-if="stores&&stores.length>0">
                    </ul>
                    <ul class="user_category user_category_store">
                        <li v-for="(item,s) in stores" :key="s">
                            <router-link :to="{ name: 'storeDetails', params: {busId:item.id}}" target="_blank">
                                <div class="show_img">
                                    <img :src="item.logo" width="64" height="64">
                                    <span class="show_name">{{item.name}}</span>
                                </div>

                                <div class="line line-store">
                                    <div class="bar" v-bind:style="{ width: item.value}"></div>
                                </div>
                                <span class="percent">{{item.value}}</span>
                            </router-link>
                        </li>
                    </ul>
                </div>

            </div>
            <div class="user-water">
                <waterfall :interval="200" :line="line" :watch="getPhotoList" :line-gap="280" :min-line-gap="280" :max-line-gap="320" :single-max-width="640" :align="align">
                    <waterfall-slot v-for="(item, flowNum) in getPhotoList" :width="item.width" :height="item.height" :order="flowNum" :key="flowNum" move-class="photo_move">
                        <div class="panel photo_box hover_sh" :style="{ height: item.height + 'px' }">
                            <div class="img-hover panel-img">
                                <router-link :to="{ name: 'bottompage', params: {id: item.id, type: 2}}" target="_blank">
                                    <!-- <div v-lazy:background-image="item.img"></div> -->
                                    <img v-lazy="item.img" width="300">
                                </router-link>
                            </div>
                            <div class="photo_info" :style="{ top: item.height-68 + 'px' }">
                                <div class="photo_info_top">
                                    <ul>
                                        <li v-for="(tag,t) in item.tag" :key="t">{{tag}}</li>
                                    </ul>
                                    <span class="photo_like" @click="photoLikeBtn(item.id,item.is_fav,flowNum)">
                                        <i v-if="item.is_fav" class="icon_like_act"></i>
                                        <i v-if="!item.is_fav" class="icon_like"></i>
                                        {{item.fav_num}}
                                    </span>
                                </div>
                                <div class="photo_info_bottom">
                                    <img class="person_img" :src="item.head" width="25" height="25">
                                    <span>{{item.nickname}}</span>
                                </div>
                            </div>

                        </div>

                    </waterfall-slot>
                </waterfall>
            </div>
            <div class="loding">
                <img v-if="isLoding == 1" src="/static/images/wed-loading.gif">
                <p v-if="isLoding == 2">没有更多了~</p>
            </div>
        </div>

        <com-modal @modalCallback="modalCallback"></com-modal>
    </div>
</template>

<script>
import header from './../components/header';
import modal from './../components/modal';
import { waterfall, waterfallSlot } from 'vue-waterfall';
import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
        comHeader: header,
        waterfall: waterfall,
        waterfallSlot: waterfallSlot,
        comModal: modal
    },
    computed: {
        ...mapGetters({
            getUser: 'getUser',
            getAuth: 'getAuth',
            getPhotoList: 'getPhotoList',
            getPhotoStatus: 'getPhotoStatus'
        }),
        ...mapActions({
            qryPhotoFlow: 'qryPhotoFlow',
            qryUserInfo: 'qryUserInfo',
            showModal: 'showModal'
        })
    },
    data() {
        return {
            isAuth: false,
            style: null,
            stores: null,
            show: false,
            photoModal: {},
            orderNum: null,
            uid: null,
            page: 1,
            line: 'v',
            align: 'center',
            userShow: true,
            isLoding: 0
        };
    },
    mounted() {
        try {
            this.loadPhoto();
            window.addEventListener('scroll', this.loadMore);
        } catch (e) {
            console.log(e);
        }
    },
    methods: {
        photoLikeBtn(id, fav, flowNum) {
            if (this.isAuth) {
                if (fav == 0) {
                    //说明未收藏，可以收藏
                    let ajaxdata = {
                        id: id,
                        uid: this.uid,
                        order: flowNum,
                        is_fav: fav
                    };
                    this.$store.dispatch('collectPhoto', ajaxdata);
                } else if (fav == 1) {
                    //说明已经收藏了,为取消收藏
                    let ajaxdata = {
                        id: id,
                        uid: this.uid,
                        order: flowNum,
                        is_fav: fav
                    };
                    this.$store.dispatch('cancelCollectPhoto', ajaxdata);
                } else {
                    //未知异常
                    console.log('collect 接口异常');
                }
            } else {
                const data = {
                    name: 'delPhoto',
                    info: {
                        text: '登录后才能收藏哦~'
                    }
                };
                this.$store.dispatch('showModal', data);
            }
        },
        modalCallback(val) {
            if (val) {
                //说明点击确认
                window.location.href = '/login';
            }
        },
        loadPhoto() {
            let data = {
                page: this.page
            };
            this.$store.dispatch('qryPhotoFlow', data);
        },
        loadMore() {
            let windowHeight =
                document.compatMode == 'CSS1Compat'
                    ? document.documentElement.clientHeight
                    : document.body.clientHeight;
            let documentHeight = Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight
            );
            let scrollTop = Math.max(
                //chrome
                document.body.scrollTop,
                //firefox/IE
                document.documentElement.scrollTop
            );
            if (
                scrollTop + windowHeight + 500 >= documentHeight &&
                this.getPhotoStatus == 0
            ) {
                this.isLoding = 1;
                this.page++;
                this.loadPhoto();
            } else if (this.getPhotoStatus == 2) {
                this.isLoding = 2;
            }
        },
        CloseClick() {
            this.userShow = false;
        },
        pageCollect(){
            this.$router.push({ name: 'collect', params: {type:0} });
        }
    },
    watch: {
        getUser() {
            this.style = this.getUser.category.style;
            this.stores = this.getUser.category.stores;
        },
        getAuth() {
            let token = this.getAuth;
            let isLogin = Boolean(token);
            if (isLogin) {
                this.isAuth = true;
                this.uid = token.uid;
                let data = {
                    uid: this.uid
                };
                this.$store.dispatch('qryUserInfo', data);
            } else {
                this.isAuth = false;
            }
        }
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.loadMore);
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.page-user {
    .user-info {
        width: 300px;
        height: auto;
        position: absolute;
        right: 24px;
        top: 0;
        .Profile {
            position: relative;
            height: auto;
            background: #ffffff;
            z-index: 9;
            padding-bottom: 20px;
        }
    }

    .user-water {
        position: relative;
        width: 100%;
        min-height: 800px;
        top: 5px;
        padding: 0 10px;
        overflow: hidden;
    }
    .user-nike-ct {
        position: absolute;
        left: 100px;
        bottom: 0;
    }
    .user-nike {
        position: relative;
        top: 13px;
        padding: 0 15px;
        background: #fff;
        overflow: hidden;
        p {
            color: #4c4c4c;
            font-size: 22px;
            margin-bottom: 0px;
        }
        .col-name {
            display: block;
            color: #b2b2b2;
            font-size: 14px;
        }
        .col-name:hover {
            color: #ff4e6b;
            -webkit-transition: all 0.1s ease;
            transition: all 0.1s ease;
        }
    }

    .user-head {
        float: left;
        z-index: 9;
    }

    .user_category {
        position: relative;
        top: 18px;
        left: 0;
        padding: 0 15px;
        background: #ffffff;
        height: auto;
        overflow: hidden;
        li {
            width: 100%;
            height: 28.06px;
            margin-top: 10px;
            line-height: 28.06px;
        }
    }

    .user_category_style {
        li:nth-child(3) {
            margin-bottom: 20px;
        }
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

    .user_category_store {
        li {
            margin-top: 20px;
            height: 60px;
            margin-bottom: 20px;
            width: 100%;
            overflow: hidden;
            line-height: 88.06px;
        }
        li:nth-child(3) {
            margin-bottom: 50px;
        }
    }

    .show_img {
        position: relative;
        width: 70px;
        line-height: 38.06px;
        float: left;
        .show_name {
            font-size: 14px;
            color: #4c4c4c;
            line-height: 28.06px;
            position: absolute;
            top: 0px;
            left: 76px;
            width: 140px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
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

    .line-store {
        margin-top: 40px;
    }

    .percent {
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

    .panel_msg {
        background: #fff;
        border-radius: 5px;
        margin-bottom: 15px;
        border-right: solid 1px #dededf;
        border-bottom: solid 1px #d9d9da;
        line-height: 45px;
        text-align: center;
    }

    .photo_info {
        position: relative;
        height: 32px;
        line-height: 32px;
        color: #b3b3b3;
        font-size: 14px;
        text-align: left;
        background-color: #fff;
        height: 70px;
        line-height: 20px;
        .photo_like {
            position: relative;
            right: 10px;
        }
        ul {
            float: right;
        }
        .photo_info_bottom {
            color: #b2b2b2;
            font-size: 12px;
            height: 25px;
            line-height: 25px;
            img {
                border-radius: 50%;
                float: left;
                margin: 0 10px 0;
            }
        }
        .photo_info_top {
            overflow: hidden;
            padding: 8px 0;
            span {
                float: right;
            }
            ul {
                float: left;
                margin-left: 10px;
            }
        }
    }
    .close-btn-new {
        display: block;
        width: 13px;
        height: 13px;
        cursor: pointer;
        background: url(../../static/images/close.png) no-repeat;
        position: absolute;
        right: 7px;
        top: 7px;
    }
    .vue-waterfall-slot {
        margin-bottom: 20px;
    }
    .panel {
        width: 300px;
        background-color: #ffffff;
        position: relative;
        .panel-img {
            position: absolute;
        }
    }
    .loding {
        width: 100%;
        position: relative;
        text-align: center;
        padding: 10px 0;
        color: #b3b3b3;
    }
}
</style>
