<template>
    <div>
        <com-header></com-header>
        <div>
            <com-tag @ajaxTag="ajaxTag"></com-tag>
            <com-filter @ajaxfilter="ajaxfilter" @ajaxPrice="ajaxPrice"></com-filter>
            <div class="meal-con">
                <ul class="container meal_list">
                    <li class="list_con" v-for="item in mealList" :key="item.id">
                        <div class="shop">
                            <router-link :to="{ name: 'mealDeatils', query: {busName:item.business_name,busId:item.store_id,mealName:item.meal_name,mealId:item.id}}" target="_blank">
                                <div class="img">
                                    <img class="shop_logo" v-lazy="item.logo" width="372" height="209">
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
                                    <li class="business_name">
                                        {{item.business_name}}
                                    </li>
                                </ul>
                            </router-link>
                        </div>
                    </li>
                </ul>
            </div>
            <com-paging :pageInfo="pageInfo" @change="pagechange" @skip="skip"></com-paging>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import header from './../components/user/userHead'
import tag from "./../components/meal/mealTag"
import mealFilter from "./../components/meal/mealFilter"
import paging from "./../components/paging"

export default {
    components: {
        comHeader: header,
        comTag: tag,
        comFilter: mealFilter,
        comPaging: paging
    },
    computed: {
        ...mapGetters({
            mealList: 'mealList',
            mealPage: 'mealPage'
        }),
        ...mapActions({
            qryMealList: 'qryMealList',
            mealClear: 'mealClear',
        })
    },
    data() {
        return {
            ajaxdata: {
                page: 1,
                method: 0,
                priceToSort: 0,
            },
            pageInfo: {
                total: 0,  // 记录总条数
                current: 1,  // 当前页数，
                pagenum: 20, // 每页显示条数
                pagegroup: 6,    // 分页器每次展示出的条数
                skin: '#ff4e6b'  // 选中页码的颜色主题
            }
        }
    },
    mounted() {
        // this.$store.dispatch('mealClear')
        let data = {
            type: 'meal'
        }
        this.$store.dispatch('qryMealList', data)
    },
    methods: {
        pagechange(current) {   // 页码改变传入新的页码，此处做回调
            this.ajaxdata.page = current
            this.$store.dispatch('qryMealList', this.ajaxdata)
        },
        skip(current) {
            this.ajaxdata.page = current
            this.$store.dispatch('qryMealList', this.ajaxdata)
        },
        ajaxTag(data) {
            this.ajaxdata = this.objExtend(this.ajaxdata, data, false);
            this.$store.dispatch('qryMealList', this.ajaxdata)
        },
        ajaxfilter(method, priceToSort) {
            this.ajaxdata.method = method;
            this.ajaxdata.priceToSort = priceToSort;
            this.$store.dispatch('qryMealList', this.ajaxdata)
        },
        ajaxPrice(minPrice, maxPrice) {
            this.ajaxdata.minPrice = minPrice
            this.ajaxdata.maxPrice = maxPrice
            this.$store.dispatch('qryMealList', this.ajaxdata)
        }
    },
    watch: {
        mealPage() {
            this.pageInfo.current = this.mealPage.currentPage + 1
            this.pageInfo.total = this.mealPage.totalCount
            this.pageInfo.pagenum = this.mealPage.pageSize
        }
    },
    beforeDestroy() {
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@charset "UTF-8";
.meal-con{
    width: 100%;
    background: #fff;
    background-color: #fff;
}
.meal_list {
    margin-top: 10px;
    padding-bottom: 20px;
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
