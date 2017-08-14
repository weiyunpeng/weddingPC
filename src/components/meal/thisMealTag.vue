<template>
    <div class="bus-tag">
        <div class="container">
            <ul class="tag">
                <li v-for="(tag,number) in thisMealTag" :key="tag.title">
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
            thisMealTag: 'thisMealTag'
        }),
        ...mapActions({
            busThisMealTagClear: 'busThisMealTagClear',
            busThisMealTagChange: 'busThisMealTagChange'
        })
    },
    mounted() {
        this.$store.dispatch('qryThisMealTag')
    },
    methods: {
        tagBtn(number, index, id, name) {
            const changeData = {
                index: index,
                number: number
            }
            this.$store.dispatch('busThisMealTagChange', changeData)
            const ajaxdata = {}
            for (var i = 0; i < this.thisMealTag.length; i++) {
                ajaxdata[this.thisMealTag[i].name] = this.thisMealTag[i].con[this.thisMealTag[i].selected].id
            }
            this.$emit('ajaxTag', ajaxdata);
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">
@import "./../../assets/css/tag.scss";
</style>
