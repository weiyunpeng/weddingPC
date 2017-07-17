<template>
    <div class="container">
        <ul class="list">
            <li class="list_con" v-for="item in meal_list" :key="item.id">
                <div class="shop">
                    <img class="shop_logo" v-lazy="item.src">
                    <ul class="shop_details">
                        <li>
                            <div class="price">￥{{item.price}}</div>
                        </li>
                        <li class="meal_name">
                            {{item.meal_name}}
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
            </li>
        </ul>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data(){
        return{
            "meal_list":[
                {
                    "id":1,
                    "price":8888,
                    "meal_name":"旅拍海滩外景LOMO风套系",
                    "business_name":"郑州蒙娜丽莎婚纱摄影",
                    "src":"/static/images/meal-list.png"
                }
            ]
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">

</style>


