<template>
    <div class="container">
        <com-tag v-bind:tag="tag"></com-tag>
        <meal-filter></meal-filter>
        <meal-list></meal-list>
    </div>
</template>

<script>
import tag from "./../components/meal/mealTag"
import list from "./../components/meal/mealList"
import busFilter from "./../components/business/busFilter"

export default {
    components: {
        comTag: tag,
        mealList: list,
        mealFilter:busFilter
    },
    data() {
        return {
            img: '/static/images/bg.jpg',
            tag: {
                tagName: '',
                getTags: [
                    {
                        "title": "风格",
                        "con": [
                            "不限",
                            "影楼",
                            "工作室",
                            "独立摄影师"
                        ],
                        "isTag": 0
                    }, {
                        "title": "场景",
                        "con": [
                            "不限",
                            "草坪",
                            "室外花海",
                            "室内纯色",
                            "室内花房",
                            "宫殿",
                            "咖啡馆",
                            "城市旅拍",
                            "教堂",
                            "海景",
                            "游乐场",
                            "古城",
                            "跑马场",
                            "水下",
                            "河湖",
                        ],
                        "isTag": 0
                    }, {
                        "title": "区域",
                        "con": [
                            "不限",
                            "中原区",
                            "二七区",
                            "管城回族区",
                            "金水区",
                            "高新区",
                            "上街区",
                            "惠济区",
                            "经开区",
                            "郑东新区",
                        ],
                        "isTag": 0
                    }
                ]
            }
        }
    },
    mounted() {
    },
    methods: {
    },
    beforeDestroy() {
    }
}
</script>
