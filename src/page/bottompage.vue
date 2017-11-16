<template>
  <div>
    <com-header></com-header>
    <div class="bread-nav">
      <router-link :to="{ name: 'user'}" target="_blank">
        婚纱照 >
      </router-link>
      <router-link :to="{ name: '', query: {}}">
        {{photoInfo.sampleName}}
      </router-link>
    </div>
    <div class="bottompage text-center">
      <div class="photo_modal_dialog panel text-left">
        <div class="photo_fl fl swiper-ct">
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide class="photo_fl fl" v-for="(item,flowNum) in getViewPhoto" v-bind:key="flowNum">
              <div class="imgcrop">
                <img :src="swiimg.img" height="475">
              </div>
              
              <div class="modal-details">
                <div v-if="isCase" class="pg_like" @click="photoLikeBtn(swiimg, flowNum)">
                    <i v-if="swiimg.is_fav" class="icon_like_act2"></i>
                    <i v-if="!swiimg.is_fav" class="icon_like2"></i>
                    <!-- {{photoInfo.fav_num}} -->
                </div>
                <div class="modal-details-top">
                  <span class="stylespan" v-for="info in swiimg.tag" :key="info.id">{{info}}</span>
                </div>
                <label style="display:block;">
                  <span v-show="photoInfo.time">{{photoInfo.time}}</span>
                  <span v-show="photoInfo.nickname">{{photoInfo.nickname}}</span>
                  拍摄于
                  <router-link class="storea" :to="{ name: 'storeDetails', query: {busId:photoInfo.storeId}}" target="_blank">
                    {{photoInfo.storeName}}
                  </router-link>
                  <a class="fr" v-if="photoInfo.comment_url" :href="photoInfo.comment_url" target="_blank">TA的拍摄历程></a>
                </label>
              </div>
            </swiper-slide>
          </swiper>
            <div class="swiper-button-prev" slot="button-prev" @click="changeWaterPrev()">
                <img src="/static/images/ic_jian_z.png">
            </div>
            <div class="swiper-button-next" slot="button-next" @click="changeWaterNext()">
                <img src="/static/images/ic_jian_y.png">
            </div>

        </div>
        <div class="photo_fr fr">
          <div class="photo_fr_ct">
            <p class="pg_name">TA的套系</p>
            <waterfall :line-gap="200" :min-line-gap="140" :max-line-gap="140" :single-max-width="140" :watch="getViewPhoto">
              <waterfall-slot v-for="(item, index) in getViewPhoto" :width="item.width" :height="item.height" :order="index" :key="item.index"
                move-class="photo_move">
                <img v-lazy="item.thumb" class="water_img" v-bind:class="{cur: selected == index}" @click="changeSwiper(item,index)">
              </waterfall-slot>
            </waterfall>
          </div>
        </div>
      </div>
    </div>
    <com-modal @modalCallback="modalCallback"></com-modal>
  </div>
</template>


