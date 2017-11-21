<template>
    <div class="page-comment">
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
                                    <router-link :to="{ name: 'storeDetails', params: {busId:item.id}}" target="_blank">
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
import { mapGetters, mapActions } from 'vuex';
import header from './../components/header';
import tag from './../components/business/busTag';
import busFilter from './../components/business/busFilter';
import paging from './../components/paging';
export default {
    components: {
        comHeader: header,
        comTag: tag,
        comFilter: busFilter,
        comPaging: paging
    },
    computed: {
        ...mapGetters({
            shopList: 'shopList',
            shopPage: 'shopPage'
        }),
        ...mapActions({
            qryStoreList: 'qryStoreList',
            shopListClear: 'shopListClear'
        })
    },
    data() {
        return {
            ajaxdata: {
                page: 1,
                method: 0,
                priceToSort: 0,
                keyword: null || this.$route.query.keyword
            },
            pageInfo: {
                total: 0, // 记录总条数
                current: 1, // 当前页数，
                pagenum: 20, // 每页显示条数
                pagegroup: 6, // 分页器每次展示出的条数
                skin: '#fc82b8' // 选中页码的颜色主题
            }
        };
    },
    mounted() {
        this.$store.dispatch('shopListClear');
        this.$store.dispatch('qryStoreList', this.ajaxdata);
    },
    methods: {
        pagechange(current) {
            // 页码改变传入新的页码，此处做回调
            this.ajaxdata.page = current;
            this.$store.dispatch('qryStoreList', this.ajaxdata);
        },
        skip(current) {
            this.ajaxdata.page = current;
            this.$store.dispatch('qryStoreList', this.ajaxdata);
        },
        ajaxTag(data) {
            this.ajaxdata = this.objExtend(this.ajaxdata, data, false);
            this.$store.dispatch('qryStoreList', this.ajaxdata);
        },
        ajaxfilter(method, priceToSort) {
            this.ajaxdata.method = method;
            this.ajaxdata.priceToSort = priceToSort;
            this.$store.dispatch('qryStoreList', this.ajaxdata);
        },
        ajaxPrice(minPrice, maxPrice) {
            this.ajaxdata.minPrice = minPrice;
            this.ajaxdata.maxPrice = maxPrice;
            this.$store.dispatch('qryStoreList', this.ajaxdata);
        },
        showBtn(busIndex, showAll) {
            let data = {
                index: busIndex,
                showAll: showAll
            };
            this.$store.dispatch('shopListChange', data);
        }
    },
    watch: {
        shopPage() {
            this.pageInfo.current = this.shopPage.currentPage;
            this.pageInfo.total = this.shopPage.totalCount;
            this.pageInfo.pagenum = this.shopPage.pageSize;
        }
    },
    beforeDestroy() {}
};
</script>


