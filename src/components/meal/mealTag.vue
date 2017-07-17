<template>
    <div class="container">
        <ul class="tag">
            <li v-for="(tag,number) in getTags" :key="tag.title">
                <strong>{{tag.title}} :</strong>
                <ul>
                    <li v-for="(tagCon,index) in tag.con" :key="tagCon">
                        <a href="javascript:void(0)" v-bind:class="{tag_active: tag.isTag==index}" @click="tagChange(number,index)">{{tagCon}}</a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            tagName: '',
            getTags: [
                {
                    "title": "分类",
                    "con": [
                        "不限",
                        "影楼",
                        "工作室",
                        "独立摄影师"
                    ],
                    "isTag": 0
                }, {
                    "title": "主打特色",
                    "con": [
                        "不限",
                        "韩式",
                        "花海",
                        "欧美大气",
                        "个性",
                        "中国风",
                        "森系",
                    ],
                    "isTag": 1
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
        tagChange(number, index) {
            let self = this;
            self.getTags[number].isTag = index;
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">
@import "./../../assets/css/tag.scss";
</style>
