<template>
    <div>
        <div class="i-header" :style="{background:'url('+banner+') left center no-repeat', borderBottom:skinBorder}">
            <img class="logo zoomIn" v-lazy="logo">
            <div class="header-con">
                <a href="http://dev.hunjia.qqdayu.com/login"><img class="user" src="/static/images/user_icon.png"></a>
                <ul class="zoomIn">
                    <li class="flipInY">
                        <router-link :to="{ name: '', query: {}}" target="_blank">
                            <img v-lazy="test" width="390" height="390">
                        </router-link>
                    </li>
                    <li class="flipInY">
                        <img v-lazy="test" width="390" height="390">
                    </li>
                    <li class="flipInY">
                        <img v-lazy="test" width="390" height="390">
                    </li>
                </ul>
            </div>
        </div>
        <div class="container">
            <div class="hot-wedding">
                <img class="tit" src="/static/images/hot_hs_head.png">
                <router-link :to="{ name: '', query: {}}" class="more_a fr" target="_blank">
                    查看更多>
                </router-link>
            </div>
            <waterfall :line-gap="291" :min-line-gap="320" :max-line-gap="640" :single-max-width="640" :watch="getPhotoList.list">
                <waterfall-slot v-for="(item, index) in getPhotoList.list" :width="291" :height="item.height" :order="index" :key="item.index" move-class="photo_move">
                    <div class="panel photo_box hover_sh">
                        <!-- <div class="photo_box_top">
                                        <span class="photo_like" @click="photoLikeBtn(item._id,index)"><i class="iconfont icon-like"></i> {{item.likeCount}}</span>
                                    </div> -->
                        <img :src="item.img" @click="showPhotoModal(item, index)">
                        <div class="photo_info">
                            <span class="photo_like" @click="photoLikeBtn(item.id,index)">
                                <i class="iconfont icon-like"></i> {{item.fav_num}}
                            </span>
                            <ul>
                                <li v-for="(tag,t) in item.tag" :key="t">{{tag}}</li>
                            </ul>
                        </div>
    
                    </div>
                </waterfall-slot>
            </waterfall>
        </div>
        <com-photoModal v-model="show" :value="show" :photoModal="photoModal" :index="index">
        </com-photoModal>
    </div>
</template>

<script>
import { waterfall, waterfallSlot } from 'vue-waterfall'
import photoModal from './../components/photoModal'
import { mapGetters, mapActions } from 'vuex'
export default {
    components: {
        'waterfall': waterfall,
        'waterfallSlot': waterfallSlot,
        'comPhotoModal': photoModal
    },
    computed: {
        ...mapGetters({
            getPhotoList: 'getPhotoList'
        }),
        ...mapActions({
            qryIndex: 'qryIndex',
            qryViewPhoto: 'qryViewPhoto'
        })
    },
    data() {
        return {
            show: false,
            photoModal: {},
            index: null,
            banner: '/static/images/unlogin_bg.jpg',
            skinBorder: '20px solid #f2f2f2',
            logo: '/static/images/logo-3.png',
            test: '/static/images/demo_01.jpg'
        }
    },
    mounted() {
        this.$store.dispatch('qryIndex')
    },
    methods: {
        photoLikeBtn() {
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
    },
    beforeDestroy() {
    }
}
</script>


<style rel="stylesheet/scss" lang="scss">
.i-header {
    width: 100%;
    height: 715px;
    position: relative;
    top: 0;
    z-index: 3;
    background-size: 100%;
    text-align: center;
    .logo {
        position: relative;
        top: 80px;
    }
    .header-con {
        width: 1200px;
        height: auto;
        position: relative;
        margin: 0 auto;
        .user {
            position: absolute;
            right: 0;
            top: 100px;
        }
        ul {
            width: 100%;
            position: relative;
            top: 163px;
            li {
                display: inline-block;
                margin-right: 8px;
            }
            li:last-child {
                margin-right: 0;
            }
            li:hover {
                -webkit-box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.4);
                -moz-box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.4);
                box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.4);
                -webkit-transition: all .5s ease;
                transition: all .5s ease;
            }
        }
    }
}

.hot-wedding {
    width: 1200px;
    text-align: center;
    .tit {
        height: 42px;
        margin-bottom: 20px;
        margin-top: 20px;
    }
    .more_a {
        color: #ff516d;
        font-size: 14px;
        margin-right: 30px;
        margin-top: 23px;
    }
}

.photo_info {
    position: relative;
    height: 32px;
    line-height: 32px;
    color: #b3b3b3;
    font-size: 14px;
    .photo_like {
        position: relative;
        left: 12px;
    }
    ul{
        position: relative;
        right: 8px;
        float: right;
    }
}

@mixin animation($animation) {
    animation: $animation;
    -webkit-animation: $animation;
}

.flipInY {
    @include animation(1s flipInY 1);
}
</style>
