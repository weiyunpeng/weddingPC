<template>
  <div class="page-index">
    <com-header></com-header>
    <div class="banner">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide class="photo_fl fl" v-for="(item,index) in getIndexPhoto.bannner" v-bind:key="index">
            <router-link class="imgdiv"  :style="{backgroundImage: 'url(' + item.img + ')'}" :to="{ name: 'bottompage', params: {id: item.id, type: 1}}" target="_blank">
            </router-link>
          <div class="p-wrapper">
            <p>
              <span>{{item.style}}</span>{{item.nickname}}拍摄于<router-link :to="{ name: 'storeDetails', params: {busId:item.storeId}}" target="_blank">{{item.storeName}}</router-link>
              <span v-if="item.shootTime">{{item.shootTime}}</span>
            </p>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination">
          <ul>
            <li v-for="(item,index) in getIndexPhoto.bannner" @click="dotbtn(index)" v-bind:class="{cur: selected == index}">
              <img :src="item.thumbnail" width="110" height="80">
            </li>
          </ul>
        </div>
      </swiper>
    </div>
    <div class="tips">
      <h2>
        婚纱照筹备小贴士
        <span></span>
      </h2>
      <ul>
          <li class="li-big">
            <router-link to="/user" class="nav_a base-color" active-class="nav_active">
              <dl>
                <dt class="dt-fg"></dt>
                <dd>
                  <h4>选择婚纱照风格</h4>
                  <p>找你喜欢</p>
                </dd>
              </dl>
            </router-link>
          </li>
        <li class="li-small"></li>
        <a href="" target="_blank">
          <li class="li-big">
            <router-link to="/guide" class="nav_a base-color" active-class="nav_active">
              <dl>
                <dt class="dt-gl"></dt>
                <dd>
                  <h4>学攻略看门道</h4>
                  <p>去学习</p>
                </dd>
              </dl>
            </router-link>
          </li>
        </a>
        <li class="li-small"></li>
        <a href="" target="_blank">
          <li class="li-big">
            <router-link :to="{ name: 'comment', query: { bus: 1 }}" class="nav_a" active-class="nav_active">
              <dl>
                <dt class="dt-sj"></dt>
                <dd>
                  <h4>选择靠谱商家</h4>
                  <p>去选择</p>
                </dd>
              </dl>
            </router-link>
          </li>
        </a>
      </ul>
    </div>
    <div class="wrapper">
      <div class="wrapper-con" style="overflow:hidden;">
        <div class="wrapper_left fl">
          <div class="wrapper-tit">婚纱照拍摄点评
            <span class="span-text">{{getPage.totalCount}}篇</span>
            <span class="span-bt"></span>
          </div>
          <ul class="wrapper-details">
            <li class="section" v-for="(item,index) in getCommentList" v-bind:key="index">
              <div class="section-tit">
                <a :href="item.url" target="_blank">{{item.title}}</a>
              </div>
              <p>{{item.comment}}</p>
              <ul class="thisimg-ct" v-show="item.imgs!=0">
                <li v-for="img in item.imgs">
                    <router-link class="imgdiv img-hover" :to="{ name: 'bottompage', params: {id: item.sampleId, type: 1}}" target="_blank">
                        <img :src="img">
                    </router-link>
                </li>
              </ul>
              <div class="section-bottom">
                <div class="business fl">
                  拍摄商家：
                  <router-link :to="{ name: 'storeDetails', params: {busId:item.storeId}}" target="_blank">
                    {{item.storeName}}
                  </router-link>&nbsp;
                  <span v-if="item.shootTime">拍摄时间：{{item.shootTime}}</span>
                </div>
                <div class="seenumber fr">
                  {{item.views}}看过 &nbsp;{{item.replies}}
                  <i class="pl-icon"></i>
                </div>
              </div>
            </li>
          </ul>
          <com-paging :pageInfo="pageInfo" @change="pagechange" @skip="skip"></com-paging>
        </div>
        <div class="wrapper_right fr">
          <div class="wrapper-tit">拍摄攻略
            <span class="span-text">{{getIndexPhoto.guide_count}}篇</span>
            <span class="span-bt"></span>
          </div>
          <ul>
            <li v-for="(item,index) in getIndexPhoto.guide" v-bind:key="index">
              <h4>
                <a class="golve" :href="item.url" target="_blank">{{item.title}}</a>
              </h4>
              <div class="guide-bottom">
                <span class="fr"> {{item.views}}看过 &nbsp;{{item.replies}}
                  <i class="pl-icon"></i>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import header from './../components/header';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { mapGetters, mapActions } from 'vuex';
