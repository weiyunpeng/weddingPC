<template>
    <div>
        <com-header></com-header>
        <div class="">
            <div class="meal-list">
                <div class="container clearfix" style="border-bottom:1px solid #eee">
                    <div class="bus_name">
                        {{thisMealStore.store_name}}
                        <i class="icon icon-yes" v-if="thisMealStore.isYes"></i>
                        <i class="icon icon-vip" v-if="thisMealStore.isVip"></i>
                    </div>
                    <div class="second clearfix">
                        <div class="clearfix fl">
                            <label class="fl">媒体评定分：</label>
                            <div class="media_rating fl">
                                <star :score="thisMealStore.star"></star>
                            </div>
                        </div>
                        <div class="address fl">
                            地址：{{thisMealStore.address}}
                        </div>
                    </div>
                </div>
            </div>
            <com-tag @ajaxTag="ajaxTag"></com-tag>
            <div class="meal-con">
                <ul class="meal_list container">
                    <li class="list_con" v-for="item in thisMealList" :key="item.id">
                        <div class="shop">
                            <router-link :to="{ name: 'packageDetails', query: {busId:thisMealStore.id,mealId:item.id}}" target="_blank">
                                <div class="img">
                                    <img class="shop_logo" v-lazy="item.logo" width="372" height="248">
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
        <div v-if="!thisMealList || thisMealList.length == 0" class="no-data">
            <img src="/static/images/icon-no-data-1.png">
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import header from './../components/headerDetails'
import tag from "./../components/meal/thisMealTag"
import star from './../components/star'

export default {
    components: {
        comHeader: header,
        comTag: tag,
        star: star
    },
    computed: {
        ...mapGetters({
            thisMealList: 'thisMealList',
            thisMealStore: 'thisMealStore'
        }),
        ...mapActions({
            qryThisMealList: 'qryThisMealList'
        })
    },
    data() {
        return {
            id: this.$route.query.busId,
            ajaxdata: {
                storeId: this.$route.query.busId
            },
        }
    },
    mounted() {
        // this.$store.dispatch('mealClear')
        let data = {
            storeId: this.id
        }
        this.$store.dispatch('qryThisMealList', data)
    },
    methods: {
        ajaxTag(data) {
            this.ajaxdata = this.objExtend(this.ajaxdata, data, false);
            this.$store.dispatch('qryThisMealList', this.ajaxdata)
        }
    },
    watch: {
        thisMealList() {
        },
        thisMealStore() {
        }
    },
    beforeDestroy() {
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@charset "UTF-8";
.meal-list{
    background: #fff;
    background-color: #fff;
    padding-top: 20px;
}
.meal-con {
    width: 100%;
    background: #fff;
    background-color: #fff;
}

.meal_list {
    border-top:1px solid #eee; 
    .list_con {
        display: inline-block;
        margin: {
            right: 28px;
            top: 20px;
        }
        width:372px;
        .price {
            position: relative;
            height: 50px;
            line-height: 50px;
            font: {
                size: 24px;
                weight: bold;
            }
            color:#ff4e6b;
            .tags {
                position: absolute;
                top: 0;
                right: 0
            }
            .tag {
                display: inline-block;
                width: 102px;
                height: 24px;
                border: 1px solid #ff4e6b;
                border-radius: 12px;
                color: #ff4e6b;
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
                bottom: 6px;
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
