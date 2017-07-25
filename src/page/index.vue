<template>
<div>
<com-header></com-header>
<div class="container">
    <com-tag></com-tag>
    <com-filter></com-filter>
    <div class="container">
        <ul class="list">
            <li class="list_con" v-for="item in busList" :key="item.business.id">
                <div class="shop">
                    <router-link :to="{ name: 'busDeatils', query: {busName:item.business.name}}" target="_blank">
                        <img class="shop_logo" v-lazy="item.business.logo">
                        <ul class="shop_details">
                            <li>
                                <span class="meal_name">{{item.business.name}}</span>
                                <i v-show="item.business.isYes" class="icon icon-yes"></i>
                                <i v-show="item.business.isVIP" class="icon icon-vip"></i>
                            </li>
                            <li class="price">
                                <span>起拍价</span>
                                <label>¥{{item.business.price}}</label>
                            </li>
                            <li style="height:55px;">
                                <ul class="meal_tag">
                                    <li v-for="tag in item.business.tag" :key="tag">{{tag}}</li>
                                </ul>
                            </li>
                            <li>
                                <i class="icon logo_position"></i>
                                <span class="position">{{item.business.position}}</span>
                            </li>
                        </ul>
                    </router-link>
                </div>
                <div class="photo">
                    <ul>
                            <li v-for="meal in item.meal" :key="meal.id">
                                <router-link :to="{ name: 'mealDeatils',query: {busName:item.business.name, mealName: meal.name}}" target="_blank">
                                <img class="picture" v-lazy="meal.first_img">
                                <div class="pho_details">
                                    <span>{{meal.name}}</span>
                                    <label>¥{{meal.price}}</label>
                                </div>
                                </router-link>
                            </li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import header from './../components/header'
import tag from "./../components/business/busTag"
import busFilter from "./../components/business/busFilter"
    export default {
        components: {
            comHeader: header,
            comTag: tag,
            comFilter: busFilter,
        },
        computed: {
            ...mapGetters({
                busList:'busList'
            }),
            ...mapActions({
                qryBusList:'qryBusList',
                busClear:'busClear',
            })
        },
        data(){
            return {
            }
        },
        mounted(){
            // this.$store.dispatch('busClear')
            let data = {
                type:'bus'
            }
            this.$store.dispatch('qryBusList', data)
        },
        methods: {
            loadList(){
                let data = {
                    type:'bus'
                }
                this.$store.dispatch('qryBusList', data)
            }
        },
        beforeDestroy () {
        }
    }
</script>


<style rel="stylesheet/scss" lang="scss">
@import "./../assets/css/list.scss";
</style>
