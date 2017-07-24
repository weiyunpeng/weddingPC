<template>
    <div class="header">
        <div class="container">
            <div class="logo">
                <router-link to="/">
                    <img src="./../../static/images/logo.png" alt="大豫新娘帮">
                </router-link>
            </div>
            <div class="breadcrumb">
                <ul>
                    <li>
                        <router-link to="/" class="nav_a" active-class="nav_active" exact>首页 ></router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'busDeatils', params: {}}" class="nav_a" active-class="nav_active">门店名称 ></router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'mealDeatils', params: {}}" class="nav_a" active-class="nav_active">套餐名称</router-link>
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
        }
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
