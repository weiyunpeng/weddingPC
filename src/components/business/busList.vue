<template>
    <div class="container">
        <ul class="list">
            <li class="list_con" v-for="item in list" :key="item.business.bus_id">
                <div class="shop">
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
                </div>
                <div class="photo">
                    <ul>
                        <li v-for="meal in item.meal" :key="meal.meal_id">
                            <img class="picture" v-lazy="meal.first_img">
                            <div class="pho_details">
                                <span>{{meal.name}}</span>
                                <label>¥{{meal.price}}</label>
                            </div>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            "list": [
                {
                    "business": {
                        "bus_id": 111,
                        "logo": "/static/images/1.png",
                        "name": "郑州凹凸视觉摄影",
                        "isYes": true,
                        "isVIP": true,
                        "price": 4999,
                        "position": "二七路大上海4楼",
                        "tag": [
                            "工作室",
                            "写实风格",
                            "韩式"
                        ]
                    },
                    "meal": [
                        {
                            "meal_id": 123,
                            "name": "唯美韩式套餐",
                            "first_img": "/static/images/2.png",
                            "price": 5699
                        },
                        {
                            "meal_id": 1223,
                            "name": "唯美韩式套餐",
                            "first_img": "/static/images/3.png",
                            "price": 4699
                        },
                        {
                            "meal_id": 1213,
                            "name": "唯美韩式套餐",
                            "first_img": "/static/images/4.png",
                            "price": 7699
                        }
                    ]
                },
                {
                    "business": {
                        "bus_id": 111,
                        "logo": "/static/images/1.png",
                        "name": "郑州凹凸视觉摄影",
                        "isYes": true,
                        "isVIP": false,
                        "price": 4999,
                        "position": "二七路大上海4楼",
                        "tag": [
                            "工作室",
                            "写实风格",
                            "韩式"
                        ]
                    },
                    "meal": [
                        {
                            "meal_id": 123,
                            "name": "唯美韩式套餐",
                            "first_img": "/static/images/2.png",
                            "price": 5699
                        },
                        {
                            "meal_id": 1223,
                            "name": "唯美韩式套餐",
                            "first_img": "/static/images/3.png",
                            "price": 4699
                        },
                        {
                            "meal_id": 1213,
                            "name": "唯美韩式套餐",
                            "first_img": "/static/images/4.png",
                            "price": 7699
                        }
                    ]
                },
                {
                    "business": {
                        "bus_id": 111,
                        "logo": "/static/images/1.png",
                        "name": "郑州凹凸视觉摄影",
                        "isYes": false,
                        "isVIP": false,
                        "price": 4999,
                        "position": "二七路大上海4楼",
                        "tag": [
                            "工作室",
                            "写实风格",
                            "韩式"
                        ]
                    },
                    "meal": [
                        {
                            "meal_id": 123,
                            "name": "唯美韩式套餐",
                            "first_img": "/static/images/2.png",
                            "price": 5699
                        },
                        {
                            "meal_id": 1223,
                            "name": "唯美韩式套餐",
                            "first_img": "/static/images/3.png",
                            "price": 4699
                        },
                        {
                            "meal_id": 1213,
                            "name": "唯美韩式套餐",
                            "first_img": "/static/images/4.png",
                            "price": 7699
                        }
                    ]
                }
            ]
        }
    },
    computed: {
        ...mapGetters({
        }),
        ...mapActions({
        })
    },
    mounted() {
        let self = this;
    },
    methods: {
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">
@import "./../../assets/css/list.scss";
</style>
