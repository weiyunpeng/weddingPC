<template>
    <div class="bus-tag">
        <div class="container">
            <ul class="tag">
                <li v-for="(tag,number) in busSampleTag" :key="tag.title">
                    <strong>{{tag.title}} :</strong>
                    <ul>
                        <li v-for="(tagCon,index) in tag.con" :key="index">
                            <a href="javascript:void(0)" v-bind:class="{tag_active: tag.selected==index}" @click="tagBtn(number,index,tag.name,tagCon.id)">{{tagCon.name}}</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
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
            busSampleTag: 'busSampleTag'
        }),
        ...mapActions({
            busSampleTagClear: 'busSampleTagClear',
            busSampleTagChange: 'busSampleTagChange'
        })
    },
    mounted() {
        this.$store.dispatch('qryBusSampleTag')
    },
    methods: {
        tagBtn(number, index, name, id) {
            const changeData = {
                index: index,
                number: number
            }
            this.$store.dispatch('busSampleTagChange', changeData)
            const ajaxdata = {}
            for (var i = 0; i < this.busSampleTag.length; i++) {
                ajaxdata[this.busSampleTag[i].name] = this.busSampleTag[i].con[this.busSampleTag[i].selected].id
            }
            this.$emit('ajaxTag', ajaxdata);
        }
    },
    watch: {
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">
@import "./../../assets/css/tag.scss";
</style>
