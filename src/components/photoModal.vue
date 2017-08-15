<template>
    <transition name="photo_modal">
        <div class="photo_modal text-center" v-show="value && loading">
            <div class="photo_modal_dialog panel text-left">
                <img @click="close" class="close_btn" src="/static/images/icon-no-btn.png">
                <div class="photo_fl fl">
                    <swiper :options="swiperOption" ref="mySwiper">
                        <swiper-slide class="photo_fl fl" v-for="(item,flowNum) in getViewPhoto" v-bind:key="flowNum">
                            <img :src="item.img" height="475">
                            <span class="pg_like" @click="photoLikeBtn(item.id,item.is_fav,flowNum)">
                                <i v-if="item.is_fav" class="icon_like_act"></i>
                                <i v-if="!item.is_fav" class="icon_like"></i>
                                {{item.fav_num}}
                            </span>
                        </swiper-slide>
                        <div class="swiper-button-prev" slot="button-prev" @click="changeWaterfall()"></div>
                        <div class="swiper-button-next" slot="button-next" @click="changeWaterfall()"></div>
                    </swiper>
                    <div class="modal-details">
                        <span>{{photoInfo.time}}</span>
                        <label>{{photoInfo.comment}}</label>
                        <a v-if="photoInfo.comment_url" :href="photoInfo.comment_url" target="_blank">TA的拍摄历程>>></a>
                    </div>
                </div>
    
                <div class="photo_fr fr">
                    <p class="pg_name">TA的套系</p>
                    <waterfall :line-gap="200" :min-line-gap="140" :max-line-gap="140" :single-max-width="140" :watch="getViewPhoto">
                        <waterfall-slot v-for="(item, index) in getViewPhoto" :width="item.width" :height="item.height" :order="index" :key="item.index" move-class="photo_move">
                            <img :src="item.img" class="water_img" v-bind:class="{cur: selected == index}" @click="changeSwiper(item,index)">
                        </waterfall-slot>
                    </waterfall>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { waterfall, waterfallSlot } from 'vue-waterfall'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        'waterfall': waterfall,
        'waterfallSlot': waterfallSlot,
        swiper,
        swiperSlide
    },
    data() {
        return {
            selected: 0,
            loading: false,
            photoInfo:{},
            swiperOption: {
                notNextTick: true,
                setWrapperSize: false,
                slidesPerView: 1,
                paginationClickable: false,
                mousewheelControl: true,
                observeParents: true,
                prevButton: '.swiper-button-prev',
                nextButton: '.swiper-button-next',
                // Disable preloading of all images
                preloadImages: false,
                // Enable lazy loading
                lazyLoading: true,
                onTransitionStart(swiper) {
                    this.index = swiper.realIndex
                }
            },
        }
    },
    props: {
        value: {
            'default': true
        },
        photoModal: {
            type: Object,
            'default': null
        },
        index: {
            type: Number,
            'default': null
        }
    },
    computed: {
        ...mapGetters({
            getViewPhoto: 'getViewPhoto',
            getViewPhotoInfo: 'getViewPhotoInfo'
        }),
        ...mapActions({
            showModal: 'showModal',
        }),
        swiper() {
            return this.$refs.mySwiper.swiper
        }
    },
    mounted() {
        this.swiper.slideTo(0, 1000, false)
    },
    methods: {
        close() {
            this.loading = false;
            this.$emit('input', false);
        },
        changeSwiper(item, index) {
            this.selected = index
            this.swiper.slideTo(index, 1000, false)
        },
        changeWaterfall(){
            this.selected = this.swiper.realIndex+1
        },
        photoLikeBtn(id, fav, flowNum) {
            let token = JSON.parse(localStorage.getItem('user'));
            let isLogin = Boolean(token);
            if (isLogin) {
                let obj = this.getViewPhoto[flowNum]
                obj.is_fav = !obj.is_fav
                this.$set(this.getViewPhoto, flowNum, obj);
                if (fav == 0) {
                    //说明未收藏，可以收藏
                    let ajaxdata = {
                        id: id,
                        uid: this.uid
                    }
                    this.$store.dispatch('collectPhoto', ajaxdata)
                } else if (fav == 1) {
                    //说明已经收藏了,为取消收藏
                    let ajaxdata = {
                        id: id,
                        uid: this.uid
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
                this.$store.dispatch('showModal',data);
            }
        },
        swiper(a){
            console.log(a)
        }
    },
    watch: {
        value() {
            if (this.value) {
                const self = this;
                const tempImage = new Image();
                tempImage.onload = function () {
                    self.loading = true;
                };
                tempImage.onerror = function () {
                    self.close();
                };
                tempImage.src = self.photoModal.img;
            }
        },
        getViewPhotoInfo() {
            this.photoInfo = this.getViewPhotoInfo
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.photo_modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    overflow: hidden;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, .5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    transition: opacity .3s ease;
}

.photo_modal_dialog {
    position: relative;
    background: #fff;
    width: 1200px;
    height: auto;
    border-radius: 15px;
    max-width: 1200px;
    min-width: 400px;
    display: inline-block;
    top: 15%;
    padding: 15px;
    transition: all .3s ease;
}

.photo_modal_dialog .panel_body {
    cursor: zoom-out;
}

.photo_modal_dialog img {
    max-height: 450px;
}

.photo_modal-enter {
    opacity: 0;
}

.photo_modal-leave-active {
    opacity: 0;
}

.photo_modal-enter .photo_modal_dialog,
.photo_modal-leave-active .photo_modal_dialog {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

.photo_fr {
    width: 320px;
    height: 500px;
    overflow-x: hidden;
}

.pg_name {
    font-size: 16px;
    color: #4c4c4c;
    line-height: 28px;
}

.close_btn {
    position: absolute;
    top: -63px;
    right: 0;
}

.photo_fl {
    width: 800px;
    height: auto;
    position: relative;
    text-align: center;
}

.pg_like {
    position: absolute;
    right: 16px;
    bottom: 2px;
    color: #999999;
    font-size: 14px;
    line-height: 28px;
}

.water_img {
    padding-right: 10px;
    filter: alpha(Opacity=80);
    -moz-opacity: 0.5;
    opacity: 0.5;
}

.cur {
    filter: alpha(Opacity=100);
    -moz-opacity: 1;
    opacity: 1;
}

.modal-details {
    color: #808080;
    font-size: 14px;
    line-height: 27.28px;
    a{
        color: #236dd3;
    }
    a:hover{
        text-decoration: underline;
        color: #ff506d;
    }
}
</style>
