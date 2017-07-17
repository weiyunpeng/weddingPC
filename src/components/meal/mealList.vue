<template>
    <div class="container">
        <ul class="meal_list">
            <li class="list_con" v-for="item in meal_list" :key="item.id">
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
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            "meal_list": [
                {
                    "id": 1,
                    "price": 8888,
                    "meal_name": "旅拍海滩外景LOMO风套系",
                    "business_name": "郑州蒙娜丽莎婚纱摄影",
                    "src": "/static/images/meal-list.png",
                    "tag1":true,
                    "tag2":false
                },
                {
                    "id": 2,
                    "price": 6666,
                    "meal_name": "旅拍海滩外景LOMO风套系",
                    "business_name": "郑州凹凸视觉摄影",
                    "src": "/static/images/meal-list.png",
                    "tag1":false,
                    "tag2":true
                },
                {
                    "id": 3,
                    "price": 7777,
                    "meal_name": "旅拍海滩外景LOMO风套系",
                    "business_name": "金夫人婚纱摄影",
                    "src": "/static/images/meal-list.png",
                    "tag1":true,
                    "tag2":true
                },
                {
                    "id": 4,
                    "price": 4444,
                    "meal_name": "旅拍海滩外景LOMO风套系",
                    "business_name": "郑州皮皮虾婚纱摄影",
                    "src": "/static/images/meal-list.png",
                    "tag1":false,
                    "tag2":false
                },
                {
                    "id": 5,
                    "price": 1111,
                    "meal_name": "旅拍海滩外景LOMO风套系",
                    "business_name": "郑州皮皮虾婚纱摄影",
                    "src": "/static/images/meal-list.png",
                    "tag1":false,
                    "tag2":true
                },
                {
                    "id": 6,
                    "price": 2222,
                    "meal_name": "旅拍海滩外景LOMO风套系",
                    "business_name": "郑州皮皮虾婚纱摄影",
                    "src": "/static/images/meal-list.png",
                    "tag1":true,
                    "tag2":false
                }
            ]
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">
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


