<template>
    <div class="header">
        <div class="container">
            <div class="logo">
                <router-link to="/">
                    <img src="./../../static/images/logo.png" alt="大豫新娘帮">
                </router-link>
            </div>
            <div class="nav clearfix">
                <ul>
                    <li>
                        <router-link to="/" class="nav_a" active-class="nav_active" exact>查看商家</router-link>
                    </li>
                    <li>
                        <router-link to="/meal" class="nav_a" active-class="nav_active">查看套餐</router-link>
                    </li>
                </ul>
            </div>
            <div class="search clearfix">
                <div class="input-group nav_search">
                    <input type="text" v-model.trim="keyword" placeholder="" class="form-control nav_form" @keyup.enter="searchBtn">
                    <span class="input-group-addon search_btn nav_search_btn" @click="searchBtn">
                        <i class="iconfont">搜商家</i>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            keyword:'皮皮虾，我们走'
        }
    },
    computed: {
        ...mapGetters({
        }),
        ...mapActions({
        })
    },
    methods: {
        /**
         * 搜商家按钮事件
         */
        searchBtn(){}
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">
@import "./../assets/css/header.scss";
</style>
