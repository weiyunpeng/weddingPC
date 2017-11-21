<template>
  <div class="page-shopDetails">
    <!--百度地图  start-->
    <div class="bm-view" v-show="isMap">
      <div class="bm-bg" :class="{ zoomIn: isMap }">
        <img @click="closeMap" class="close_btn" src="/static/images/icon-close-hover.png">
        <h3>{{mediaInfo.name}}</h3>
        <p>地址：{{mediaInfo.address}}</p>
        <baidu-map class="map" :center="{lng: lng, lat: lat}" :zoom="15">
          <!-- <bm-marker :position="{lng: lng, lat: lat}" :dragging="true"></bm-marker> -->
          <bm-marker :position="{lng: lng, lat: lat}" animation="BMAP_ANIMATION_BOUNCE" :icon="{url: '/static/images/icon_01.png', size: {width: 300, height: 157}}"></bm-marker>
        </baidu-map>
        <p class="fr">注：地图位置仅供参考，具体情况以实际地址信息为准</p>
      </div>
    </div>
    <!--百度地图  end-->
    <com-header></com-header>
    <div class="container" id="busDetails">
      <div class="bus_introduction clearfix">
        <com-pic :imgs='imgs' :imgnum='4'></com-pic>
        <div class="right_introduction">
          <div class="top">
            <h2>
              {{mediaInfo.name}}
              <i class="icon icon-vip" v-if="mediaInfo.isVip"></i>
              <i class="icon icon-yes" v-if="mediaInfo.isYes"></i>
            </h2>
            <div class="price">
              起拍价
              <span>￥{{mediaInfo.price}}</span>
            </div>
            <div class="address clearfix">
              <label class="fl">地址：{{mediaInfo.address}}</label>
              <div class="map fl" @click="openMap">
                <i class="icon map_icon"></i>查看地图
              </div>
            </div>
            <div class="tags">
              <ul>
                <li v-for="tag in mediaInfo.tags" :key="tag">
                  {{tag}}
                </li>
              </ul>
            </div>
          </div>
          <div class="bottom">
            <div class="clearfix">
              <label class="fl">媒体评定分：</label>
              <div class="media_rating fl">
                <star :score="mediaInfo.star"></star>
              </div>
            </div>
            <div class="clearfix" v-if="mediaInfo.comment">
              <label class="fl">媒体评定语：</label>
              <div class="media_comment fl">
                {{mediaInfo.comment}}
                <a :href="mediaInfo.comment_url" class="comment_url" v-if="mediaInfo.comment_url" target="_blank">[查看详情]</a>
              </div>
            </div>
            <div class="code">
              <a v-on:click="erweima" href="javascript:void(0)">
                咨询喜宝
              </a>
              <img class="erweima" :src="mediaInfo.erwei_img" v-show="isErwei">
            </div>
          </div>
        </div>
      </div>
      <div class="nav">
        <ul>
          <li v-for="(item,i) in nav" :key="i">
            <a href="javascript:void(0)" v-bind:class="{cur: selected == i}" @click="changeTab(i,item)">{{item}}</a>
          </li>
          <li>
            <a v-show="mediaInfo.comment_list_url" :href="mediaInfo.comment_list_url" target="_blank">深度点评</a>
          </li>
        </ul>
      </div>
      <!-- case官方案例开始 -->
      <div class="case" v-show="0 >= selected" v-if="caseInfo">
        <img class="tit" :src="caseInfo.nav_img">
        <div class="more clearfix" v-show="caseInfo.details && caseInfo.details.length>=6">
          <router-link :to="{ name: 'busSample', params: {busId:mediaInfo.id,sampleId:id}}" class="more_a fr" target="_blank">
            更多 >
          </router-link>
        </div>
        <div class="list">
          <ul>
            <li v-for="(item,index) in caseInfo.details" v-bind:key="index">
              <div class="img-hover">
                   <router-link :to="{ name: 'bottompage', params: {id: item.id, type: 1}}" target="_blank">
                        <img v-lazy="item.src" width="374" height="250">
                    </router-link>
              </div>
              <h3>{{item.case_name}}</h3>
              <div class="tags">
                <ul>
                  <li v-for="(tag,index) in item.tags" v-bind:key="index">
                    {{tag}}
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- case官方案例结束 -->
      <!-- 精选套餐开始 -->
      <div class="package" v-show="1 >= selected" v-if="packageInfo">
        <img class="tit" :src="packageInfo.nav_img">
        <div class="more clearfix" v-show="packageInfo.details && packageInfo.details.length>=3">
          <router-link :to="{ name: 'storeList', params: {storeId:mediaInfo.id}}" class="more_a fr" target="_blank">
            更多 >
          </router-link>
        </div>
        <div class="list">
          <ul>
            <li v-for="(item,pIndex) in packageInfo.details" v-bind:key="pIndex">
              <router-link :to="{ name: 'packageDetails', params: {busId:mediaInfo.id,mealId:item.id}}" target="_blank">
                <img v-lazy="item.src" width="374" height="250">
                <div class="top clearfix">
                  <div class="price fl">￥{{item.price}}</div>
                  <div class="tags fr">
                    <ul>
                      <li v-for="(tag,index) in item.tags" v-bind:key="index">
                        {{tag}}
                      </li>
                    </ul>
                  </div>
                </div>
                <h3>{{item.package_name}}</h3>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <!-- 精选套餐结束 -->
      <!-- 摄影团队开始  -->
      <div class="photographer" v-show="2 >= selected" v-if="photographer">
        <img class="tit" :src="photographer.nav_img">
        <div class="arrows" v-show="photographer.details && photographer.details.length>=5">
          <a class="prev arrow photographer_prev" href="javascrript:void(0)"></a>
          <a class="next arrow photographer_next" href="javascrript:void(0)"></a>
        </div>
        <div class="list">
          <swiper :options="photographerOption">
            <swiper-slide class="mr25" v-for="(item,index) in photographer.details" v-bind:key="index">
              <router-link :to="{ name: 'cameraman', params: {busId:mediaInfo.id,cameramanId:item.id}}" target="_blank">
                <img v-lazy="item.src" width="220" height="220">
                <div class="top clearfix">
                  <div class="name fl">{{item.name}}</div>
                  <div class="years fr">
                    <ul>
                      <li>
                        {{item.years}}年
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="special">
                  拍摄特点：{{item.special}}
                </div>
              </router-link>
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <!-- 摄影团队结束  -->
      <!-- 化妆团队开始 -->
      <div class="dresser" v-show="3 >= selected" v-if="dresser">
        <img class="tit" :src="dresser.nav_img">
        <div class="arrows" v-show="dresser.details && dresser.details.length>=5">
          <a class="prev arrow dresser_prev" href="javascrript:void(0)"></a>
          <a class="next arrow dresser_next" href="javascrript:void(0)"></a>
        </div>
        <div class="list">
          <swiper :options="dresserOption">
            <swiper-slide class="mr25" v-for="(item,index) in dresser.details" v-bind:key="index">
              <router-link :to="{ name: 'makeupman', params: {busId:mediaInfo.id,makeupId:item.id}}" target="_blank">
                <img v-lazy="item.src" width="220" height="220">
                <div class="top clearfix">
                  <div class="name fl">{{item.name}}</div>
                  <div class="years fr">
                    <ul>
                      <li>
                        {{item.years}}年
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="special">
                  化妆特点：{{item.special}}
                </div>
              </router-link>
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <!-- 化妆团队结束 -->
      <!-- 商家简介开始 -->
      <div class="business" v-show="4 >= selected" v-if="introInfo">
        <img class="tit" :src="introInfo.nav_img">
        <div class="cont clearfix">
          <div class="left fl">
            <div class="top clearfix">
              <img v-lazy="introInfo.logo" class="fl" width="100" height="100">
              <div class="fl">
                <span>商家简介</span>
                <span class="name">{{introInfo.bus_name}}</span>
              </div>
            </div>
            <div class="bottom" v-html="introInfo.brief">
            </div>
          </div>
          <div class="right fr">
            <div class="star_time item">
              <label>开业时间：</label>
              <span>{{introInfo.star_time}}</span>
            </div>
            <div class="bus_time item">
              <label>营业时间：</label>
              <span>{{introInfo.bus_time}}</span>
            </div>
            <div class="payment item">
              <label>付款方式：</label>
              <span>{{introInfo.payment}}</span>
            </div>
            <div class="feature clearfix item">
              <label class="fl">服务特色：</label>
              <span class="fl">
                <ul>
                  <li v-for="(item,index) in introInfo.features" :key="index">{{item}}</li>
                </ul>
              </span>
            </div>
          </div>
        </div>
        <div class="environment">
          <div class="subtit">门店环境</div>
          <swiper :options="environmentOption">
            <swiper-slide class="mr25 fl" v-for="(item,index) in introInfo.environment" v-bind:key="index">
              <img v-lazy="item" width="218" height="145" @click="showSwiperModal(introInfo.environment ,index)">
            </swiper-slide>
          </swiper>
          <div class="arrows" v-show="introInfo.environment && introInfo.environment.length>5">
            <a class="prev arrow env_prev" href="javascrript:void(0)"></a>
            <a class="next arrow env_next" href="javascrript:void(0)"></a>
          </div>
        </div>
      </div>
      <!-- 商家简介结束 -->
    </div>
    <com-swiper @closeSwiper="closeSwiper" v-show="showSwiper" :swiperImgs='swiperImgs' :swiperIndex='swiperIndex'></com-swiper>
  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