import paging from './../components/paging';
export default {
    computed: {
        ...mapGetters({
            getIndexPhoto: 'getIndexPhoto',
            getCommentList: 'getCommentList',
            getPage: 'getCommentPage'
        }),
        ...mapActions({
            qryIndex: 'qryIndex',
            qryComment: 'qryComment'
        }),
        swiper: {
            get: function() {
                return this.$refs.mySwiper.swiper;
            },
            set: function() {}
        }
    },
    components: {
        comHeader: header,
        swiper: swiper,
        swiperSlide: swiperSlide,
        comPaging: paging
    },
    data() {
        let self = this;
        return {
            selected: 0,
            loadshow: true,
            swiperOption: {
                notNextTick: true,
                setWrapperSize: true,
                slidesPerView: 1,
                initialSlide: 1,
                mousewheelControl: false,
                observeParents: true,
                paginationType: 'custom',
                autoplayDisableOnInteraction: false,
                preloadImages: false,
                lazyLoading: true,
                autoplay: 3000,
                speed: 800,
                loop: true,
                effects: 'slide',
                onTransitionStart(swiper) {
                    self.selected = swiper.realIndex;
                }
            },
            pageInfo: {
                total: 0, // 记录总条数
                current: 1, // 当前页数，
                pagenum: 20, // 每页显示条数
                pagegroup: 6, // 分页器每次展示出的条数
                position: {
                    x: 0,
                    y: 920
                }, //页面跳转的位置
                skin: '#fc82b8' // 选中页码的颜色主题
            },
            page: 1
        };
    },
    mounted() {
        // this.$store.dispatch('getUserInfo');
        this.$store.dispatch('qryComment', 1);
        this.$store.dispatch('qryIndex');
    },
    methods: {
        pagechange(current) {
            // 页码改变传入新的页码，此处做回调
            this.page = current;
            this.$store.dispatch('qryComment', this.page);
        },
        skip(current) {
            this.page = current;
            this.$store.dispatch('qryComment', this.page);
        },
        dotbtn(index) {
            this.selected = index;
            this.swiper.slideTo(index + 1, 1000, false);
        }
    },

    watch: {
        getPage() {
            this.pageInfo.current = this.getPage.currentPage;
            this.pageInfo.total = this.getPage.totalCount;
            this.pageInfo.pagenum = this.getPage.pageSize;
        }
    },

    beforeDestroy() {}
};
</script>


