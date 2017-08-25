<template>
    <div>
        <com-header></com-header>
        <com-tag @ajaxTag="ajaxTag"></com-tag>
        <com-filter @ajaxfilter="ajaxfilter" @ajaxPrice="ajaxPrice"></com-filter>
        <div class="bus-commit">
            <div class="container">
                <ul class="list" v-if="shopList && shopList.length>0">
                    <li v-for="(item,busIndex) in shopList" :key="busIndex">
                        <ul class="list-con">
                            <li class="list-con-li">
                                <div class="shop fl">
                                    <router-link :to="{ name: 'storeDetails', query: {busId:item.id}}" target="_blank">
                                        <img class="fl shop_logo" v-lazy="item.logo" width="120" height="120">
                                        <ul class="shop_details">
                                            <li>
                                                <span class="meal_name">{{item.name}}</span>
                                                <i v-show="item.isYes" class="icon icon-yes"></i>
                                                <i v-show="item.isVip" class="icon icon-vip"></i>
                                            </li>
                                            <li>
                                                <!-- <i class="icon logo_position"></i> -->
                                                <span class="position">{{item.position}}</span>
                                            </li>
                                            <li class="price">
                                                <label>¥{{item.price}}</label>
                                                <span>/起</span>
                                            </li>
                                            <li>
                                                <ul class="meal_tag">
                                                    <li v-for="tag in item.tag" :key="tag">{{tag}}</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </router-link>
                                </div>
                                <div class="shop-num fl">
                                    <p class="shop-num-total">{{item.total}}</p>
                                    <p class="shop-num-total-txt">总体评分</p>
                                    <ul>
                                        <li>
                                            拍摄品质：{{item.quality}}
                                        </li>
                                        <li>
                                            性价比：{{item.cost}}
                                        </li>
                                        <li>
                                            服务：{{item.service}}
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li v-if="item.comments && item.comments.length>0" v-bind:class="{h_auto:item.showAll,h_80:item.comments.length==1}" class="list-con-li list-con-li-comments">
                                <ul>
                                    <li v-for="(comment,i) in item.comments" :key="i" class="bus-comments">
                                        <div class="bus-comments-con">
                                            <a :href="comment.url" target="_blank">
                                                <img class="circle fl" :src="comment.head" width="56" height="56">
                                                <div class="bus-comments-user-info fl">
                                                    <span>{{comment.nike}}</span>
                                                    <label>{{comment.date}}</label>
                                                </div>
                                                <div class="bus-comments-user-con fl">
                                                    <a :href="comment.url" target="_blank">{{comment.title}}</a>
                                                    <p>{{comment.tag}}</p>
                                                </div>
                                            </a>
                                            <div class="bus-comments-user-num fr">
                                                <ul>
                                                    <li>
                                                        <i v-if="comment.quality > item.quality" class="icon-txt-high"></i>
                                                        <i v-else-if="comment.quality == item.quality" class="icon-txt-equal"></i>
                                                        <i v-else-if="comment.quality < item.quality" class="icon-txt-low"></i>
                                                        拍摄品质：{{comment.quality}}
                                                    </li>
                                                    <li>
                                                        性价比：{{comment.cost}}
                                                        <i v-if="comment.cost > item.cost" class="icon-txt-high"></i>
                                                        <i v-else-if="comment.cost == item.cost" class="icon-txt-equal"></i>
                                                        <i v-else-if="comment.cost < item.cost" class="icon-txt-low"></i>
                                                    </li>
                                                    <li>
                                                        服务：{{comment.service}}
                                                        <i v-if="comment.service > item.service" class="icon-txt-high"></i>
                                                        <i v-else-if="comment.service == item.service" class="icon-txt-equal"></i>
                                                        <i v-else-if="comment.service < item.service" class="icon-txt-low"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li class="list-con-btn" v-if="item.comments && item.comments.length>2">
                                <div v-if="item.showAll" @click="showBtn(busIndex,false)">
                                    <a href="javascript:void(0)" >
                                        <i class="icon-angle-act"></i>
                                        <span>收 起</span>
                                    </a>
                                </div>
                                <div v-else-if="!item.showAll" @click="showBtn(busIndex,true)">
                                    <a href="javascript:void(0)" >
                                        <i class="icon-angle"></i>
                                        <span>展示全部</span>
                                    </a>
                                </div>
    
                            </li>
                        </ul>
                    </li>
    
                </ul>
            </div>
        </div>
        <div v-if="!shopList || shopList.length == 0" class="no-data">
            <img src="/static/images/icon-no-data-1.png">
        </div>
        <com-paging :pageInfo="pageInfo" @change="pagechange" @skip="skip"></com-paging>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import header from './../components/user/userHead'
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
            shopList: 'shopList',
            shopPage: 'shopPage'
        }),
        ...mapActions({
            qryStoreList: 'qryStoreList',
            shopListClear: 'shopListClear',
        })
    },
    data() {
        return {
            ajaxdata: {
                page: 1,
                method: 0,
                priceToSort: 0,
                keyword: null || this.$route.query.keyword,
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
        this.$store.dispatch('shopListClear')
        this.$store.dispatch('qryStoreList', this.ajaxdata)
    },
    methods: {
        pagechange(current) {   // 页码改变传入新的页码，此处做回调
            this.ajaxdata.page = current
            this.$store.dispatch('qryStoreList', this.ajaxdata)
        },
        skip(current) {
            this.ajaxdata.page = current
            this.$store.dispatch('qryStoreList', this.ajaxdata)
        },
        ajaxTag(data) {
            this.ajaxdata = this.objExtend(this.ajaxdata, data, false);
            this.$store.dispatch('qryStoreList', this.ajaxdata)
        },
        ajaxfilter(method, priceToSort) {
            this.ajaxdata.method = method;
            this.ajaxdata.priceToSort = priceToSort;
            this.$store.dispatch('qryStoreList', this.ajaxdata)
        },
        ajaxPrice(minPrice, maxPrice) {
            this.ajaxdata.minPrice = minPrice
            this.ajaxdata.maxPrice = maxPrice
            this.$store.dispatch('qryStoreList', this.ajaxdata)
        },
        showBtn(busIndex, showAll) {
            let data = {
                index: busIndex,
                showAll: showAll
            }
            this.$store.dispatch('shopListChange', data)
        }
    },
    watch: {
        shopPage() {
            this.pageInfo.current = this.shopPage.currentPage
            this.pageInfo.total = this.shopPage.totalCount
            this.pageInfo.pagenum = this.shopPage.pageSize
        }
    },
    beforeDestroy() {
    }
}
</script>


<style rel="stylesheet/scss" lang="scss">
@import "./../assets/css/comment.scss";
</style>