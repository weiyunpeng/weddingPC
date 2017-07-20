<template>
    <div class="container" id="mealDetails">
        <div class="meal_introduction clearfix">
            <div class="bus_name">
                {{meal_introduction.bus_name}}
                <i class="icon icon-yes" v-if="meal_introduction.isYes"></i>
                <i class="icon icon-vip" v-if="meal_introduction.isVip"></i>
            </div>
            <div class="second clearfix">
                <div class="clearfix fl">
                    <label class="fl">媒体评定分：</label>
                    <div class="media_rating fl">
                        <ul class="star1">
                            <li v-for="n in 5"></li>
                        </ul>
                        <ul class="star2">
                            <li v-for="n in meal_introduction.media_rating" class="red"></li>
                        </ul>
                    </div>
                </div>
                <div class="address fl">
                    地址：{{meal_introduction.address}}
                </div>
            </div>
            <div class="bottom clearfix">
                <div class="left_zoom fl">
                    <div class="big_img">
                        <img v-lazy="meal_introduction.img[0].src">
                    </div>
                    <div class="small_img">
                        <ul>
                            <li v-for="item in meal_introduction.img">
                                <img v-lazy="item.src" width="138" height="92">
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
                <div class="right_introduction fr">
                    <div class="meal_name">
                        {{meal_introduction.meal_name}}
                    </div>
                    <div class="tags">
                        <ul>
                            <li v-for="tag in meal_introduction.tags">
                                {{tag.tag}}
                            </li>
                        </ul>
                    </div>
                    <div class="price">
                        <span>￥{{meal_introduction.price}}</span>
                    </div>
                    <div class="others">
                        <dl class="clearfix">
                            <dt class="fl">服装造型：</dt>
                            <dd class="fl">{{meal_introduction.clothes}}套</dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="fl">精修：</dt>
                            <dd class="fl">{{meal_introduction.ps}}张</dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="fl">场景：</dt>
                            <dd class="fl">{{meal_introduction.scene}}</dd>
                        </dl>
                    </div>
                    <div class="code">
                        <a v-on:click="erweima" href="javascript:void(0)">
                            咨询豫姐
                        </a>
                        <div class="erweima" v-show="meal_introduction.erweima">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="remaining clearfix">
            <div class="fl details">
                <div class="subnav">
                    <ul>
                        <li class="subnav_li cur">套餐详情</li>
                        <li class="subnav_li">图文详情</li>
                    </ul>
                </div>
                <div class="deposit item">
                    <div class="tit">
                        定金
                        <i class="mark"></i>
                    </div>
                    <div class="cont">
                        <dl class="clearfix">
                            <dt class="fl">定金</dt>
                            <dd class="fl">{{deposit.money}}</dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="fl">定金说明</dt>
                            <dd class="fl">{{deposit.explain}}</dd>
                        </dl>
                    </div>
                </div>
                <div class="modelling item">
                    <div class="tit">
                        造型
                        <i class="mark"></i>
                    </div>
                    <div class="cont">
                        <dl class="clearfix">
                            <dt class="fl">新娘服装</dt>
                            <dd class="fl">{{modelling.bride_clothes}}套服装</dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="fl">新郎服装</dt>
                            <dd class="fl">{{modelling.groom_clothes}}套服装</dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="fl">服装说明</dt>
                            <dd class="fl">{{modelling.clothes_explain}}套服装</dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="fl">造型数量</dt>
                            <dd class="fl">{{modelling.num}}</dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="fl">造型说明</dt>
                            <dd class="fl">{{modelling.explain}}</dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="fl">化妆品说明</dt>
                            <dd class="fl">{{modelling.cosmetic_explain}}</dd>
                        </dl>
                    </div>
                </div>
                <div class="scene item">
                    <div class="tit">
                        场景
                        <i class="mark"></i>
                    </div>
                    <div class="cont">
                        <dl class="clearfix">
                            <dt class="fl">内景数量</dt>
                            <dd class="fl">{{scene.in}}个</dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="fl">外景数量</dt>
                            <dd class="fl">{{scene.out}}个</dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="fl">内景说明</dt>
                            <dd class="fl">{{scene.in_explain}}个</dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="fl">外景说明</dt>
                            <dd class="fl">{{scene.out_explain}}个</dd>
                        </dl>
                    </div>
                </div>
                <div class="shoot item">
                    <a class="strategy" href="#">
                        攻略
                    </a>
                    <div class="tit">
                        拍摄
                        <i class="mark"></i>
                    </div>
                    <div class="cont">
                        <dl class="clearfix">
                            <dt class="fl">拍摄天数</dt>
                            <dd class="fl">{{shoot.days}}天</dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="fl">拍摄张数</dt>
                            <dd class="fl">{{shoot.num}}张</dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="fl">精修张数</dt>
                            <dd class="fl">{{shoot.ps_num}}张</dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="fl">入册张数</dt>
                            <dd class="fl">{{shoot.in_num}}张</dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="fl">补充说明</dt>
                            <dd class="fl">{{shoot.replenish_explain}}</dd>
                        </dl>
                    </div>
                </div>
                <div class="end_product item">
                    <a class="strategy" href="#">
                        攻略
                    </a>
                    <div class="tit">
                        成品
                        <i class="mark"></i>
                    </div>
                    <div class="cont">
                        <dl class="clearfix">
                            <dt class="fl">相册数量</dt>
                            <dd class="fl">{{end_product.album_num}}本</dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="fl">相册说明</dt>
                            <dd class="fl">{{end_product.album_explain}}</dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="fl">相框数量</dt>
                            <dd class="fl">{{end_product.frame_num}}个</dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="fl">相框说明</dt>
                            <dd class="fl">{{end_product.frame_explain}}</dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="fl">其他内容</dt>
                            <dd class="fl">{{end_product.other}}</dd>
                        </dl>
                    </div>
                </div>
                <div class="team item">
                    <div class="tit">
                        团队
                        <i class="mark"></i>
                    </div>
                    <div class="cont">
                        <dl class="clearfix">
                            <dt class="fl">摄影师</dt>
                            <dd class="fl">{{team.photographer}}</dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="fl">化妆师</dt>
                            <dd class="fl">{{team.dresser}}</dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="fl">灯光师</dt>
                            <dd class="fl">{{team.lighting}}</dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="fl">化妆助理</dt>
                            <dd class="fl">{{team.dresser_sup}}</dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="fl">摄影助理</dt>
                            <dd class="fl">{{team.photographer_sup}}</dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="fl">微视频拍摄</dt>
                            <dd class="fl">{{team.video}}</dd>
                        </dl>
                    </div>
                </div>
                <div class="other_explain item">
                    <div class="tit">
                        其他说明
                        <i class="mark"></i>
                    </div>
                    <div class="cont">
                        <dl class="clearfix">
                            <dt class="fl">购买须知</dt>
                            <dd class="fl">{{other_explain.notes}}</dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="fl">赠品</dt>
                            <dd class="fl">{{other_explain.gift}}</dd>
                        </dl>
                        <dl class="clearfix">
                            <dt class="fl">亮点</dt>
                            <dd class="fl">{{other_explain.highlight}}</dd>
                        </dl>
                    </div>
                </div>
                <div class="graphic item">
                    <div class="tit">
                        图文详情
                        <i class="mark"></i>
                    </div>
                    <div class="cont">
                        <ul>
                            <li v-for="item in graphic">
                                <img v-lazy="item.src">
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="fr see">
                <div class="tit clearfix">
                    看了又看
                    <a class="more fr" href="#">查看全部 ></a>
                </div>
                <div class="list">
                    <ul>
                        <li v-for="item in see_and_see">
                            <img v-lazy="item.src">
                            <div class="name_price clearfix">
                                <div class="name fl">{{item.name}}</div>
                                <div class="price fr">￥{{item.price}}</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    components: {

    },
    methods: {
        erweima: function () {
            this.meal_introduction.erweima = !this.meal_introduction.erweima;
        }
    },
    data() {
        return {
            "meal_introduction": {
                "img": [
                    {
                        "src": "/static/images/15.png"
                    },
                    {
                        "src": "/static/images/15.png"
                    },
                    {
                        "src": "/static/images/15.png"
                    },
                    {
                        "src": "/static/images/15.png"
                    },
                    {
                        "src": "/static/images/15.png"
                    }
                ],
                "bus_name": "郑州凹凸视觉摄影",
                "isYes": true,
                "isVip": true,
                "media_rating": 3,
                "address": "宇宙银河皮皮虾星系",
                "meal_name": "私人定制D3套系-内外双景+多种风格+爱情微电影",
                "price": 6999,
                "tags": [
                    {
                        "tag": "摄影师一对一"
                    },
                    {
                        "tag": "化妆师一对一"
                    }
                ],
                "clothes": 5,
                "ps": 120,
                "scene": "内外双景，5-6个场景",
                "erweima": false
            },
            "deposit": {
                "money": 2000,
                "explain": "进入7月，虽说是进入了结婚的淡季，但下半年及明年要结婚的小伙伴们可得加了个油了，结婚筹备一定要趁早。也为了大家更好的筹婚备婚，大豫新娘帮携手艾唯婚礼策划团队及中洲皇冠假日酒店潮鲜厅为大家带来一场不容错过的婚礼秀。"
            },
            "modelling": {
                "bride_clothes": 5,
                "groom_clothes": 5,
                "clothes_explain": "我是全英雄联盟最骚的骚猪我F可以实力手动换子弹这波百发百中我必不可能这波死的就是你这个骚猪 (诶)对面出动一个师的兵力干我骚猪我依然发育起来了而且还躲过他们很多波的围剿(你们觉得PDD躺的扣个6好不好)我把烟 掉在地上 捡起来 抽反了把TM燃着的 抽到嘴巴里去了孙亚龙的车队你们就别拿来说了好吗",
                "num": 5,
                "explain": "我是全英雄联盟最骚的骚猪",
                "cosmetic_explain": "全套 Makeup Forever 系列彩妆组合"
            },
            "scene": {
                "in": 5,
                "out": 2,
                "in_explain": "我是全英雄联盟最骚的骚猪我F可以实力手动换子弹这波百发百中我必不可能这波死的就是你这个骚猪 (诶)对面出动一个师的兵力干我骚猪我依然发育起来了而且还躲过他们很多波的围剿(你们觉得PDD躺的扣个6好不好)",
                "out_explain": "我是全英雄联盟最骚的骚猪我F可以实力手动换子弹这波百发百中我必不可能这波死的就是你这个骚猪 (诶)对面出动一个师的兵力干我骚猪我依然发育起来了而且还躲过他们很多波的围剿(你们觉得PDD躺的扣个6好不好)"
            },
            "shoot": {
                "days": 1,
                "num": 250,
                "ps_num": 88,
                "in_num": 60,
                "replenish_explain": "额外精修，一张100元"
            },
            "end_product": {
                "album_num": 2,
                "album_explain": "我是全英雄联盟最骚的骚猪",
                "frame_num": 2,
                "frame_explain": "我是全英雄联盟最骚的骚猪",
                "other": "替换相框材质，需要补差价，不支持比套内更低档的更换"
            },
            "team": {
                "photographer": "骚猪",
                "dresser": "皮皮虾",
                "lighting": "炸鸡",
                "dresser_sup": "啤酒",
                "photographer_sup": "啤酒",
                "video": "有"
            },
            "other_explain": {
                "notes": "交付定金后，不可随意更改拍摄日期或替换其他套餐",
                "gift": "送你一个么么哒",
                "highlight": "清新唯美，韩式风格。资深级摄影师一对一服务"
            },
            "graphic": [
                {
                    "src": "/static/images/16.png"
                },
                {
                    "src": "/static/images/16.png"
                },
                {
                    "src": "/static/images/16.png"
                }
            ],
            "see_and_see": [
                {
                    "src": "/static/images/17.png",
                    "name": "唯美韩式海滩外景套系",
                    "price": 5699
                },
                {
                    "src": "/static/images/17.png",
                    "name": "唯美韩式海滩外景套系",
                    "price": 5699
                },
                {
                    "src": "/static/images/17.png",
                    "name": "唯美韩式海滩外景套系",
                    "price": 5699
                }
            ]
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">
@import "./../assets/css/mealDetails.scss";
</style>

