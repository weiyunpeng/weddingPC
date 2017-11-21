<template>
    <transition name="swiper_modal">
        <div class="swiper2_modal text-center">
            <div class="swiper_modal_dialog panel">
                <img @click="close" class="close_btn" src="/static/images/icon-close-hover.png">
                <swiper :options="swiperOption" ref="mySwiper">
                    <swiper-slide class="photo_fl fl" v-for="(img,index) in swiperImgs" v-bind:key="index">
                        <img :src="img" height="475">
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
                </swiper>
            </div>
        </div>
    </transition>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
    components: {
        swiper,
        swiperSlide
    },
    data() {
        return {
            photoInfo: {},
            swiperOption: {
                notNextTick: true,
                pagination: '.swiper-pagination',
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
                    this.index = swiper.realIndex;
                }
            }
        };
    },
    props: {
        swiperImgs: {
            type: Array,
            default: []
        },
        swiperIndex:0
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper;
        }
    },
    mounted() {
    },
    methods: {
        close() {
            this.$emit('closeSwiper');
        }
    },
    watch: {
        swiperIndex() {
            this.swiper.slideTo(this.swiperIndex, 0, false);
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.swiper2_modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    overflow: hidden;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    transition: opacity 0.3s ease;

    .swiper_modal_dialog {
        position: fixed;
        background: transparent;
        width: 1200px;
        height: 480px;
        border-radius: 15px;
        display: inline-block;
        top: 50%;
        margin-top: -240px;
        left: 50%;
        margin-left: -600px;
        padding: 15px;
        background: #fff;
        transition: all 0.3s ease;
    }
    .swiper_modal_dialog .panel_body {
        cursor: zoom-out;
    }

    .swiper_modal_dialog img {
        max-height: 450px;
    }

    .swiper_modal-enter {
        opacity: 0;
    }

    .swiper_modal-leave-active {
        opacity: 0;
    }

    .swiper_modal-enter .swiper_modal_dialog,
    .swiper_modal-leave-active .swiper_modal_dialog {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
    .close_btn {
        position: absolute;
        z-index: 9999;
        top: 7px;
        right: 7px;
        cursor: pointer;
        filter: alpha(Opacity=50);
        -moz-opacity: 0.5;
        opacity: 0.5;
    }
    .close_btn:hover {
        transform: rotate(390deg);
        -ms-transform: rotate(390deg); /* IE 9 */
        -moz-transform: rotate(390deg); /* Firefox */
        -webkit-transform: rotate(390deg); /* Safari 和 Chrome */
        -o-transform: rotate(390deg); /* Opera */
        filter: alpha(Opacity=100);
        -moz-opacity: 1;
        opacity: 1;
        transition: all 0.6s ease;
        -webkit-transition: all 0.6s ease;
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
}
</style>
