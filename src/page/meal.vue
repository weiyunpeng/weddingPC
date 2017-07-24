<template>
<div>
    <com-header></com-header>
    <div class="container">
        <com-tag></com-tag>
        <meal-filter></meal-filter>
        <div class="container">
        <ul class="meal_list">
            <li class="list_con" v-for="item in mealList" :key="item.id">
                <div class="shop">
                    <div class="img">
                        <img class="shop_logo" v-lazy="item.src">
                    </div>
                    <ul class="shop_details">
                        <li class="price">
                            ￥{{item.price}}
                            <div class="tags">
                                <p class="tag" v-if="item.tag1">摄影师一对一</p>
                                <p class="tag" v-if="item.tag2">化妆师一对一</p>
                            </div>
                        </li>
                        <li class="meal_name">
                            {{item.meal_name}}
                        </li>
                        <li class="business_name">
                            {{item.business_name}}
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
import tag from "./../components/meal/mealTag"
import mealFilter from "./../components/meal/mealFilter"

export default {
    components: {
        comHeader: header,
        comTag: tag,
        mealFilter:mealFilter
    },
    computed: {
        ...mapGetters({
            mealList:'mealList'
        }),
        ...mapActions({
            qryMealList:'qryMealList',
            mealClear:'mealClear',
        })
    },
    data() {
        return {}
    },
    mounted(){
        // this.$store.dispatch('mealClear')
        let data = {
            type:'meal'
        }
        this.$store.dispatch('qryMealList', data)
    },
    methods: {
        loadList(){
            let self = this;
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