import header from './../components/header';
import bigImg from './../components/bigImg';
import swiperModel from './../components/swiper';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import star from './../components/star';
export default {
    name: 'carrousel',
    components: {
        comHeader: header,
        comPic: bigImg,
        comSwiper: swiperModel,
        swiper,
        swiperSlide,
        star: star
    },
    data() {
        return {
            id: this.$route.params.busId,
            selected: 0,
            isErwei: false,
            isMap: false,
            imgs: [],
            mediaInfo: '',
            introInfo: '',
            caseInfo: '',
            packageInfo: '',
            photographer: '',
            dresser: '',
            lng: '',
            lat: '',
            showSwiper: false,
            swiperImgs: [],
            shopNavList: [],
            swiperIndex:'',
            nav: ['官方案例', '精选套餐', '摄影师团队', '化妆团队', '商家简介'],
            orderNum: null,
            photographerOption: {
                // autoplay: 3500,
                setWrapperSize: false,
                slidesPerView: 5,
                paginationClickable: false,
                mousewheelControl: false,
                observeParents: true,
                prevButton: '.photographer_prev',
                nextButton: '.photographer_next'
            },
            dresserOption: {
                setWrapperSize: false,
                slidesPerView: 5,
                paginationClickable: false,
                mousewheelControl: false,
                observeParents: true,
                prevButton: '.dresser_prev',
                nextButton: '.dresser_next'
            },
            environmentOption: {
                setWrapperSize: false,
                slidesPerView: 5,
                paginationClickable: false,
                mousewheelControl: false,
                observeParents: true,
                prevButton: '.env_prev',
                nextButton: '.env_next'
            }
        };
    },
    computed: {
        ...mapGetters({
            shopInfo: 'shopInfo',
            shopDetails: 'shopDetails'
        }),
        ...mapActions({
            qryStoreDetails: 'qryStoreDetails'
        })
    },
    mounted() {
        let data = {
            id: this.id
        };
        this.$store.dispatch('qryStoreDetails', data);
    },
    methods: {
        changeTab(i, item) {
            this.selected = i;
            this.navIndex = item;
        },
        erweima() {
            this.isErwei = !this.isErwei;
        },
        openMap() {
            this.isMap = true;
        },
        closeMap() {
            this.isMap = false;
        },
        showSwiperModal(imgs,index) {
            this.showSwiper = true;
            this.swiperImgs = imgs;
            this.swiperIndex = index;
        },
        closeSwiper() {
            this.showSwiper = false;
        }
    },
    watch: {
        shopInfo() {
            if (this.shopInfo) {
                this.imgs = this.shopInfo.media_info.img;
                this.mediaInfo = this.shopInfo.media_info;
                this.introInfo = this.shopInfo.intro_info;
                this.lng = this.shopInfo.media_info.longitude;
                this.lat = this.shopInfo.media_info.latitude;
            }
        },
        shopDetails() {
            if (this.shopDetails) {
                this.caseInfo = this.shopDetails.case;
                this.packageInfo = this.shopDetails.package;
                this.photographer = this.shopDetails.cameraman;
                this.dresser = this.shopDetails.makeup;
            }
        }
    },
    beforeDestroy() {}
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import './../assets/css/base.scss';
.page-shopDetails {
    background: #fff;
    background-color: #fff;
    .bus_introduction {
        margin: {
            top: 40px;
        }
        .right_introduction {
            float: right;
            width: 594px;
            .top {
                height: auto;
                background-color: #f2f2f2;
                padding: {
                    top: 0px;
                    left: 50px;
                    bottom: 40px;
                }
                margin: {
                    bottom: 0px;
                }
                h2 {
                    position: relative;
                    left: -7px;
                    margin: {
                        bottom: 20px;
                    }
                    font-size: 30px;
                    color: #333;
                    width: 400px;
                    overflow: hidden;
                    .icon {
                        float: right;
                        margin-top: 5px;
                    }
                }
                .price {
                    font-size: 16px;
                    color: #808080;
                    span {
                        color: $color-normal;
                        font-weight: bold;
                    }
                    margin-bottom: 20px;
                }
                .address {
                    position: relative;
                    color: #808080;
                    font-size: 16px;
                    label {
                        width: 280px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .map {
                        position: relative;
                        top: -5px;
                        width: 120px;
                        height: 30px;
                        line-height: 30px;
                        color: $color-normal;
                        cursor: pointer;
                        .map_icon {
                            background: url('/static/images/icon_01.png');
                            width: 26px;
                            height: 28px;
                            margin-right: 5px;
                            background-position: 0px 0px;
                        }
                    }
                }
                .tags {
                    position: relative;
                    top: 20px;
                    height: 34px;
                    width: 100%;
                    overflow: hidden;
                    li {
                        padding: 0 10px;
                        margin: {
                            right: 5px;
                        }
                        display: inline-block;
                        font-size: 14px;
                        color: $color-normal;
                        width: auto;
                        height: 24px;
                        border: 1px solid $color-normal;
                        border-radius: 12px;
                        line-height: 24px;
                        text-align: center;
                    }
                }
            }
            .bottom {
                position: relative;
                top: 10px;
                padding: {
                    left: 50px;
                }
                font-size: 16px;
                color: #333;
                .media_rating {
                    position: relative;
                    margin-bottom: 20px;
                    margin-left: 14px;
                    .star2 {
                        position: absolute;
                        left: 0;
                        top: 0;
                    }
                    li {
                        display: inline-block;
                        margin-right: 5px;
                        width: 20px;
                        height: 19px;
                        background: url('/static/images/star.png');
                        background-position: -10px -10px;
                    }
                    li.red {
                        background-position: -50px -10px;
                    }
                }
                .media_comment {
                    font-size: 16px;
                    line-height: 28px;
                    margin-left: 14px;
                    width: 440px;
                }
                .comment_url {
                    color: $color-normal;
                }
                .code {
                    position: relative;
                    margin-top: 25px;
                    width: 160px;
                    height: 46px;
                    a {
                        display: block;
                        width: 160px;
                        height: 46px;
                        background-color: $color-normal;
                        border-radius: 23px;
                        text-align: center;
                        line-height: 46px;
                        color: #fff;
                        font-size: 18px;
                    }
                    a:hover {
                        background-color: $color-hover;
                        -webkit-transition: all 0.3s ease;
                        transition: all 0.3s ease;
                    }
                    .erweima {
                        position: absolute;
                        left: 50%;
                        margin-left: -86px;
                        top: 50px;
                        width: 100%;
                        background: url('/static/images/bg-erwei.png');
                        background-size: 100%;
                        padding: 24px;
                        background-position: -1px -7px;
                        z-index: 9999;
                    }
                }
            }
        }
    }

    #busDetails {
        .nav {
            padding-left: 69px;
            margin-top: 60px;
            text-align: center;
            border: {
                top: 1px solid #e6e6e6;
                bottom: 1px solid #e6e6e6;
            }
            li {
                display: inline-block;
                margin-right: 69px;
                font-size: 16px;
                color: #333;
                height: 48px;
                line-height: 48px;
                cursor: pointer;
                a:hover {
                    color: $color-hover;
                    text-decoration: underline;
                    -webkit-transition: all 0.3s ease;
                    transition: all 0.3s ease;
                }
            }
            .cur {
                color: $color-normal;
            }
        }
        .more {
            margin-bottom: 12px;
            .more_a {
                font-size: 16px;
                color: #808080;
            }
            .more_a:hover {
                color: $color-hover;
                -webkit-transition: all 0.3s ease;
                transition: all 0.3s ease;
            }
        }
        .case {
            .tit {
                width: 1200px;
                height: 42px;
                margin-top: 50px;
            }

            .list {
                margin-right: -42px;
                > ul > li {
                    width: 374px;
                    height: 319px;
                    overflow: hidden;
                    margin-right: 30px;
                    margin-bottom: 30px;
                    h3 {
                        width: 365px;
                        height: 30px;
                        font-size: 20px;
                        color: #333;
                        margin-top: 5px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .tags {
                        height: 34px;
                        margin-bottom: 5px;
                        li {
                            position: relative;
                            top: 10px;
                            margin-right: 5px;
                            width: auto;
                            height: 24px;
                            line-height: 24px;
                            color: $color-normal;
                            font-size: 14px;
                            padding: 0 9px;
                            border: 1px solid $color-normal;
                            border-radius: 12px;
                        }
                    }
                }
                li {
                    display: inline-block;
                }
            }
        }
        .package {
            position: relative;
            top: 20px;
            .tit {
                width: 1200px;
                height: 42px;
                margin: 10px 0;
            }
            .list {
                margin-right: -42px;
                > ul > li {
                    margin-right: 40px;
                }
                .top {
                    margin-top: 5px;
                }
                .price {
                    font-size: 24px;
                    color: $color-normal;
                    font-weight: bold;
                }
                h3 {
                    width: 365px;
                    height: 20px;
                    font-size: 16px;
                    color: #333;
                    margin-top: 5px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .tags {
                    height: 34px;
                    li {
                        position: relative;
                        top: 5px;
                        margin-right: 5px;
                        width: auto;
                        height: 24px;
                        line-height: 24px;
                        color: $color-normal;
                        font-size: 14px;
                        padding: 0 9px;
                        border: 1px solid $color-normal;
                        border-radius: 12px;
                    }
                }
                li {
                    display: inline-block;
                }
            }
        }
        .photographer,
        .dresser {
            position: relative;
            top: 50px;
            .tit {
                width: 1200px;
                height: 42px;
                margin: 20px 0;
            }
            .arrows {
                position: absolute;
                top: 70px;
                right: 0;
                .arrow {
                    display: inline-block;
                    width: 55px;
                    height: 30px;
                    background: url('/static/images/arrow1.png') no-repeat;
                }
                .prev {
                    background-position: left top;
                }
                .prev:hover {
                    background: url('/static/images/arrow-hover1.png') no-repeat;
                    background-position: 0px 2px;
                }
                .next {
                    background-position: right top;
                }
                .next:hover {
                    background: url('/static/images/arrow-hover1.png') no-repeat;
                    background-position: -54px 2px;
                }
            }
            .list {
                margin-right: -25px;
                margin-top: 30px;
                .mr25 {
                    width: 220px !important;
                    margin-right: 25px;
                }
                li {
                    display: inline-block;
                }
                .top {
                    border-bottom: 1px solid #d9d9d9;
                    padding-bottom: 10px;
                    margin-top: 10px;
                }
                .years {
                    margin-top: -3px;
                    li {
                        width: auto;
                        height: 24px;
                        line-height: 24px;
                        color: $color-normal;
                        font-size: 14px;
                        padding: 0 9px;
                        border: 1px solid $color-normal;
                        border-radius: 12px;
                    }
                }
                .special {
                    font-size: 14px;
                    color: #808080;
                    padding-top: 10px;
                    width: 218px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
        .business {
            position: relative;
            top: 50px;
            margin-bottom: 80px;
            .tit {
                margin: 40px 0;
                width: 1200px;
                height: 42px;
            }
            .cont {
                padding-bottom: 35px;
                .left {
                    span {
                        display: block;
                        font-size: 16px;
                        color: #808080;
                        margin-top: 15px;
                        margin-left: 15px;
                    }
                    span.name {
                        font-size: 24px;
                        color: #010101;
                    }
                    .bottom {
                        margin-top: 25px;
                        width: 750px;
                        color: #333;
                        font-size: 16px;
                        line-height: 2;
                        display: -webkit-box;
                        -webkit-line-clamp: 6;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }
                }
                .right {
                    padding: {
                        top: 30px;
                        left: 30px;
                    }
                    width: 400px;
                    height: 310px;
                    background: #f2f2f2;
                    label {
                        font-size: 16px;
                        color: #808080;
                    }
                    span {
                        font-size: 16px;
                        color: #333;
                    }
                    .feature {
                        ul {
                            width: 275px;
                        }
                        li {
                            display: inline-block;
                            margin-right: 15px;
                            margin-bottom: 7px;
                        }
                    }
                    .item {
                        margin-bottom: 15px;
                    }
                }
            }
            .environment {
                position: relative;
                border: {
                    top: 1px solid #e6e6e6;
                }
                padding-top: 25px;
                .subtit {
                    font-size: 16px;
                    color: #808080;
                    padding-bottom: 20px;
                }
                .arrows {
                    position: absolute;
                    top: 25px;
                    right: 0;
                    .arrow {
                        display: inline-block;
                        width: 55px;
                        height: 30px;
                        background: url('/static/images/arrow1.png');
                    }
                    .prev {
                        background-position: left top;
                    }
                    .prev:hover {
                        background: url('/static/images/arrow-hover1.png')
                            no-repeat;
                        background-position: 0px 2px;
                    }
                    .next {
                        background-position: right top;
                    }
                    .next:hover {
                        background: url('/static/images/arrow-hover1.png')
                            no-repeat;
                        background-position: -56px 2px;
                    }
                }
                ul {
                    margin-right: -30px;
                }
                li {
                    margin-right: 30px;
                }
            }
        }
    }

    .bm-view {
        position: fixed;
        z-index: 999;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
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
    }

    .bm-bg {
        position: relative;
        top: 180px;
        margin: 0 auto;
        width: 850px;
        height: 450px;
        background: #ffffff;
        border-radius: 15px;
        padding: 15px 20px;
        h3 {
            color: #333333;
            font-size: 26px;
            line-height: 40px;
        }
        p {
            color: #808080;
            font-size: 16px;
            line-height: 40px;
        }
    }

    .map {
        position: relative;
        margin: 0 auto;
        width: 760px;
        height: 270px;
    }

    .map_btn {
        position: absolute;
        right: 0;
        top: -82px;
    }
}
@mixin animation($animation) {
    animation: $animation;
    -webkit-animation: $animation;
}

.zoomIn {
    @include animation(0.5s zoomIn 1);
}

@-webkit-keyframes zoomIn {
    from {
        opacity: 0;
        -webkit-transform: scale3d(0.3, 0.3, 0.3);
        transform: scale3d(0.3, 0.3, 0.3);
    }
    50% {
        opacity: 1;
    }
}

@keyframes zoomIn {
    from {
        opacity: 0;
        -webkit-transform: scale3d(0.3, 0.3, 0.3);
        transform: scale3d(0.3, 0.3, 0.3);
    }
    50% {
        opacity: 1;
    }
}
</style>

