<template>
    <div class="user">
        <com-header></com-header>
        <div class="" style="position:relative">
            <div class="user-info fl"  v-show="userShow && isAuth">
                <div class="Profile"  >
                    <div class="user-nike">
                        <img class="user-head fl"  width="80" height="80" v-lazy="getUser.head">
                        <div class="user-nike-ct fl"> 
                        <p>{{getUser.nike}}</p>
                        <router-link :to="{ name: 'collect', query: {type:0}}" target="_blank">
                            <label class="col-name">收藏的图片</label>
                        </router-link>
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
                            <router-link :to="{ name: 'storeDetails', query: {busId:item.id}}" target="_blank">
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
                <waterfall :line="line" :watch="getPhotoList" :line-gap="290" :min-line-gap="320" :max-line-gap="640" :single-max-width="640">
                    <waterfall-slot v-for="(item, flowNum) in getPhotoList" :width="item.width" :height="item.height" :order="flowNum" :key="flowNum" move-class="photo_move">
                        <div class="panel photo_box hover_sh">
                            <div class="img-hover" @click="showPhotoModal(item, flowNum)">
                                <img v-lazy="item.img" :width="300">
                            </div>
                            <div class="photo_info">
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
        </div>
        
        <com-modal @modalCallback="modalCallback"></com-modal>
    </div>
</template>

<script>
import header from './../components/user/userHead';
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
            grow: [2, 2, 2],
            line: 'v',
            userShow: true
        };
    },
    mounted() {
        try {
            this.loadPhoto();
            window.smoothscroll();
            window.addEventListener('scroll', this.loadMore);
            let token = JSON.parse(localStorage.getItem('user'));
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
        showPhotoModal(item, index, isFill) {
            this.photoModal = item;
            if (isFill) {
                this.photoModal.isFill = isFill;
            }
            this.orderNum = index;
            this.$router.push({
                name: 'bottompage',
                query: { id: this.photoModal.id }
            });
        },
        loadPhoto() {
            let data = {
                page: this.page
            };
            this.$store.dispatch('qryPhotoFlow', data);
        },
        loadMore() {
            const scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop;
            const allHeight = document.body.scrollHeight;
            const pageHeight = document.documentElement.clientHeight;
            if (
                scrollTop == allHeight - pageHeight &&
                this.getPhotoStatus == 0
            ) {
                this.page++;
                this.loadPhoto();
            }
        },
        CloseClick() {
            this.userShow = false;
        }
    },
    watch: {
        getUser() {
            this.style = this.getUser.category.style;
            this.stores = this.getUser.category.stores;
        }
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.loadMore);
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.user-info {
    width: 290px;
    height: auto;
    position: absolute;
    right: 0;
    top: 0;
    .Profile {
        position: relative;
        width: 290px;
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
    margin-bottom: 20px;
    left: 20px;
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
    width: 290px;
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
    height: 70px;
    line-height: 20px;
    .photo_info_bottom {
        background-color: #fff;
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
</style>
