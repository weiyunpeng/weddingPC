<template>
<div>
<com-header></com-header>
<div class="container">
    <com-store :storeInfo="makeupmanBusinfo"></com-store>
    <div class="fl">
        <div class="camara_user">
            <img class="head_photo" v-lazy="makeupman.head" width="220" height="220">
            <ul>
                <li>
                    <span>化妆师</span>
                    <label style="font-weight: bold;font-size: 20px;">{{makeupman.name}}</label>
                </li>
                <li>
                    <span>工龄</span>
                    <label>{{makeupman.workYears}}年</label>
                </li>
                <li>
                    <span>星座</span>
                    <label>{{makeupman.astro}}</label>
                </li>
                <li>
                    <span>化妆特点</span>
                    <label style="line-height:28px;height: 58px;">{{makeupman.specialty}}</label>
                </li>
            </ul>
        </div>
        <div class="fl about_package">
            <p class="p_tit clearfix">
                相关套餐
            </p>
            <ul>
                <li v-for="(item,s) in makeupmanPackages" :key="s">
                    <router-link :to="{ name: 'mealDeatils',query: {busName:makeupmanBusinfo.store_name, mealName: item.name}}" target="_blank">
                        <img v-lazy="item.cover" width="300" height="200">
                        <div class="p_info clearfix">
                            <div class="name fl">{{item.name}}</div>
                            <div class="price fr">￥{{item.price}}</div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
    <div class="fr caman_info">
        <div class="subnav">
            <ul>
                <li v-for="(item,i) in infoDetails" :key="i" class="subnav_li">
                    <a href="javascript:void(0)" v-bind:class="{cur: selected == i}" @click="changeTab(i)">{{item.tag}}</a>
                </li>
            </ul>
        </div>
        <transition-group tag="ul" name="cameraList">
            <li v-for="(item,j) in infoDetails" :key="j" class="list-item" v-show="j >= selected">
                <div class="caman_tit">
                    {{ item.tag }}
                    <i class="mark"></i>
                </div>
                <div class="caman_con">
                    {{item.detail}}
                </div>
                <div class="caman_img" v-for="(img,g) in item.imgs" :key="g">
                    <img v-lazy="img" width="640" height="420" style="margin-bottom:10px;">
                </div>
            </li>
        </transition-group>
        <div style="height:60px;"></div>
    </div>
</div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import header from './../components/headerDetails'
import storeInfo from './../components/storeInfo'
    export default {
        components: {
            comHeader: header,
            comStore:storeInfo
        },
        data(){
            return {
                id:this.$route.query.id,
                selected:0,
                infoDetails: []
            }
        },
        computed: {
            ...mapGetters({
                makeupman:'makeupman',
                makeupmanBusinfo:'makeupmanBusinfo',
                makeupmanPackages:'makeupmanPackages'
            }),
            ...mapActions({
                qryMakeupDetails:'qryMakeupDetails'
            })
        },
        mounted(){
            let data = {
                id:this.id
            }
            this.$store.dispatch('qryMakeupDetails', data)
        },
        methods: {
            changeTab(i){
                this.selected = i;
            }
        },
        watch:{
            makeupman(){
                this.infoDetails = this.makeupman.info_details
            },
            makeupmanBusinfo(){
            },
            makeupmanPackages(){
            }
        },
        beforeDestroy () {
        }
    }
</script>


<style rel="stylesheet/scss" lang="scss">
@import "./../assets/css/cameraman.scss";
</style>
