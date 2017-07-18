<template>
    <div class="container">
        <ul class="tag">
            <li v-for="(tag,number) in tag.getTags" :key="tag.title">
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
            
        }
    },
    props:["tag"],
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
            self.tag.getTags[number].isTag = index;
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">
    @import "./../../assets/css/tag.scss";
</style>
