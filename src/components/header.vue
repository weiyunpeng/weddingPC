<template>
    <div class="header" :style="{background:skin, borderBottom:skinBorder}">
        <div class="container">
            <div class="logo">
                <router-link to="/">
                    <img :src="logo" alt="大豫新娘帮">
                </router-link>
            </div>
            <div class="nav clearfix">
                <ul>
                    <li>
                        <router-link to="/business" class="nav_a" active-class="nav_active" exact>查看商家</router-link>
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
            skin:'#fff',
            skinBorder:'2px solid #e4e4e4',
            logo:'/static/images/logo-2.png',
            keyword:'皮皮虾，我们走'
        }
    },
    computed: {
        ...mapGetters({
        }),
        ...mapActions({
            qryBusList:'qryBusList',
            busClear:'busClear'
        })
    },
    mounted(){
    },
    methods: {
        /**
         * 搜商家按钮事件
         */
        searchBtn(){
            this.$router.push({ name: '/index'})
            let data = {
                keyword:this.keyword
            }
            // this.$store.dispatch('busClear')
            this.$store.dispatch('qryBusList', data)
        }
    },
}
</script>
<style rel="stylesheet/scss" lang="scss">
@import "./../assets/css/header.scss";
</style>
