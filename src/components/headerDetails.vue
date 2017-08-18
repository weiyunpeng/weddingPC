<template>
    <div class="header" :style="{background:skin, borderBottom:skinBorder}">
        <div class="container">
            <div class="logo">
                <router-link to="/">
                    <img :src="logo" alt="大豫新娘帮">
                </router-link>
            </div>
            <div class="breadcrumb">
                <ul>
                    <li>
                        <router-link to="/" class="nav_a" active-class="nav_active" exact>首页</router-link>
                    </li>
                    <li v-show="busId">
                        ><router-link :to="{ name: 'storeDetails', query: {busId:busId}}" class="nav_a" active-class="nav_active">{{busName}}</router-link>
                    </li>
                    <li v-show="mealId">
                        ><router-link :to="{ name: 'packageDetails', query: {busId:busId,mealId:mealId}}" class="nav_a" active-class="nav_active">{{mealName}}</router-link>
                    </li>
                    <li v-show="sampleId">
                        ><router-link :to="{ name: 'busSample', query: {busId:busId,sampleId:sampleId}}" class="nav_a" active-class="nav_active">官方案例</router-link>
                    </li>
                    <li v-show="storeList">
                        ><router-link :to="{ name: 'storeList', query: {busId:busId,storeList: 'storeList'}}" class="nav_a" active-class="nav_active">套餐列表</router-link>
                    </li>
                    <li v-show="cameramanId">
                        ><router-link :to="{ name: 'cameraman', query: {busId:busId,cameramanId:cameramanId}}" class="nav_a" active-class="nav_active">摄影师</router-link>
                    </li>
                    <li v-show="makeupId">
                        ><router-link :to="{ name: 'makeupman', query: {busId:busId,makeupId:makeupId}}" class="nav_a" active-class="nav_active">化妆师</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            skin:'#fff',
            skinBorder:'2px solid #e4e4e4',
            logo:'/static/images/icon-logo-1.png',
            busName:'',
            mealName:'',
            storeList:this.$route.query.storeList,
            cameramanId:this.$route.query.cameramanId,
            sampleId:this.$route.query.sampleId,
            busId:this.$route.query.busId,
            mealId:this.$route.query.mealId,
            busSample:this.$route.query.busSample,
            makeupId:this.$route.query.makeupId,
        }
    },
    props:{
    },
    computed: {
        ...mapGetters({
            shopInfo:'shopInfo',
            busSampleStore: 'busSampleStore',
            thisMealStore: 'thisMealStore',
            camaramanBusinfo:'camaramanBusinfo',
            makeupmanBusinfo:'makeupmanBusinfo',
            mealInfo: 'mealInfo',
        }),
        ...mapActions({
        })
    },
    mounted(){
    },
    methods: {
        /**
         * 面包屑事件
         */
        crumbBtn(){

        }
    },
    watch:{
        shopInfo(){
            this.busName = this.shopInfo.intro_info.bus_name
        },
        busSampleStore(){
            this.busName = this.busSampleStore.store_name
        },
        thisMealStore(){
            this.busName = this.thisMealStore.store_name
        },
        camaramanBusinfo(){
            this.busName = this.camaramanBusinfo.store_name
        },
        makeupmanBusinfo(){
            this.busName = this.makeupmanBusinfo.store_name
        },
        mealInfo(){
            this.busName = this.mealInfo.store_name
            this.mealName = this.mealInfo.package_name
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">
@import "./../assets/css/header.scss";
</style>
