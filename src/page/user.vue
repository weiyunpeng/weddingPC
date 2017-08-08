<template>
    <div class="user">
        <com-header></com-header>
        <div class="container">
            <div class="user-info">
                <img class="user-head fl" src="/static/images/demo_06.png" width="124" height="124">
                <div class="user-nike">
                    <p>张小萌</p>
                    <label>我的收藏</label>
                </div>
                <ul class="user_category user_category_style">
                    <li v-for="(item,s) in style" :key="s">
                         <span class="show_list">{{item.name}}</span> 
                         <div class="line">
                            <div class="bar" v-bind:style="{ width: item.value + '%' }"></div>
                        </div> 
                         <span class="percent">{{item.value}}%</span> 
                    </li>
                    <img style="margin:20px 0" src="/static/images/icon_photo_from.png">
                </ul>
                <ul class="user_category user_category_store">
                    <li v-for="(item,s) in store" :key="s">
                        <div class="show_img"><img :src="item.logo" width="64" height="64"></div>
                         <div class="line line-store">
                            <div class="bar" v-bind:style="{ width: item.value + '%' }"></div>
                        </div> 
                         <span class="percent">{{item.value}}%</span> 
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import header from './../components/user/userHead'

export default {
    components: {
        comHeader: header,
    },
    computed: {
        ...mapGetters({
        }),
        ...mapActions({
        })
    },
    data() {
        return {
            style: [
                {
                    "name": "古风",
                    "value": 56
                },
                {
                    "name": "小清新",
                    "value": 36
                },
                {
                    "name": "韩式",
                    "value": 76
                }
            ],
            store: [
                {
                    "logo":"/static/images/1.png",
                    "name": "古风",
                    "value": 56
                },
                {
                    "logo":"/static/images/1.png",
                    "name": "小清新",
                    "value": 36
                },
                {
                    "logo":"/static/images/1.png",
                    "name": "韩式",
                    "value": 76
                }
            ]
        }
    },
    mounted() {
    },
    methods: {
    },
    watch: {
    },
    beforeDestroy() {
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.user-head {
    position: relative;
    top: -45px;
    left: 5px;
    z-index: 9;
}

.user-info {
    z-index: 6;
    position: relative;
    top: 50px;
    width: 290px;
    height: 565px;
    background: #ffffff;
    padding: 2px 10px;
}

.user-nike {
    position: relative;
    left: 20px;
    top: 18px;
    p {
        color: #4c4c4c;
        font-size: 22px;
        line-height: 27.28px;
    }
    label {
        display: block;
        color: #b2b2b2;
        font-size: 14px;
        line-height: 27.28px;
    }
}

.user_category {
    position: absolute;
    width: 275px;
    overflow: hidden;
    li {
        width: 100%;
        height: 28.06px;
        margin-top: 10px;
        line-height: 28.06px;
    }
}
.user_category_style{
    top: 100px;
}

.show_list {
    float: left;
    width: 70px;
    font-size: 16px;
    color: #4c4c4c;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.user_category_store{
    top: 260px;
    li{
        height: 60px;
        line-height: 88.06px;
    }
}

.show_img{
    width: 70px;
    line-height: 38.06px;
    float: left;
}

.line {
    float: left;
    width: 55%;
    border: 1px solid #ffa9b7;
    height: 8px;
    border-radius: 10px;
    background: #ffffff;
    margin-right: 7px;
    margin-top: 10px;
}
.line-store{
    margin-top: 40px;
}

.percent{
    float: left;
    color: #808080;
    font-size: 14px;
}

.bar {
    background: #ffa9b7;
    float: left;
    height: 100%;
    border-radius: 10px;
}

.bar {
    animation: animate-positive 2s;
}

@-webkit-keyframes animate-positive {
    0% {
        width: 0;
    }
}

@keyframes animate-positive {
    0% {
        width: 0;
    }
}

@-moz-keyframes animate-positive {
    0% {
        width: 0;
    }
}
</style>
