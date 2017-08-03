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
            busTagClear:'busTagClear',
            busTagChange:'busTagChange'
        })
    },
    mounted() {
        this.$store.dispatch('qrybusTag')
    },
    methods: {
        tagBtn(number, index,id,name) {
            const changeData = {
                index:index,
                number:number
            }
            this.$store.dispatch('busTagChange' , changeData)
            const ajaxdata = {}
            for(var i = 0; i<this.busTag.length;i++){
                ajaxdata[this.busTag[i].name] = this.busTag[i].selected
            }
            this.$emit('ajaxTag',ajaxdata);
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
