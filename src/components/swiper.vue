<template>
    <transition name="swiper_modal">
        <div class="swiper_modal text-center">
            <div class="swiper_modal_dialog panel">
                <img @click="close" class="close_btn2" src="/static/images/icon-no-btn.png">
                <swiper :options="swiperOption" ref="mySwiper">
                    <swiper-slide class="photo_fl fl" v-for="(img,index) in swiperImgs" v-bind:key="index">
                        <img :src="img" width="900" height="475">
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
import { swiper, swiperSlide } from 'vue-awesome-swiper'

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
                    this.index = swiper.realIndex
                }
            },
        }
    },
    props: {
        swiperImgs: {
            type: Array,
            default: []
        }
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper
        }
    },
    mounted() {
        this.swiper.slideTo(0, 1000, false)
    },
    methods: {
        close() {
            this.$emit('closeSwiper');
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
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.swiper_modal {
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

.swiper_modal_dialog {
    position: relative;
    background: transparent;
    width: 1200px;
    height: auto;
    border-radius: 15px;
    display: inline-block;
    top: 20%;
    padding: 15px;
    background: #fff;
    transition: all .3s ease;
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
.close_btn2 {
    position: absolute;
    top: -63px;
    right: 0;
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
</style>
