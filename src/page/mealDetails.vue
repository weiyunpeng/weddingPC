<template>
    <div class="packageDetails">
        <com-header></com-header>
        <div class="container" id="mealDetails">
            <div class="meal_introduction clearfix">
                <div class="bus_name">
                    {{mealInfo.store_name}}
                    <i class="icon icon-yes" v-if="mealInfo.isYes"></i>
                    <i class="icon icon-vip" v-if="mealInfo.isVip"></i>
                </div>
                <div class="second clearfix">
                    <div class="clearfix fl">
                        <label class="fl">媒体评定分：</label>
                        <div class="media_rating fl">
                            <star :score="mealInfo.star"></star>
                        </div>
                    </div>
                    <div class="address fl">
                        地址：{{mealInfo.address}}
                    </div>
                </div>
                <div class="bottom clearfix">
                    <com-pic :imgs='imgs' :width='720' :height='480' :paginaWidth='138' :paginaHeight='92'></com-pic>
                    <div class="right_introduction fr">
                        <div class="meal_name">
                            {{mealInfo.package_name}}
                        </div>
                        <div class="tags">
                            <ul>
                                <li v-for="(tag,index) in mealInfo.tags" :key="index">
                                    {{tag}}
                                </li>
                            </ul>
                        </div>
                        <div class="price">
                            <span>￥{{mealInfo.price}}</span>
                        </div>
                        <div class="others">
                            <dl class="clearfix" v-if="mealInfo.clothes_num">
                                <dt class="fl">服装造型：</dt>
                                <dd class="fl">{{mealInfo.clothes_num}}套</dd>
                            </dl>
                            <dl class="clearfix" v-if="mealInfo.ps_num">
                                <dt class="fl">精修：</dt>
                                <dd class="fl">{{mealInfo.ps_num}}张</dd>
                            </dl>
                            <dl class="clearfix" v-if="mealInfo.scene">
                                <dt class="fl">场景：</dt>
                                <dd class="fl">{{mealInfo.scene}}</dd>
                            </dl>
                        </div>
                        <div class="code">
                            <a v-on:click="erweima" href="javascript:void(0)">
                                咨询喜宝
                            </a>
                            <img class="erweima" :src="mealInfo.erwei_img" v-show="isErwei">
                        </div>
                    </div>
                </div>
            </div>
            <div class="remaining clearfix">
                <div class="fl details">
                    <div class="subnav">
                        <ul>
                            <li v-for="(item,i) in ['套餐详情','图文详情']" :key="i" class="subnav_li">
                                <a v-bind:class="{cur: selected == i}" href="javascript:void(0)" @click="changeTab(i)">{{item}}</a>
                            </li>
                        </ul>
                    </div>
                    <div v-show="0 >= selected">
                        <div class="deposit item">
                            <div class="tit">
                                定金
                                <i class="mark"></i>
                            </div>
                            <div class="cont">
                                <dl class="clearfix">
                                    <dt class="fl">定金</dt>
                                    <dd class="fl">{{mealDetails.deposit}}</dd>
                                </dl>
                                <dl class="clearfix">
                                    <dt class="fl">定金说明</dt>
                                    <dd class="fl">{{mealDetails.deposit_explain}}</dd>
                                </dl>
                            </div>
                        </div>
                        <div class="modelling item">
                            <div class="tit">
                                造型
                                <i class="mark"></i>
                            </div>
                            <div class="cont">
                                <dl class="clearfix">
                                    <dt class="fl">新娘服装</dt>
                                    <dd class="fl">{{mealDetails.female_clothes}}</dd>
                                </dl>
                                <dl class="clearfix">
                                    <dt class="fl">新郎服装</dt>
                                    <dd class="fl">{{mealDetails.man_clothes}}</dd>
                                </dl>
                                <dl class="clearfix">
                                    <dt class="fl">服装说明</dt>
                                    <dd class="fl">{{mealDetails.clothes_explain}}套服装</dd>
                                </dl>
                                <dl class="clearfix">
                                    <dt class="fl">造型数量</dt>
                                    <dd class="fl">{{mealDetails.model_num}}</dd>
                                </dl>
                                <dl class="clearfix">
                                    <dt class="fl">造型说明</dt>
                                    <dd class="fl">{{mealDetails.model_explain}}</dd>
                                </dl>
                                <dl class="clearfix">
                                    <dt class="fl">化妆品说明</dt>
                                    <dd class="fl">{{mealDetails.cosmetic_explain}}</dd>
                                </dl>
                            </div>
                        </div>
                        <div class="scene item">
                            <div class="tit">
                                场景
                                <i class="mark"></i>
                            </div>
                            <div class="cont">
                                <dl class="clearfix">
                                    <dt class="fl">内景数量</dt>
                                    <dd class="fl">{{mealDetails.scene_in}}个</dd>
                                </dl>
                                <dl class="clearfix">
                                    <dt class="fl">外景数量</dt>
                                    <dd class="fl">{{mealDetails.scene_out}}个</dd>
                                </dl>
                                <dl class="clearfix">
                                    <dt class="fl">内景说明</dt>
                                    <dd class="fl">{{mealDetails.scene_in_explain}}</dd>
                                </dl>
                                <dl class="clearfix">
                                    <dt class="fl">外景说明</dt>
                                    <dd class="fl">{{mealDetails.scene_out_explain}}</dd>
                                </dl>
                            </div>
                        </div>
                        <div class="shoot item">
                            <a class="strategy" :href="mealDetails.photo_strategy_url" target="_blank">
                                攻略
                            </a>
                            <div class="tit">
                                拍摄
                                <i class="mark"></i>
                            </div>
                            <div class="cont">
                                <dl class="clearfix">
                                    <dt class="fl">拍摄天数</dt>
                                    <dd class="fl">{{mealDetails.photo_days}}天</dd>
                                </dl>
                                <dl class="clearfix">
                                    <dt class="fl">拍摄张数</dt>
                                    <dd class="fl">{{mealDetails.photo_num}}张</dd>
                                </dl>
                                <dl class="clearfix">
                                    <dt class="fl">精修张数</dt>
                                    <dd class="fl">{{mealDetails.ps_num}}张</dd>
                                </dl>
                                <dl class="clearfix">
                                    <dt class="fl">入册张数</dt>
                                    <dd class="fl">{{mealDetails.in_num}}张</dd>
                                </dl>
                                <dl class="clearfix">
                                    <dt class="fl">补充说明</dt>
                                    <dd class="fl">{{mealDetails.replenish_explain}}</dd>
                                </dl>
                            </div>
                        </div>
                        <div class="end_product item">
                            <a class="strategy" :href="mealDetails.product_strategy_url" target="_blank">
                                攻略
                            </a>
                            <div class="tit">
                                成品
                                <i class="mark"></i>
                            </div>
                            <div class="cont">
                                <dl class="clearfix">
                                    <dt class="fl">相册数量</dt>
                                    <dd class="fl">{{mealDetails.album_num}}本</dd>
                                </dl>
                                <dl class="clearfix">
                                    <dt class="fl">相册说明</dt>
                                    <dd class="fl">{{mealDetails.album_explain}}</dd>
                                </dl>
                                <dl class="clearfix">
                                    <dt class="fl">相框数量</dt>
                                    <dd class="fl">{{mealDetails.frame_num}}个</dd>
                                </dl>
                                <dl class="clearfix">
                                    <dt class="fl">相框说明</dt>
                                    <dd class="fl">{{mealDetails.frame_explain}}</dd>
                                </dl>
                                <dl class="clearfix">
                                    <dt class="fl">其他内容</dt>
                                    <dd class="fl">{{mealDetails.other_con}}</dd>
                                </dl>
                            </div>
                        </div>
                        <div class="team item">
                            <div class="tit">
                                团队
                                <i class="mark"></i>
                            </div>
                            <div class="cont">
                                <dl class="clearfix">
                                    <dt class="fl">摄影师</dt>
                                    <dd class="fl">{{mealDetails.cameraman}}</dd>
                                </dl>
                                <dl class="clearfix">
                                    <dt class="fl">化妆师</dt>
                                    <dd class="fl">{{mealDetails.dresser}}</dd>
                                </dl>
                                <dl class="clearfix">
                                    <dt class="fl">灯光师</dt>
                                    <dd class="fl">{{mealDetails.lighting_engineer}}</dd>
                                </dl>
                                <dl class="clearfix">
                                    <dt class="fl">化妆助理</dt>
                                    <dd class="fl">{{mealDetails.dresser_help}}</dd>
                                </dl>
                                <dl class="clearfix">
                                    <dt class="fl">摄影助理</dt>
                                    <dd class="fl">{{mealDetails.cameraman_help}}</dd>
                                </dl>
                                <dl class="clearfix">
                                    <dt class="fl">微视频拍摄</dt>
                                    <dd class="fl">{{mealDetails.w_video}}</dd>
                                </dl>
                            </div>
                        </div>
                        <div class="other_explain item">
                            <div class="tit">
                                其他说明
                                <i class="mark"></i>
                            </div>
                            <div class="cont">
                                <dl class="clearfix">
                                    <dt class="fl">购买须知</dt>
                                    <dd class="fl">{{mealDetails.pay_notice}}</dd>
                                </dl>
                                <dl class="clearfix">
                                    <dt class="fl">赠品</dt>
                                    <dd class="fl">{{mealDetails.gift}}</dd>
                                </dl>
                                <dl class="clearfix">
                                    <dt class="fl">亮点</dt>
                                    <dd class="fl">{{mealDetails.lightspot}}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
    
                    <div class="graphic item" v-show="1 >= selected">
                        <div class="tit">
                            图文详情
                            <i class="mark"></i>
                        </div>
                        <div class="cont">
                            <ul>
                                <li v-for="(item,g) in graphic" :key="g">
                                    <img v-lazy="item" width="800">
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="fr see">
                    <div class="tit clearfix">
                        看了又看
                        <router-link :to="{ name: 'mealList',query: {busName:mealInfo.store_name,busId:mealInfo.store_id, thisMealName: '套餐列表'}}" class="more fr" target="_blank">查看全部</router-link>
                    </div>
                    <div class="list">
                        <ul>
                            <li v-for="(item,s) in see_and_see" :key="s">
                                <router-link :to="{ name: 'mealDeatils',query: {busName:mealInfo.store_name,busId:mealInfo.store_id, mealName: item.name,mealId:item.id}}" target="_blank">
                                    <img v-lazy="item.src" width="300" height="200">
                                    <div class="name_price clearfix">
                                        <div class="name fl">{{item.name}}</div>
                                        <div class="price fr">￥{{item.price}}</div>
                                    </div>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import header from "./../components/user/userHead";
