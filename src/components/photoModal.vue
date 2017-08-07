<template>
    <transition name="photo_modal">
        <div class="photo_modal text-center" v-show="value && loading">
            <div class="photo_modal_dialog panel text-left">
                <img @click="close" class="close_btn" src="/static/images/icon-no-btn.png">
    
                <div class="arrows">
                    <a class="prev arrow dresser_prev" href="javascrript:void(0)"></a>
                    <a class="next arrow dresser_next" href="javascrript:void(0)"></a>
                </div>
                <div class="photo_fl fl">
                    <swiper :options="swiperOption" ref="mySwiper">
                        <swiper-slide class="photo_fl fl" v-for="(item,i) in getViewPhoto" v-bind:key="i">
                            <img v-lazy="item.img" width="800" height="475">
                            <span class="pg_like" @click="photoLikeBtn(item.id,index)">
                                <i class="iconfont icon-like"></i>
                                {{item.fav_num}}
                            </span>
                        </swiper-slide>
                        <div class="swiper-button-prev" slot="button-prev"></div>
                        <div class="swiper-button-next" slot="button-next"></div>
                    </swiper>
                    <p>aaaaaaa</p>
                </div>
    
                <div class="photo_fr fr">
                    <p class="pg_name">TA的套系</p>
                    <waterfall :line-gap="150" :min-line-gap="10" :max-line-gap="150" :single-max-width="10" :watch="getViewPhoto">
                        <waterfall-slot v-for="(item, index) in getViewPhoto" :width="150" :height="item.height" :order="index" :key="item.index" move-class="photo_move">
                            <img :src="item.img">
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
            loading: false,
            swiperOption: {
                notNextTick: true,
                setWrapperSize: false,
                slidesPerView: 1,
                paginationClickable: false,
                mousewheelControl: true,
                observeParents: true,
                prevButton: '.swiper-button-prev',
                nextButton: '.swiper-button-next',
                onTransitionStart(swiper) {
                    console.log(swiper)
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
            getViewPhoto: 'getViewPhoto'
        }),
        ...mapActions({
        }),
        swiper() {
            return this.$refs.mySwiper.swiper
        }
    },
    mounted() {
        console.log("每次切换都会触发我");
        this.swiper.slideTo(3, 1000, false)
    },
    methods: {
        close() {
            this.loading = false;
            this.$emit('input', false);
        },
        photoLikeBtn(pid, index) {
            this.$store.dispatch('photoLike', {
                pid: pid,
                index: index
            });
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
        getViewPhoto() {
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
    height: 550px;
    border-radius: 15px;
    max-width: 1200px;
    min-width: 400px;
    display: inline-block;
    margin: 75px auto;
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
    width: 300px;
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
    position: relative
}

.pg_like {
    position: relative;
    right: 44px;
    color: #999999;
    font-size: 14px;
    line-height: 28px;
}
</style>
