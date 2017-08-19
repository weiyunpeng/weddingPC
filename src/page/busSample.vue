<template>
    <div>
        <com-header></com-header>
        <div class="store-sample">
            <div class="container clearfix" style="border-bottom:1px solid #eee">
                <div class="bus_name">
                    {{busSampleStore.store_name}}
                    <i class="icon icon-yes" v-if="busSampleStore.isYes"></i>
                    <i class="icon icon-vip" v-if="busSampleStore.isVip"></i>
                </div>
                <div class="second clearfix">
                    <div class="clearfix fl">
                        <label class="fl">媒体评定分：</label>
                        <div class="media_rating fl">
                            <ul class="star1">
                                <li v-for="n in 5" :key="n"></li>
                            </ul>
                            <ul class="star2">
                                <li v-for="m in busSampleStore.star" class="red" :key="m"></li>
                            </ul>
                        </div>
                    </div>
                    <div class="address fl">
                        地址：{{busSampleStore.address}}
                    </div>
                </div>
            </div>
        </div>
        <com-tag @ajaxTag="ajaxTag"></com-tag>
        <div class="meal-con">
            <ul class="meal_list container">
                <li class="list_con" v-for="(item,index) in busSampleList" :key="item.id">
                    <div class="shop">
                        <div class="img-hover">
                            <img class="shop_logo" v-lazy="item.logo" width="374" height="250" @click="showPhotoModal(item, index)">
                        </div>
                        <p class="meal_name">
                            {{item.name}}
                        </p>
                        <div class="tags">
                            <ul>
                                <li v-for="(tag,index) in item.tags" :key="index" class="tag">{{tag}}</li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <com-photoModal v-model="show" :value="show" :photoModal="photoModal" :order="orderNum"></com-photoModal>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import header from './../components/headerDetails'
import tag from "./../components/business/sampleTag"
import photoModal from './../components/photoModal'

export default {
    components: {
        comHeader: header,
        comTag: tag,
        'comPhotoModal': photoModal,
    },
    computed: {
        ...mapGetters({
            busSampleList: 'busSampleList',
            busSampleStore: 'busSampleStore'
        }),
        ...mapActions({
            qryBusSample: 'qryBusSample'
        })
    },
    data() {
        return {
            id: this.$route.query.sampleId,
            ajaxdata: {
                id: this.$route.query.sampleId
            },
            show: false,
            photoModal: {},
            orderNum: null,
        }
    },
    mounted() {
        // this.$store.dispatch('mealClear')
        let data = {
            id: this.id
        }
        this.$store.dispatch('qryBusSample', data)
    },
    methods: {
        ajaxTag(data) {
            this.ajaxdata = this.objExtend(this.ajaxdata, data, false);
            this.$store.dispatch('qryBusSample', this.ajaxdata)
        },
        showPhotoModal(item, index) {
            this.photoModal = item;
            if(!this.photoModal.img){
                this.photoModal.img = item.logo;
            }
            this.orderNum = index;
            this.show = true;
            const ajaxdata = {
                id: this.photoModal.id,
                type: 1
            }
            this.$store.dispatch('qryViewPhoto', ajaxdata)
        },
    },
    watch: {
    },
    beforeDestroy() {
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@charset "UTF-8";
.store-sample{
    width: 100%;
    background: #fff;
    background-color: #fff;
    padding-top: 20px;
}
.meal-con{
    width: 100%;
    background: #fff;
    background-color: #fff;
}

.meal_list {
    padding-bottom: 20px;
    border-top:1px solid #eee;
    .list_con {
        display: inline-block;
        width: 374px;
        height: 325px;
        overflow: hidden;
        margin: {
            right: 28px;
            top: 20px;
        }
        width:372px;
        .tags {
            font: {
                size: 24px;
                weight: bold;
            }
            color:#ff4e6b;
        }
        .tag {
            display: inline-block;
            width: auto;
            height: auto;
            border: 1px solid #ff4e6b;
            border-radius: 12px;
            color: #ff4e6b;
            text-align: center;
            margin-right: 8px;
            padding: 5px;
            font: {
                size: 14px;
                weight: normal;
            }
        }
        .meal_name {
            margin: {
                bottom: 6px;
            }
            font-size: 20px;
            color: #333;
            margin-top: 5px;
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
