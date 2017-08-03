<template>
<div>
<com-header></com-header>
<div class="container">
    <com-tag></com-tag>
    <com-filter></com-filter>
    <div>
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
                            <li v-for="meal in item.packages" :key="meal.id">
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
    <com-paging :pageInfo="pageInfo" @change="pagechange"></com-paging>
</div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import header from './../components/header'
import tag from "./../components/business/busTag"
import busFilter from "./../components/business/busFilter"
import paging from "./../components/paging"
    export default {
        components: {
            comHeader: header,
            comTag: tag,
            comFilter: busFilter,
            comPaging: paging,
        },
        computed: {
            ...mapGetters({
                busList:'busList',
                busPage:'busPage'
            }),
            ...mapActions({
                qryBusList:'qryBusList',
                busClear:'busClear',
            })
        },
        data(){
            return {
                pageInfo:{
                    total:100,  // 记录总条数   默认空，如果小于pageNum则组件不显示   类型Number
                    current:1,  // 当前页数，   默认为1                             类型Number
                    pagenum:10, // 每页显示条数,默认10                              类型Number
                    pagegroup:5,    // 分页条数     默认为5，需传入奇数                 类型Number
                    skin:'#ff4e6b'  // 选中页码的颜色主题               类型String
                }
            }
        },
        mounted(){
            // this.$store.dispatch('busClear')
            let data = {
                page:1
            }
            this.$store.dispatch('qryBusList', data)
        },
        methods: {
            pagechange:function(current){     // 页码改变传入新的页码，此处做回调
                console.log(current);
            }
        },
        beforeDestroy () {
        }
    }
</script>


<style rel="stylesheet/scss" lang="scss">
@import "./../assets/css/list.scss";
</style>
