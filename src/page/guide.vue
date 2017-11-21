<template>
    <div class="page-guide">
        <com-header></com-header>
        <div class="hot-raiders" style="margin-top:0">
            <div class="container">
                <ul class="new-imgwrap fl">
                    <li v-for="(item,guideNum) in guides" :key="guideNum">
                        <a :href="item.url" target="_blank">
                            <div class="img-hover fl">
                                <img v-lazy="item.img" width="240" height="160">
                            </div>
                        </a>
                        <div class="img-ct fr">
                            <h3><a :href="item.url" target="_blank">{{item.title}}</a></h3>
                            <p>{{item.con}}</p>
                            <div class="read-ct fr">{{item.view}}看过 &nbsp;&nbsp;{{item.comment}}<i class="pl-icon"></i></div>
                        </div>
                    </li>
                </ul>
                <div class="new-evaluation fr">
                    <div class="eval-tit">
                        最新拍客评价<span>{{count}}篇</span>
                    </div>
                    <ul>
                        <li v-for="(item,index) in comments" :key="index">
                            <h4><a :href="item.url" target="_blank">{{item.title}}</a></h4>
                            <div class="li-ct">
                                <span class="sj fl">拍摄商家：
                                  <router-link :to="{ name: 'storeDetails', params: {busId:item.storeId}}" target="_blank">
                                      {{item.storeName}}
                                  </router-link>
                                </span>
                                <div class="read-ct fr">{{item.views}}看过 &nbsp;{{item.replies}}<i class="pl-icon"></i></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
                
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import header from './../components/header';

export default {
    components: {
        comHeader: header
    },
    computed: {
        ...mapGetters({
            getGuideList: 'getGuideList'
        }),
        ...mapActions({
            qryGuideList: 'qryGuideList'
        })
    },
    data() {
        return {
            guides: [],
            comments: [],
            count: 0
        };
    },
    mounted() {
        this.$store.dispatch('qryGuideList');
        window.smoothscroll();
    },
    methods: {},
    watch: {
        getGuideList() {
            this.guides = this.getGuideList.guides.list;
            this.comments = this.getGuideList.comments.list;
            this.count = this.getGuideList.comments.count;
        }
    },
    beforeDestroy() {}
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import './../assets/css/base.scss';
.page-guide {
    background-color: #ffffff;
    .hot-raiders {
        i.pl-icon {
            display: inline-block;
            width: 16px;
            height: 12px;
            background: url(../../static/images/pl-icon.png) no-repeat;
        }
        .new-imgwrap {
            width: 800px;
            min-height: 800px;
            li {
                width: 800px;
                text-align: left;
                height: auto;
                min-height: 160px;
                overflow: auto;
                margin-top: 25px;
                margin-bottom: 0;
                .img-hover {
                    width: 240px !important;
                    height: 160px !important;
                }
            }
        }
        .img-ct {
            width: 546px;
            h3 {
                font-size: 20px;
                color: #333;
                font-weight: normal;
                margin-bottom: 16px;
            }
            a {
                color: #333;
            }
            p {
                color: #b2b2b2;
                font-size: 14px;
                line-height: 20px;
            }
            .read-ct {
                color: #b0b0b0;
                font-size: 14px;
            }
        }
        .new-evaluation {
            width: 340px;
            margin-top: 25px;
            .eval-tit {
                font-size: 24px;
                color: #1a1a1a;
                background: url(../../static/images/tit-bg1.png) left bottom
                    no-repeat;
                padding-bottom: 6px;
                text-align: left;
                margin-bottom: 20px;
                span {
                    color: #b2b2b2;
                    font-size: 14px;
                    margin-left: 8px;
                }
            }
            ul li {
                width: 340px;
                height: auto;
                padding-bottom: 10px;
                margin-top: 15px;
                margin-bottom: 0;
                border-bottom: 1px solid #e6e6e6;
                h4 {
                    color: #333;
                    font-weight: normal;
                    text-align: left;
                    margin-bottom: 14px;
                    a {
                        color: #333;
                        font-size: 16px;
                    }
                }
                .li-ct {
                    font-size: 14px;
                    height: 16px;
                    line-height: 16px;
                    .sj {
                        display: inline-block;
                        color: $color-normal;
                        background: url(../../static/images/sj-icon.png) left
                            center no-repeat;
                        padding-left: 20px;
                        width: 230px;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                        text-align: left;
                        :hover {
                            color: $color-hover;
                        }
                    }
                    .read-ct {
                        color: #b0b0b0;
                    }
                }
            }
        }
    }
}
</style>
