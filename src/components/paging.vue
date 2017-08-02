<template>
   <div>
       <div>上一页</div>
       <ul>
           <li>1</li>
       </ul>
       <div>下一页</div>
       <input>
       <div>跳转</div>
       <div>共{{busPage.totalCount}}条</div>
   </div>
</template>

<script>
export default {
    data() {
        return {
            items:[],
            itemsCeil:0
        }
    },
    props:{
        busPage:{
            type:Object,
            default:{}
        }
    },
    mounted(){
        console.log(this.itemsCeil)
    },
    methods: {
    },
    watch:{
        busPage(){
            this.itemsCeil = Math.ceil(this.busPage.totalCount/this.busPage.pageSize)
            console.log(this.itemsCeil)
            for(var i = 1;i<=this.itemsCeil;i++){
                this.items.splice(i,0,i)
            }
            console.log(this.items)
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">

</style>