<script>
import header from './../components/user/userHead';
import modal from './../components/modal';
import { waterfall, waterfallSlot } from 'vue-waterfall';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
        comHeader: header,
        waterfall: waterfall,
        waterfallSlot: waterfallSlot,
        swiper: swiper,
        swiperSlide: swiperSlide,
        comModal: modal
    },
    data() {
        let self = this;
        return {
            id: this.$route.query.id,
            type: this.$route.query.type,
            loadshow: true,
            selected: 0,
            loading: false,
            photoInfo: {},
            isCase: true,
            swiperOption: {
                notNextTick: true,
                setWrapperSize: false,
                slidesPerView: 1,
                paginationClickable: false,
                mousewheelControl: false,
                observeParents: true,
                prevButton: '.swiper-button-prev',
                nextButton: '.swiper-button-next',
                preloadImages: false,
                lazyLoading: true,
                onTransitionStart(swiper) {
                    self.selected = swiper.realIndex;
                    self.swiimg = self.getViewPhoto[self.selected]
                }
            },
            swiimg:''
        };
    },
    computed: {
        ...mapGetters({
            getViewPhoto: 'getViewPhoto',
            getViewPhotoInfo: 'getViewPhotoInfo',
        }),
        ...mapActions({
            showModal: 'showModal'
        }),
        swiper: {
            get: function() {
                return this.$refs.mySwiper.swiper;
            },
            set: function() {}
        }
    },
    mounted() {
        this.$store.dispatch('hidePhotoModal');
        this.$nextTick(function() {
            const ajaxdata = {
                id: this.id,
                type: this.type
            };
            this.$store.dispatch('qryViewPhoto', ajaxdata);
            this.swiper.slideTo(0, 1000, false);
        });
    },
    methods: {
        changeSwiper(item, index) {
            this.selected = index;
            this.swiimg = this.getViewPhoto[index]
            this.swiper.slideTo(index, 1000, false);
        },
        changeWaterPrev() {
            this.swiimg = this.getViewPhoto[this.selected-1]
            this.selected = this.swiper.realIndex - 1;
        },
        changeWaterNext() {
            this.swiimg = this.getViewPhoto[this.selected+1]
            this.selected = this.swiper.realIndex + 1;
        },
        modalCallback(val) {
            if (val) {
                //说明点击确认
                window.location.href = '/login';
            }
        },
        photoLikeBtn(fav, flowNum) {
            try {
                let token = JSON.parse(localStorage.getItem('user'));
                let isLogin = Boolean(token);
                if (token) {
                    fav["index"] = flowNum
                    if (!fav.is_fav) {
                        //说明未收藏，可以收藏
                        this.$store.dispatch('collectPhoto', fav);
                    } else {
                        //说明已经收藏了,为取消收藏
                        this.$store.dispatch('cancelCollectPhoto', fav);
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
            } catch (e) {
                console.log(e);
            }
        }
    },
    watch: {
        value() {
            if (this.value) {
                const self = this;
                const tempImage = new Image();
                tempImage.onload = function() {
                    self.loading = true;
                };
                tempImage.onerror = function() {};
                tempImage.src = self.photoModal.img;
            }
        },
        getViewPhotoInfo() {
            if (this.getViewPhotoInfo) {
                this.photoInfo = this.getViewPhotoInfo;
            }
        },
        getViewPhoto() {
            this.swiimg = this.getViewPhoto[this.selected]
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import './../assets/css/base.scss';
.bottompage {
    overflow: hidden;
    height: 100%;
    width: 100%;
    margin-bottom: 100px;
    position: relative;
    .imgcrop {
        width: 760px;
        overflow: hidden;
        margin: auto;
    }
    .loadingmask {
        position: absolute;
        width: 1170px;
        height: 550px;
        left: 0;
        top: 10px;
        z-index: 12345;
        background: url(/static/images/loading.gif) center center no-repeat
            rgba(255, 255, 255, 0);
    }
    .photo_modal_dialog {
        padding: 15px;
        width: 1200px;
        border-radius: 15px;
        display: inline-block;
        transition: all 0.3s ease;
        position: relative;
        height: 650px;
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
        height: 530px;
        overflow-x: hidden;
        background-color: #fff;
        padding: 10px 0 0 15px;
        ::-webkit-scrollbar-track {
            border-radius: 2px;
            background-color: #ffffff;
        }

        ::-webkit-scrollbar {
            width: 10px;
            border-radius: 10px;
            background-color: #ffffff;
        }

        ::-webkit-scrollbar-thumb {
            border-radius: 2px;
            background-color: #b0b0b0;
        }
    }
    .photo_fr_ct {
        width: 310px;
        height: 500px;
        overflow-x: hidden;
        background-color: #fff;
        padding: 0 10px 0 0;
    }
    .pg_name {
        font-size: 16px;
        color: #4c4c4c;
        line-height: 28px;
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
    .photo_fl {
        width: 800px;
        height: auto;
        position: relative;
        text-align: center;
    }
    .modal-details-top {
        position: relative;
    }
    .pg_like {
        cursor: pointer;
        position: relative;
        float: right;
        right: 0px;
        bottom: 5px;
        color: #999999;
        font-size: 14px;
        height: 30px;
        width: 30px;
        z-index: 9999;
    }
    .icon_like {
        top: 7px;
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
        padding: 0px 20px;
        text-align: left;
        color: #808080;
        font-size: 14px;
        a {
            margin-left: 5px;
            color: #236dd3;
        }
        a:hover {
            text-decoration: underline;
            color: $color-hover;
        }
    }
    .swiper-button-prev {
        width: 80px;
        height: 80px;
        position: fixed;
        left: 25px;
        top: 400px;
        background: none;
        cursor: pointer;
    }
    .swiper-button-next {
        width: 80px;
        height: 80px;
        position: fixed;
        right: 25px;
        top: 400px;
        background: none;
        cursor: pointer;
    }
    .swiper-button-disabled {
        opacity: 0.5;
        filter: alpha(opacity=50);
        -webkit-opacity: 0.5;
        -o-opacity: 0.5;
        -moz-opacity: 0.5;
    }
    .swiper-container {
        margin-left: auto;
        margin-right: auto;
        position: relative;
        z-index: 1;
    }
    .swiper-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 1;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        transition-property: transform;
        box-sizing: content-box;
    }
    .swiper-slide {
        -webkit-flex-shrink: 0;
        -ms-flex: 0 0 auto;
        flex-shrink: 0;
        width: 100%;
        height: 100%;
        position: relative;
    }
    .swiper-ct {
        background-color: #fff;
        padding: 60px 2px 20px 2px;
    }
    .modal-details-top {
        height: 40px;
        margin-top: 20px;
        .stylespan {
            display: inline-block;
            padding: 2px 10px;
            border-radius: 5px;
            background-color: #f2f5f8;
            font-size: 14px;
            color: #a0a1ba;
        }
    }
}
.stylespan {
    margin-right: 8px;
}
.bread-nav {
    width: 1200px;
    margin: 40px auto 0;
    padding: 0 15px;
    color: #a0a1ba;
    font-size: 14px;
}
.bread-nav a {
    color: #a0a1ba;
    font-size: 14px;
}
.storea {
    color: $color-normal !important;
}
.storea:hover {
    color: $color-hover !important;
    text-decoration: underline;
}
</style>
