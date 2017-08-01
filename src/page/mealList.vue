<template>
<div>
    <com-header></com-header>
    <div class="container">
        <div class="meal_introduction clearfix">
            <div class="bus_name">
                {{thisMealStore.store_name}}
                <i class="icon icon-yes" v-if="thisMealStore.isYes"></i>
                <i class="icon icon-vip" v-if="thisMealStore.isVip"></i>
            </div>
            <div class="second clearfix">
                <div class="clearfix fl">
                    <label class="fl">媒体评定分：</label>
                    <div class="media_rating fl">
                        <ul class="star1">
                            <li v-for="n in 5" :key="n"></li>
                        </ul>
                        <ul class="star2">
                            <li v-for="m in thisMealStore.star" class="red" :key="m"></li>
                        </ul>
                    </div>
                </div>
                <div class="address fl">
                    地址：{{thisMealStore.address}}
                </div> 
            </div>
        </div>
        <com-tag></com-tag>
        <div class="container">
        <ul class="meal_list">
            <li class="list_con" v-for="item in thisMealList" :key="item.id">
                <div class="shop">
                    <router-link :to="{ name: 'mealDeatils', query: {mealName:item.meal_name}}" target="_blank">
                    <div class="img">
                        <img class="shop_logo" v-lazy="item.logo">
                    </div>
                    <ul class="shop_details">
                        <li class="price">
                            ￥{{item.price}}
                            <ul class="tags">
                                 <li v-for="(tag,index) in item.tags" :key="index" class="tag">{{tag}}</li>
                            </ul>
                        </li>
                        <li class="meal_name">
                            {{item.meal_name}}
                        </li>
                    </ul>
                    </router-link>
                </div>
            </li>
        </ul>
    </div>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import header from './../components/headerDetails'
import tag from "./../components/meal/mealTag"

export default {
    components: {
        comHeader: header,
        comTag: tag
    },
    computed: {
        ...mapGetters({
            thisMealList:'thisMealList',
            thisMealStore:'thisMealStore'
        }),
        ...mapActions({
            qryThisMealList:'qryThisMealList'
        })
    },
    data() {
        return {}
    },
    mounted(){
        // this.$store.dispatch('mealClear')
        let data = {
            storeId:'1'
        }
        this.$store.dispatch('qryThisMealList', data)
    },
    methods: {
    },
    watch:{
        thisMealList(){
        },
        thisMealStore(){
        }
    },
    beforeDestroy () {
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@charset "UTF-8";
.meal_list {
    margin: {
        right:-42px;
        top:34px;
    }
    .list_con {
        display: inline-block;
        margin: {
            right:42px;
            bottom:40px;
        }
        width:372px;
        .price {
            position:relative;
            height:50px;
            line-height: 50px;
            font: {
                size: 24px;
                weight: bold;
            }
            color:#ff4e6b;
            .tags{
                position:absolute;
                top:0;
                right:0
            }
            .tag{
                display: inline-block;
                width:102px;
                height:24px;
                border:1px solid #ff4e6b;
                border-radius: 12px;
                color:#ff4e6b;
                line-height: 24px;
                text-align: center;
                margin-right: 8px;
                font: {
                    size: 14px;
                    weight: normal;
                }
            }
        }
        .meal_name {
            margin: {
                bottom:6px;
            }
            font: {
                size: 16px;
            }
            color:#333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .business_name {
            font: {
                size: 14px;
            }
            color:#808080;
        }
    }
}
</style>