<style rel="stylesheet/scss" lang="scss">
@import './../assets/css/base.scss';
.page-comment {
    .bus-commit {
        width: 100%;
        padding-bottom: 20px;
        background: #fff;
        background-color: #fff;
    }

    .list {
        .list-con {
            position: relative;
            width: 1200px;
            height: auto;
            margin-top: 50px;
            overflow: hidden;
        }

        .list-con-li {
            width: 100%;
            height: 160px;
            border: 1px solid #e6e6e6;
        }
        .shop {
            position: relative;
            top: 5px;
            width: 690px;
            height: 155px;
            border-right: 1px solid #e6e6e6;
            .shop_logo {
                position: relative;
                left: 20px;
                top: 10px;
            }
            .shop_details {
                position: relative;
                left: 20px;
                top: 3px;
                float: left;
                width: 230px;
                height: 170px;
                margin-left: 20px;
                li {
                    display: block;
                    width: 487px;
                    height: 40px;
                    line-height: 40px;
                }
                .meal_name {
                    float: left;
                    display: inline-block;
                    color: #262626;
                    font-size: 22px;
                    width: 380px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    i {
                        float: left;
                    }
                }
                .price {
                    font-size: 14px;
                    font-weight: bold;
                    span {
                        color: #b2b2b2;
                    }
                    label {
                        font-size: 26px;
                        margin-left: 20px;
                        color: $color-normal;
                    }
                }
                .meal_tag {
                    display: block;
                    width: 100%;
                    li {
                        display: inline-block;
                        float: left;
                        width: auto;
                        height: 20px;
                        line-height: 20px;
                        font-size: 14px;
                        color: #999999;
                        margin: 6px 5px 2px 0;
                        padding: 0px 10px;
                        background: #f2f2f2;
                        border-radius: 10px;
                    }
                }
                .position {
                    font-size: 14px;
                    color: #808080;
                    margin-left: 5px;
                }
            }
        }
        .photo {
            display: inline-block;
            float: left;
            padding-top: 40px;
            width: auto;
            overflow: hidden;
            li {
                display: inline-block;
                float: left;
                margin-left: 35px;
                width: 220px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                .picture {
                    width: 220px;
                    height: 145px;
                }
                .pho_details {
                    font-size: 16px;
                    height: 40px;
                    line-height: 40px;
                    span {
                        width: 170px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        float: left;
                        color: #333333;
                    }
                    label {
                        color: $color-normal;
                        font-weight: bold;
                        float: right;
                    }
                }
            }
        }
    }

    .icon {
        float: left;
        margin-left: 5px;
    }

    .icon-yes {
        background: url('/static/images/icon.png');
        width: 30px;
        height: 30px;
        background-position: -15px -15px;
    }

    .icon-vip {
        background: url('/static/images/icon.png');
        width: 30px;
        height: 30px;
        background-position: -66px -13px;
    }

    .logo_position {
        background: url('/static/images/icon.png');
        width: 30px;
        height: 30px;
        background-position: -15px 40px;
    }

    .shop-num {
        position: relative;
        top: 5px;
        width: 508px;
        height: 155px;
        text-align: center;
        p {
            line-height: 40px;
        }
        li {
            display: inline-block;
            color: #4c4c4c;
            font-size: 16px;
            line-height: 24px;
            margin-right: 50px;
        }
    }

    .shop-num-total {
        color: $color-normal;
        font-size: 36px;
        font-weight: bold;
        margin-top: 5px;
    }

    .shop-num-total-txt {
        color: $color-normal;
        font-size: 14px;
    }

    .list-con-li-comments {
        background: #f2f2f2;
        background-color: #f2f2f2;
    }
    .bus-comments {
        height: 80px;
        width: 100%;
        overflow: hidden;
        border-bottom: 1px solid #e6e6e6;
    }
    .bus-comments-con {
        width: 100%;
        height: 100%;
        padding: 15px 8px 15px 20px;
    }
    .bus-comments-user-info {
        margin-left: 8px;
        height: 56px;
        span {
            width: 100px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            display: block;
            color: #262626;
            font-size: 18px;
            line-height: 35px;
        }
        label {
            display: block;
            font-size: 12px;
            color: #808080;
        }
    }
    .bus-comments-user-con {
        height: 56px;
        width: 450px;
        overflow: hidden;
        margin-left: 30px;
        a {
            display: block;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            color: #262626;
            font-size: 18px;
            line-height: 35px;
        }
        p {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            color: #808080;
            font-size: 14px;
        }
        a:hover {
            color: $color-hover;
            -webkit-transition: all 0.1s ease;
            transition: all 0.1s ease;
        }
    }
    .bus-comments-user-num {
        height: 56px;
        line-height: 56px;
        width: 508px;
        text-align: center;
        li {
            position: relative;
            display: inline-block;
            color: #4c4c4c;
            font-size: 16px;
            line-height: 24px;
            margin-right: 50px;
        }
    }

    .list-con-btn {
        position: relative;
        width: 1200px;
        background: #fff;
        background-color: #fff;
        div {
            position: relative;
            height: 30px;
            line-height: 30px;
            width: 120px;
            background: #e6e6e6;
            background-color: #e6e6e6;
            color: #4c4c4c;
            font-size: 14px;
            text-align: center;
            margin: 0 auto;
        }
        a {
        }
    }
    .h_auto {
        height: auto !important;
    }
    .h_80 {
        height: 80px !important;
    }
    div.bus-commit > div > ul > li:nth-child(1) > ul {
        margin-top: 0px;
    }
}
</style>