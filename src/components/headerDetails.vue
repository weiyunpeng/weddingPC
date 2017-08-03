<template>
    <div class="header" :style="{background:'url('+skin+') left center no-repeat', borderBottom:skinBorder}">
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
                        ><router-link :to="{ name: 'busDeatils', query: {busName:busName}}" class="nav_a" active-class="nav_active">{{busName}}</router-link>
                    </li>
                    <li v-show="mealName">
                        ><router-link :to="{ name: 'mealDeatils', query: {mealName:mealName}}" class="nav_a" active-class="nav_active">{{mealName}}</router-link>
                    </li>
                    <li v-show="thisMealName">
                        ><router-link :to="{ name: 'mealList', query: {thisMealName:thisMealName}}" class="nav_a" active-class="nav_active">{{thisMealName}}</router-link>
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
            skin:'/static/images/bg.jpg',
            skinBorder:'2px solid #ff4e6b',
            logo:'/static/images/logo.png',
            busName:this.$route.query.busName,
            mealName:this.$route.query.mealName,
            thisMealName:this.$route.query.thisMealName,
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
