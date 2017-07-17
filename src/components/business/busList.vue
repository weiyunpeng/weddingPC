<template>
        <div class="container">
            <ul class="list">
                <li class="list_con">
                    <div class="shop">
                        <img class="shop_logo" src="./../../assets/img/1.png">
                        <ul class="shop_details">
                            <li><span class="meal_name">郑州凹凸视觉摄影</span><i class="icon icon-yes"></i><i class="icon icon-vip"></i></li>
                            <li class="price"><span>起拍价</span><label>¥4999</label></li>
                            <li>
                                <ul>
                                    <li>工作室</li>
                                    <!-- <li>工作室写实风格</li>
                                    <li>韩式</li> -->
                                </ul>
                            </li>
                            <li><i class="logo_position"></i>二七路大上海4楼</li>
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
        }
    },
    computed: {
        ...mapGetters({
        }),
        ...mapActions({
        })
    },
    mounted(){
        let self = this;
    },
    methods: {
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">
@import "./../../assets/css/list.scss";
</style>
