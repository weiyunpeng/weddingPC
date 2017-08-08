<template>
    <div class="container">
        <ul class="tag">
            <li v-for="(tag,number) in busTag" :key="tag.title">
                <strong>{{tag.title}} :</strong>
                <ul>
                    <li v-for="(tagCon,index) in tag.con" :key="index">
                        <a href="javascript:void(0)" v-bind:class="{tag_active: tag.selected==index}" @click="tagBtn(number,index,tag.name,tagCon.id)">{{tagCon.name}}</a>
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
        const ajaxdata={
            "tag1" :0,
            "tag2":0,
            "tag3":0
        }
        this.$store.dispatch('qrybusTag')
    },
    methods: {
        tagBtn(number, index,name,id) {
            const changeData = {
                index:index,
                number:number
            }
            this.$store.dispatch('busTagChange' , changeData)
            const ajaxdata = {}
            for(var i = 0; i<this.busTag.length;i++){
                ajaxdata[this.busTag[i].name] = this.busTag[i].con[this.busTag[i].selected].id
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
