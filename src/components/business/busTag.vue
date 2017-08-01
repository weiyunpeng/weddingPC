<template>
    <div class="container">
        <ul class="tag">
            <li v-for="(tag,number) in busTag" :key="tag.title">
                <strong>{{tag.title}} :</strong>
                <ul>
                    <li v-for="(tagCon,index) in tag.con" :key="index">
                        <a href="javascript:void(0)" v-bind:class="{tag_active: tag.selected==index}" @click="tagBtn(number,index,tagCon.id,tag.name)">{{tagCon.name}}</a>
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
        }
    },
    computed: {
        ...mapGetters({
            busTag: 'busTag'
        }),
        ...mapActions({
            qrybusTag: 'qrybusTag',
            busTagClear:'busTagClear',
            busTagChange:'busTagChange'
        })
    },
    mounted() {
        let data = {
            type: 'bus'
        }
        // this.$store.dispatch('busTagChange')
        this.$store.dispatch('qrybusTag', data)
    },
    methods: {
        tagBtn(number, index,id,name) {
            let changeData = {
                index:index,
                number:number
            }
            this.$store.dispatch('busTagChange' , changeData)
            let ajaxdata = {}
            ajaxdata[name] = id
            // this.$store.dispatch('busClear')
            this.$store.dispatch('qryBusList', ajaxdata)
        }
    },
    watch:{
        busTag:function(){
            // console.log(this.busTag)
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">
@import "./../../assets/css/tag.scss";
</style>
