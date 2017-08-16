<template>
    <div class="user">
        <com-header></com-header>
        <div class="container">
            <div class="user-info fl" v-show="isAuth">
                <div class="Profile">
                    <div class="user-nike">
                        <img class="user-head fl" v-lazy="getUser.head" width="124" height="124">
                        <p>{{getUser.nike}}</p>
                        <label v-if="style&&style.length>0">我的收藏</label>
                    </div>
                    <ul class="user_category user_category_style">
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
                            <div class="show_img">
                                <img :src="item.logo" width="64" height="64">
                                <span class="show_name">{{item.name}}</span>
                            </div>
    
                            <div class="line line-store">
                                <div class="bar" v-bind:style="{ width: item.value}"></div>
                            </div>
                            <span class="percent">{{item.value}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="user-water">
                <waterfall :line="line" :watch="getPhotoList" :line-gap="280" :min-line-gap="250">
                    <waterfall-slot v-for="(item, flowNum) in getPhotoList" :width="item.width" :height="item.height" :order="flowNum" :key="flowNum" move-class="photo_move">
                        <div class="panel photo_box hover_sh">
                            <div class="img-hover" @click="showPhotoModal(item, flowNum)">
                                <img :src="item.img" :width="280">
                            </div>
                            <div class="photo_info">
                                <span class="photo_like" @click="photoLikeBtn(item.id,item.is_fav,flowNum)">
                                    <i v-if="item.is_fav" class="icon_like_act"></i>
                                    <i v-if="!item.is_fav" class="icon_like"></i>
                                    {{item.fav_num}}
                                </span>
                                <ul>
                                    <li v-for="(tag,t) in item.tag" :key="t">{{tag}}</li>
                                </ul>
                            </div>
                        </div>
    
                    </waterfall-slot>
                </waterfall>
                <!-- <vueWaterfallEasy :imgsArr='getPhotoList'></vueWaterfallEasy> -->
            </div>
        </div>
        <com-photoModal v-model="show" :value="show" :photoModal="photoModal" :order="orderNum">
        </com-photoModal>
    </div>
</template>

<script>
import header from './../components/user/userHead'
// import vueWaterfallEasy from './../components/waterfall'
import { waterfall, waterfallSlot } from 'vue-waterfall'
import photoModal from './../components/photoModal'
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        'comHeader': header,
        'waterfall': waterfall,
        'waterfallSlot': waterfallSlot,
        'comPhotoModal': photoModal,
        // 'vueWaterfallEasy':vueWaterfallEasy
    },
    computed: {
        ...mapGetters({
            getUser: 'getUser',
            getPhotoList: 'getPhotoList',
            getPhotoStatus: 'getPhotoStatus',
        }),
        ...mapActions({
            qryPhotoFlow: 'qryPhotoFlow',
            qryLoginIndex: 'qryLoginIndex',
            photoClear: 'photoClear',
            showModal: 'showModal',
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
            line: 'v'
        }
    },
    mounted() {
        this.$store.dispatch('photoClear');
        this.loadPhoto();
        window.addEventListener('scroll', this.loadMore);
        try {
            let token = JSON.parse(localStorage.getItem('user'));
            let isLogin = Boolean(token);
            if (isLogin) {
                this.isAuth = true
                this.uid = token.uid
                let data = {
                    uid: this.uid
                }
                this.$store.dispatch('qryLoginIndex', data)
            } else {
                this.isAuth = false
            }
        } catch (e) {
            console.log(e)
        }
    },
    methods: {
        photoLikeBtn(id, fav, flowNum) {
            if (this.isAuth) {
                // let obj = this.getPhotoList[flowNum]
                // obj.is_fav = !obj.is_fav
                // this.$set(this.getPhotoList, flowNum, obj);
                if (fav == 0) {
                    //说明未收藏，可以收藏
                    let ajaxdata = {
                        id: id,
                        uid: this.uid,
                        order:flowNum,
                        is_fav:fav
                    }
                    this.$store.dispatch('collectPhoto', ajaxdata)
                } else if (fav == 1) {
                    //说明已经收藏了,为取消收藏
                    let ajaxdata = {
                        id: id,
                        uid: this.uid,
                        order:flowNum,
                        is_fav:fav
                    }
                    this.$store.dispatch('cancelCollectPhoto', ajaxdata)
                } else {
                    //未知异常
                    console.log('collect 接口异常')
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
        showPhotoModal(item, index) {
            this.photoModal = item;
            this.orderNum = index;
            this.show = true;
            const ajaxdata = {
                id: this.photoModal.id
            }
            this.$store.dispatch('qryViewPhoto', ajaxdata)
        },
        loadPhoto() {
            let data = {
                page: this.page
            }
            this.$store.dispatch('qryPhotoFlow', data)
        },
        loadMore() {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const allHeight = document.body.scrollHeight;
            const pageHeight = document.documentElement.clientHeight;
            if (scrollTop == allHeight - pageHeight && this.getPhotoStatus == 0) {
                this.page++
                this.loadPhoto();
            }
        }
    },
    watch: {
        getUser() {
            this.style = this.getUser.category.style
            this.stores = this.getUser.category.stores
        }
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.loadMore);
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.user-info {
    position: relative;
    top: 0;
    left: 0;
    .Profile {
        position: relative;
        top: 50px;
        width: 290px;
        height: auto;
        background: #ffffff;
        z-index: 9;
    }
}

.user-water {
    position: relative;
    top: 5px;
    margin-bottom: 20px;
    left: 10px;
    overflow: hidden;
}

.user-nike {
    position: relative;
    background: #fff;
    p {
        position: relative;
        left: 18px;
        top: 10px;
        color: #4c4c4c;
        font-size: 22px;
        line-height: 27.28px;
    }
    label {
        position: relative;
        left: 18px;
        top: 10px;
        display: block;
        color: #b2b2b2;
        font-size: 14px;
        line-height: 27.28px;
    }
}

.user-head {
    position: relative;
    top: -45px;
    left: 5px;
    z-index: 9;
}

.user_category {
    position: relative;
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
</style>
