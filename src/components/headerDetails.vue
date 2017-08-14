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
                    <li v-show="busName">
                        ><router-link :to="{ name: 'busDeatils', query: {busName:busName,busId:busId}}" class="nav_a" active-class="nav_active">{{busName}}</router-link>
                    </li>
                    <li v-show="mealName">
                        ><router-link :to="{ name: 'mealDeatils', query: {mealName:mealName,mealId:mealId}}" class="nav_a" active-class="nav_active">{{mealName}}</router-link>
                    </li>
                    <li v-show="thisMealName">
                        ><router-link :to="{ name: 'mealList', query: {thisMealName:thisMealName}}" class="nav_a" active-class="nav_active">{{thisMealName}}</router-link>
                    </li>
                    <li v-show="busSample">
                        ><router-link :to="{ name: 'busSample', query: {busSample:busSample}}" class="nav_a" active-class="nav_active">{{busSample}}</router-link>
                    </li>
                    <li v-show="cameraman">
                        ><router-link :to="{ name: 'cameraman', query: {cameraman:cameraman}}" class="nav_a" active-class="nav_active">{{cameraman}}</router-link>
                    </li>
                    <li v-show="makeupman">
                        ><router-link :to="{ name: 'makeupman', query: {makeupman:makeupman}}" class="nav_a" active-class="nav_active">{{makeupman}}</router-link>
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
            logo:'/static/images/logo-2.png',
            busName:this.$route.query.busName,
            busId:this.$route.query.busId,
            mealName:this.$route.query.mealName,
            mealId:this.$route.query.mealId,
            thisMealName:this.$route.query.thisMealName,
            busSample:this.$route.query.busSample,
            cameraman:this.$route.query.cameraman,
            makeupman:this.$route.query.makeupman,
        }
    },
    props:{
    },
    computed: {
        ...mapGetters({
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
}
</script>
<style rel="stylesheet/scss" lang="scss">
@import "./../assets/css/header.scss";
</style>