import bigImg from './../components/bigImg'
import star from './../components/star'
export default {
    components: {
        comHeader: header,
        comPic: bigImg,
        star:star
    },
    methods: {
        erweima: function () {
            this.meal_introduction.erweima = !this.meal_introduction.erweima;
        }
    },
    data() {
        return {
            id:this.$route.query.mealId,
            imgs: [],
            isErwei: false,
            selected: 0,
            graphic: [],
            see_and_see: []
        }
    },
    computed: {
        ...mapGetters({
            mealInfo: 'mealInfo',
            mealDetails: 'mealDetails'
        }),
        ...mapActions({
            qryMealDetails: 'qryMealDetails'
        })
    },
    mounted() {
        let data = {
            id: this.id
        }
        this.$store.dispatch('qryMealDetails', data)
    },
    methods: {
        erweima() {
            this.isErwei = !this.isErwei;
        },
        openMap() {
            this.isMap = true
        },
        closeMap() {
            this.isMap = false
        },
        changeTab(i) {
            this.selected = i;
        }
    },
    watch: {
        mealInfo() {
            this.imgs = this.mealInfo.img
        },
        mealDetails() {
            this.graphic = this.mealDetails.graphic
            this.see_and_see = this.mealDetails.see_and_see
        }
    },
    beforeDestroy() {
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">
@import "./../assets/css/mealDetails.scss";
</style>

