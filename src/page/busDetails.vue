<template>
    <div class="container" id="busDetails">
        <div class="bus_introduction clearfix">
            <div class="left_zoom">
                <div class="big_img">
                    <img v-lazy="bus_introduction[0].img_list[1].src" width="600" height="400">
                </div>
                <div class="small_img">
                    <ul>
                        <li v-for="item in bus_introduction[0].img_list" v-bind:key="item.id">
                            <img v-lazy="item.src" width="144" height="96">
                        </li>
                    </ul>
                    <div class="arrow">
                        <a href="javascript:void(0)" class="prev"></a>
                        <a href="javascript:void(0)" class="next"></a>
                    </div>
                </div>
                <div class="zoom_img">
    
                </div>
            </div>
            <div class="right_introduction">
                <div class="top">
                    <h2>
                        {{bus_introduction[1].introduction.bus_name}}
                        <i class="icon icon-vip" v-if="bus_introduction[1].introduction.isVip"></i>
                        <i class="icon icon-yes" v-if="bus_introduction[1].introduction.isYes"></i>
                    </h2>
                    <div class="price">
                        起拍价
                        <span>￥{{bus_introduction[1].introduction.price}}</span>
                    </div>
                    <div class="address clearfix">
                        <label class="fl">地址：{{bus_introduction[1].introduction.address}}</label>
                        <div class="map fl">
                            <i class="icon logo_position"></i>查看地图
                        </div>
                    </div>
                    <div class="tags">
                        <ul>
                            <li v-for="tag in bus_introduction[1].introduction.tags" v-bind:key="tag.tag">
                                {{tag.tag}}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="bottom">
                    <div class="clearfix">
                        <label class="fl">媒体评定分：</label>
                        <div class="media_rating fl">
                            <ul class="star1">
                                <li v-for="n in 5" v-bind:key="n"></li>
                            </ul>
                            <ul class="star2">
                                <li v-for="n in bus_introduction[1].introduction.media_rating" v-bind:key="n" class="red"></li>
                            </ul>
                        </div>
                    </div>
                    <div class="clearfix">
                        <label class="fl">媒体评定语：</label>
                        <div class="media_comment fl">
                            {{bus_introduction[1].introduction.media_comment}}
                        </div>
                    </div>
                    <div class="code">
                        <a v-on:click="erweima" href="javascript:void(0)">
                            咨询豫姐
                        </a>
                        <div class="erweima" v-show="bus_introduction[1].introduction.erweima">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="nav">
            <ul>
                <li v-for="item in nav" v-bind:key="">
                    {{item.msg}}
                </li>
            </ul>
        </div>
        <!-- case官方案例开始 -->
        <div class="case">
            <div class="tit"></div>
            <div class="more clearfix">
                <!--应该是<router-link>吧，先放着，等大佬回来  -->
                <a href="" class="more_a fr">更多 ></a>
            </div>
            <div class="list">
                <ul>
                    <li v-for="item in bus_case" v-bind:key="">
                        <img v-lazy="item.src">
                        <h3>{{item.case_name}}</h3>
                        <div class="tags">
                            <ul>
                                <li v-for="tag in item.tags" v-bind:key="">
                                    {{tag.tag}}
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- case官方案例结束 -->
        <!-- 精选套餐开始 -->
        <div class="package">
            <div class="tit"></div>
            <div class="more clearfix">
                <!--应该是<router-link>吧，先放着，等大佬回来  -->
                <a href="" class="more_a fr">更多 ></a>
            </div>
            <div class="list">
                <ul>
                    <li v-for="item in package" v-bind:key="">
                        <img v-lazy="item.src">
                        <div class="top clearfix">
                            <div class="price fl">￥{{item.price}}</div>
                            <div class="tags fr">
                                <ul>
                                    <li v-for="tag in item.tags" v-bind:key="">
                                        {{tag.tag}}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <h3>{{item.package_name}}</h3>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 精选套餐结束 -->
        <!-- 摄影团队开始  -->
        <div class="photographer">
            <div class="tit"></div>
            <div class="arrows">
                <a class="prev arrow" href="javascrript:void(0)"></a>
                <a class="next arrow" href="javascrript:void(0)"></a>
            </div>
            <div class="list">
                <ul>
                    <li v-for="item in photographer" v-bind:key="">
                        <img v-lazy="item.src">
                        <div class="top clearfix">
                            <div class="name fl">{{item.name}}</div>
                            <div class="years fr">
                                <ul>
                                    <li>
                                        {{item.years}}年
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="special">
                            拍摄特点：{{item.special}}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 摄影团队结束  -->
        <!-- 化妆团队开始 -->
        <div class="dresser">
             <div class="tit"></div>
            <div class="arrows">
                <a class="prev arrow" href="javascrript:void(0)"></a>
                <a class="next arrow" href="javascrript:void(0)"></a>
            </div>
            <div class="list">
                <ul>
                    <li v-for="item in dresser" v-bind:key="">
                        <img v-lazy="item.src">
                        <div class="top clearfix">
                            <div class="name fl">{{item.name}}</div>
                            <div class="years fr">
                                <ul>
                                    <li>
                                        {{item.years}}年
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="special">
                            拍摄特点：{{item.special}}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 化妆团队结束 -->
        <!-- 商家简介开始 -->
        <div class="business">
            <div class="tit"></div>
            <div class="cont clearfix">
                <div class="left fl">
                    <div class="top clearfix">
                        <img v-lazy="business.src" class="fl">
                        <div class="fl">
                            <span>商家简介</span>
                            <span class="name">{{business.bus_name}}</span>
                        </div>
                    </div>
                    <div class="bottom" v-html="business.brief">
                    </div>
                </div>
                <div class="right fr">
                    <div class="star_time item">
                        <label>开业时间：</label>
                        <span>{{business.star_time}}</span>
                    </div>
                    <div class="bus_time item">
                        <label>营业时间：</label>
                        <span>{{business.bus_time}}</span>
                    </div>
                    <div class="payment item">
                        <label>付款方式：</label>
                        <span>{{business.payment}}</span>
                    </div>
                    <div class="feature clearfix item">
                        <label class="fl">服务特色：</label>
                        <span class="fl">
                            <ul>
                                <li v-for="item in business.features">{{item.feature}}</li>
                            </ul>
                        </span>
                    </div>
                </div>
            </div>
            <div class="environment">
                <div class="subtit">门店环境</div>
                <ul class="clearfix">
                    <li v-for="item in business.environment" class="fl">
                        <img v-lazy="item.src">
                    </li>
                </ul>
                <div class="arrows">
                    <a class="prev arrow" href="javascrript:void(0)"></a>
                    <a class="next arrow" href="javascrript:void(0)"></a>
                </div>
            </div>
        </div>
        <!-- 商家简介结束 -->
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
            "bus_introduction": [
                {
                    "img_list": [
                        {
                            "src": "/static/images/6.png",
                            "id": 1
                        },
                        {
                            "src": "/static/images/5.png",
                            "id": 2
                        },
                        {
                            "src": "/static/images/7.png",
                            "id": 3
                        },
                        {
                            "src": "/static/images/8.png",
                            "id": 4
                        }
                    ]
                },
                {
                    "introduction": {
                        "bus_name": "郑州凹凸视觉摄影",
                        "isYes": true,
                        "isVip": false,
                        "price": 4999,
                        "address": "经七路丰产路交叉口西北角二楼",
                        "tags": [
                            { "tag": "工作室" },
                            { "tag": "写实风格" },
                            { "tag": "韩式" }
                        ],
                        "media_rating": 2,
                        "media_comment": "进入7月，虽说是进入了结婚的淡季，但下半年及明年要结婚的小伙伴们可得加了个油了，结婚筹备一定要趁早。也为了大家更好的筹婚备婚，大豫新娘帮携手艾唯婚礼策划团队及中洲皇冠假日酒店潮鲜厅为大家带来一场不容错过的婚礼秀。进入到7月，虽说是进入了结婚的淡季",
                        "erweima": false,
                    }
                }
            ],
            "nav": [
                {
                    "msg": "官方案例"
                },
                {
                    "msg": "精选套餐"
                },
                {
                    "msg": "摄影师团队"
                },
                {
                    "msg": "化妆团队"
                },
                {
                    "msg": "商家简介"
                }
            ],
            "business": {
                "src": "/static/images/10.png",
                "bus_name": "郑州凹凸视觉摄影",
                "star_time": "2000年9月",
                "bus_time": "每周一至周日 8:00-20:00",
                "payment": "刷卡、现金",
                "features": [
                    { "feature": "7天选卡" },
                    { "feature": "15天出精修" },
                    { "feature": "一年保修" },
                    { "feature": "不满意重拍" },
                ],
                "brief": "炎炎夏日，街上尽是短袖，相比起人人都熟悉的白T恤，黑T恤反而显得没什么存在感，其实，黑T的经典与时髦程度绝不亚于前者，不但百搭，同时也是你吃饭时（火锅）绝对不用担心的单品。在大电影《低俗小说》里，乌曼穿着简单的黑Tee，举着手枪吸烟的场景弥足经典，也只有黑Tee，能够这样轻松地勾勒出这种魅惑的性感。<br>其实，黑T的经典与时髦程度绝不亚于前者，不但百搭，同时也是你吃饭时（火锅）绝对不用担心的单品。在大电影《低俗小说》里，乌曼穿着简单的黑Tee。",
                "environment": [
                    { "src": "/static/images/9.png" },
                    { "src": "/static/images/9.png" },
                    { "src": "/static/images/9.png" },
                    { "src": "/static/images/9.png" },
                    { "src": "/static/images/9.png" }
                ]
            },
            "bus_case": [
                {
                    "src": "/static/images/11.png",
                    "case_name": "浪漫唯美花海实景美照",
                    "tags": [
                        { "tag": "小清新" },
                        { "tag": "韩式" },
                    ]
                },
                {
                    "src": "/static/images/11.png",
                    "case_name": "简约大气的中式秀禾服婚纱照",
                    "tags": [
                        { "tag": "中式" },
                        { "tag": "秀禾服" },
                        { "tag": "简约" }
                    ]
                },
                {
                    "src": "/static/images/11.png",
                    "case_name": "绿色清新唯美的户外草地照",
                    "tags": [
                        { "tag": "小清新" },
                        { "tag": "韩式" }
                    ]
                },
                {
                    "src": "/static/images/11.png",
                    "case_name": "皮皮照",
                    "tags": [
                        { "tag": "大清新" },
                        { "tag": "韩式炸鸡" }
                    ]
                },
                {
                    "src": "/static/images/11.png",
                    "case_name": "虾虾照",
                    "tags": [
                        { "tag": "大清新嘻嘻" },
                        { "tag": "韩式炸鸡" }
                    ]
                },
                {
                    "src": "/static/images/11.png",
                    "case_name": "骚猪照",
                    "tags": [
                        { "tag": "pdd" },
                        { "tag": "sao" },
                        { "tag": "zhu" }
                    ]
                }
            ],
            "package": [
                {
                    "src": "/static/images/12.png",
                    "price": 8899,
                    "package_name": "旅拍海滩外景LOMO风套系",
                    "tags": [
                        {
                            "tag": "摄影师一对一"
                        },
                        {
                            "tag": "化妆师一对一"
                        }
                    ]
                },
                {
                    "src": "/static/images/12.png",
                    "price": 6999,
                    "package_name": "皮皮虾套系",
                    "tags": [
                        {
                            "tag": "摄影师一对一"
                        }
                    ]
                },
                {
                    "src": "/static/images/12.png",
                    "price": 6666,
                    "package_name": "骚猪套系",
                    "tags": [
                        {
                            "tag": "化妆师一对一"
                        }
                    ]
                }
            ],
            "photographer": [
                {
                    "src": "/static/images/13.png",
                    "name": "皮皮虾",
                    "years": 2,
                    "special": "欧美、小清新、韩式"
                },
                {
                    "src": "/static/images/13.png",
                    "name": "pdd",
                    "years": 5,
                    "special": "欧美、小清新"
                },
                {
                    "src": "/static/images/13.png",
                    "name": "骚猪",
                    "years": 4,
                    "special": "欧美"
                },
                {
                    "src": "/static/images/13.png",
                    "name": "骚猪",
                    "years": 4,
                    "special": "欧美"
                },
                {
                    "src": "/static/images/13.png",
                    "name": "骚猪",
                    "years": 4,
                    "special": "欧美"
                }
            ],
            "dresser": [
                {
                    "src": "/static/images/13.png",
                    "name": "皮皮虾",
                    "years": 2,
                    "special": "欧美、小清新、韩式"
                },
                {
                    "src": "/static/images/13.png",
                    "name": "pdd",
                    "years": 5,
                    "special": "欧美、小清新"
                },
                {
                    "src": "/static/images/13.png",
                    "name": "骚猪",
                    "years": 4,
                    "special": "欧美"
                },
                {
                    "src": "/static/images/13.png",
                    "name": "骚猪",
                    "years": 4,
                    "special": "欧美"
                },
                {
                    "src": "/static/images/13.png",
                    "name": "骚猪",
                    "years": 4,
                    "special": "欧美"
                }
            ],
        }
    },
    mounted() {
    },
    methods: {
        erweima: function () {
            this.bus_introduction[1].introduction.erweima = !this.bus_introduction[1].introduction.erweima;
        }
    },
    beforeDestroy() {
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "./../assets/css/busDetails.scss";
</style>

