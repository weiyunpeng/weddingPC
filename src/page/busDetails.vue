<template>
<div style="background:#fff">
    <!--百度地图  start-->
    <div class="bm-view"  v-show="isMap">
        <div class="bm-bg" :class="{ zoomIn: isMap }">
            <img class="map_btn" src="/static/images/icon-no-btn.png" @click="closeMap">
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
            <com-pic :imgs='imgs'></com-pic>
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
                    <div class="clearfix">
                        <label class="fl">媒体评定语：</label>
                        <div class="media_comment fl">
                            {{mediaInfo.comment}}
                            <a :href="mediaInfo.comment_url" class="comment_url" target="_blank">[查看详情]</a>
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
            <ul v-if="shopNavList && shopNavList.length >0 ">
                <li v-for="(item,i) in shopNavList" :key="i">
                    <a href="javascript:void(0)" v-bind:class="{cur: selected == i}" @click="changeTab(i)">{{item}}</a>
                </li>
            </ul>
        </div>
        <!-- case官方案例开始 -->
        <div class="case" v-show="0 >= selected" v-if="caseInfo">
            <img class="tit" :src="caseInfo.nav_img"> 
            <div class="more clearfix" v-show="caseInfo.details && caseInfo.details.length>=6">
                <router-link :to="{ name: 'busSample', query: {busName:mediaInfo.name, busSample: '官方案例' ,id:id}}" class="more_a fr" target="_blank">
                    更多 >
                </router-link>
            </div>
            <div class="list">
                <ul>
                    <li v-for="(item,index) in caseInfo.details" v-bind:key="index">
                        <div class="img-hover">
                            <img v-lazy="item.src" width="372" height="248" @click="showSwiperModal([item.src])">
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
                <router-link :to="{ name: 'mealList', query: {busName:mediaInfo.name,busId:mediaInfo.id, thisMealName: '套餐列表'}}" class="more_a fr" target="_blank">
                    更多 >
                </router-link>
            </div>
            <div class="list">
                <ul>
                    <li v-for="(item,pIndex) in packageInfo.details" v-bind:key="pIndex">
                        <router-link :to="{ name: 'mealDeatils', query: {busName:mediaInfo.name,busId:mediaInfo.id,mealName:item.package_name,mealId:item.id}}" target="_blank">
                            <img v-lazy="item.src" width="372" height="248">
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
                        <router-link :to="{ name: 'cameraman', query: {busName:mediaInfo.name,busId:mediaInfo.id,cameraman: '摄影师',id:item.id}}" target="_blank">
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
                        <router-link :to="{ name: 'makeupman', query: {busName:mediaInfo.name,busId:mediaInfo.id,makeupman: '化妆师',id:item.id}}" target="_blank">
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
        <!-- 化妆团队结束 -->
        <!-- 商家简介开始 -->
        <div class="business">
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
                        <img v-lazy="item" width="216" height="144" @click="showSwiperModal(introInfo.environment)">
                    </swiper-slide>
                </swiper>
                <div class="arrows" v-show="introInfo.environment && introInfo.environment.length>=5">
                    <a class="prev arrow env_prev" href="javascrript:void(0)"></a>
                    <a class="next arrow env_next" href="javascrript:void(0)"></a>
                </div>
            </div>
        </div>
        <!-- 商家简介结束 -->
    </div>
    <com-swiper @closeSwiper="closeSwiper" v-show="showSwiper" :swiperImgs='swiperImgs'></com-swiper>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import header from './../components/headerDetails'
import bigImg from './../components/bigImg'
import swiperModel from './../components/swiper'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import star from './../components/star'
export default {
    name: 'carrousel',
    components: {
        comHeader: header,
        comPic:bigImg,
        comSwiper:swiperModel,
        swiper,
        swiperSlide,
        'star':star
    },
    data() {
        return {
            id:this.$route.query.busId,
            selected:0,
            busName:this.$route.query.busName,
            isErwei:false,
            isMap:false,
            imgs:[],
            mediaInfo:"",
            introInfo:"",
            caseInfo:"",
            packageInfo:"",
            photographer:"",
            dresser:"",
            lng:'',
            lat:'',
            showSwiper:false,
            swiperImgs:[],
            shopNavList:[],
            photographerOption: {
                // autoplay: 3500,
                setWrapperSize :false,
                slidesPerView : 5,
                paginationClickable :false,
                mousewheelControl : false,
                observeParents:true,
                prevButton:'.photographer_prev',
                nextButton:'.photographer_next',
            },
            dresserOption:{
                setWrapperSize :false,
                slidesPerView : 5,
                paginationClickable :false,
                mousewheelControl : false,
                observeParents:true,
                prevButton:'.dresser_prev',
                nextButton:'.dresser_next',
            },
            environmentOption:{
                setWrapperSize :false,
                slidesPerView : 5,
                paginationClickable :false,
                mousewheelControl : false,
                observeParents:true,
                prevButton:'.env_prev',
                nextButton:'.env_next',
            }
        }
    },
    computed: {
        ...mapGetters({
            shopInfo:'shopInfo',
            shopDetails:'shopDetails'
        }),
        ...mapActions({
            qryStoreDetails:'qryStoreDetails'
        })
    },
    mounted() {
        let data = {
            id:this.id
        }
        this.$store.dispatch('qryStoreDetails', data)
    },
    methods: {
        changeTab(i){
            this.selected = i;
        },
        erweima () {
            this.isErwei = !this.isErwei;
        },
        openMap(){
            this.isMap = true
        },
        closeMap(){
            this.isMap = false
        },
        showSwiperModal(imgs){
            this.showSwiper = true
            this.swiperImgs = imgs
        },
        closeSwiper(){
            this.showSwiper = false
        }
    },
    watch:{
        shopInfo(){
            console.log(this.shopInfo)
            if(this.shopInfo){
                this.imgs = this.shopInfo.media_info.img;
                this.mediaInfo = this.shopInfo.media_info;
                this.introInfo = this.shopInfo.intro_info;
                this.lng = this.shopInfo.media_info.longitude;
                this.lat = this.shopInfo.media_info.latitude;
            }
        },
        shopDetails(){
            if(this.shopDetails){
                this.caseInfo = this.shopDetails.case;
                this.packageInfo = this.shopDetails.package;
                this.photographer = this.shopDetails.cameraman;
                this.dresser = this.shopDetails.makeup;
                if(this.caseInfo.nav){
                    this.shopNavList.push(this.caseInfo.nav)
                }
                if(this.packageInfo.nav){
                    this.shopNavList.push(this.packageInfo.nav)
                }
                if(this.photographer.nav){
                    this.shopNavList.push(this.photographer.nav)
                }
                if(this.dresser.nav){
                    this.shopNavList.push(this.dresser.nav)
                }
            }
        }
    },
    beforeDestroy() {
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "./../assets/css/busDetails.scss";
</style>