<style rel="stylesheet/scss" lang="scss">
@import './../assets/css/base.scss';
.page-index {
    background-color: #fcfcfc;
    .banner {
        height: 530px;
        position: relative;
        width: 100%;
        min-width: 1200px;
        // overflow:hidden;
        .swiper-container {
            width: 100%;
            height: 530px;
            .swiper-slide {
                width: 100%;
                height: 100%;
            }
            .swiper-pagination {
                overflow: hidden;
                position: absolute;
                top: 35px;
                left: 50%;
                margin-left: 488px;
                z-index: 666;
                ul li {
                    width: 110px;
                    height: 82px;
                    cursor: pointer;
                    box-sizing: border-box;
                    margin-bottom: 8px;
                    box-shadow: 0px 0px 10px #ddd;
                }
            }
        }
        .photo_fl {
            position: relative;
        }
        .p-wrapper {
            width: 1200px;
            margin: 0 auto;
            position: relative;
            bottom: 32px;
            left: 0;
        }
        .photo_fl p {
            font-size: 14px;
            color: #fff;
            position: absolute;
            right: 0;
            text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
        }
        .photo_fl p span {
            margin-right: 15px;
        }
    }
    .cur {
        border: 1px solid #fff;
    }
    .tips {
        width: 1070px;
        margin: 0 auto;
        overflow: hidden;
        padding-bottom: 50px;
        h2 {
            width: 100%;
            text-align: center;
            color: #333;
            font-size: 24px;
            font-weight: normal;
            position: relative;
            padding-bottom: 10px;
            margin: 40px 0;
            span {
                display: block;
                width: 40px;
                height: 2px;
                background-color: #fe84b9;
                position: absolute;
                left: 50%;
                margin-left: -20px;
                bottom: 0;
            }
        }
        ul li {
            float: left;
            text-align: center;
        }
        ul li.li-big {
            width: 320px;
            box-shadow: 0 1.5px 4px 0 rgba(0, 0, 0, 0.06);
            border-radius: 8px;
            dl {
                display: inline-block;
                padding: 45px 0;
            }
            dt {
                float: left;
                width: 80px;
                height: 80px;
            }
            dt.dt-fg {
                background: url(../../static/images/ic-1.png) 0 0 no-repeat;
            }
            dt.dt-gl {
                background: url(../../static/images/all1.png) -80px 0 no-repeat;
            }
            dt.dt-sj {
                background: url(../../static/images/all1.png) -160px 0 no-repeat;
            }
            dd {
                float: left;
                margin-left: 20px;
                text-align: left;
                h4 {
                    font-size: 18px;
                    color: #333;
                    margin: 16px 0 3px 0;
                }
                p {
                    font-size: 16px;
                    color: #9a9a9a;
                }
            }
        }
        ul li.li-big:hover {
            box-shadow: 0 6px 5px 1px rgba(0, 0, 0, 0.08);
            transition: all 0.5s ease;
        }
        ul li.li-small {
            width: 55px;
            height: 170px;
            background: url(../../static/images/ic_home_jian.png) center center
                no-repeat;
        }
    }
    .wrapper {
        background-color: #ffffff;
        width: 100%;
        .wrapper-con {
            width: 1200px;
            margin: 0 auto;
            padding-top: 30px;
            .wrapper-tit {
                font-size: 24px;
                color: #333;
                position: relative;
                padding-bottom: 15px;
                span.span-bt {
                    width: 40px;
                    height: 2px;
                    background-color: #fe84b9;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                }
                span.span-text {
                    font-size: 14px;
                    color: #b0b0b0;
                }
            }
            .wrapper-details {
                margin-bottom: 30px;
            }
            .wrapper_left {
                width: 800px;
                .section-tit {
                    font-size: 20px;
                    color: #333;
                    margin: 30px 0 0 0;
                    :hover {
                        color: $color-hover;
                    }
                }
                p {
                    font-size: 16px;
                    color: #9a9a9a;
                    margin-top: 20px;
                }
                .section {
                    margin-top: 30px;
                    width: 800px;
                    overflow: hidden;
                    .section-bottom {
                        color: #b0b0b0;
                        font-size: 14px;
                        margin-top: 25px;
                        .business {
                            background: url(../../static/images/sj-icon.png)
                                left center no-repeat;
                            padding-left: 20px;
                        }
                    }
                    .thisimg-ct {
                        overflow: hidden;
                        font-size: 0;
                        width: 810px;
                    }
                    .thisimg-ct li {
                        width: 260px;
                        height: 195px;
                        float: left;
                        margin-right: 10px;
                        font-size: 0;
                        margin-top: 25px;
                    }
                    .thisimg-ct li:last-child {
                        margin-right: 0;
                    }
                    .thisimg-ct li img {
                        width: 260px;
                        height: 195px;
                    }
                }
            }
            .wrapper_right {
                width: 340px;
                ul li {
                    margin-top: 40px;
                    h4 {
                        color: #333;
                        font-size: 16px;
                    }
                    .golve:hover {
                        color: $color-hover;
                    }
                    .guide-bottom {
                        color: #b0b0b0;
                        font-size: 14px;
                    }
                }
            }
            i.pl-icon {
                display: inline-block;
                width: 16px;
                height: 12px;
                background: url(../../static/images/pl-icon.png) left center
                    no-repeat;
            }
        }
    }
    .imgdiv {
        display: block;
        width: 100%;
        height: 100%;
        background-position: top center;
        background-repeat: no-repeat;
    }
}
</style>














