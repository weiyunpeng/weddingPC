<template>
    <transition name="modal">
        <div class="modal" v-if="getModal.status">
            <div class="modal_wrapper">
                <div class="modal-dialog panel">
                    <div class="panel_tit">
                        <h4>提示</h4>
                    </div>
                    <div class="panel_body">
                        <div class="panel_content">{{getModal.info.text}}</div>
                    </div>
                    <div class="panel_foot text-right">
                        <button class="btn btn-info btn-sm" @click="confirm">确定</button>
                        <button class="btn btn-danger btn-sm" @click="close">取消</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        data(){
            return {

            }
        },
        computed: {
            ...mapGetters({
                getModal: 'getModal'
            }),
            ...mapActions({
                hideModal: 'hideModal'
            }),
        },
        methods: {
            confirm(){
                this.$store.dispatch('hideModal',true);
            },
            close(){
                this.$store.dispatch('hideModal');
            }
        }
    }
</script>

<style>
    .modal{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 100;
        overflow: hidden;
        display: table;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, .3);
        -webkit-overflow-scrolling: touch;
        outline: 0;
        transition: opacity .3s ease;
        filter: alpha(opacity=30);/*IE*/
        background: #000\9;/*IE*/
    }
    .modal_wrapper{
        display: table-cell;
        vertical-align: middle;
    }
    .modal-dialog{
        position: relative;
        width: 400px;
        height: auto;
        margin: 0 auto;
        background: #fff;
        border-radius: 10px;
        -webkit-box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.4);
        -moz-box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.4);
        box-shadow: 0 0 3px 3px rgba(100, 100, 100, 0.4);
        transition: all .3s ease;
    }
    .modal-enter {
        opacity: 0;
        filter: alpha(opacity=0);/*IE*/
    }

    .modal-leave-active {
        opacity: 0;
        filter: alpha(opacity=0);/*IE*/
    }

    .modal-enter .modal-dialog,
    .modal-leave-active .modal-dialog {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
    .panel_tit{
        width: 100%;
        height: 35px;
        padding: 0 20px;
        line-height: 35px;
        font-size: 16px;
        color: #fff;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background: #eb5f74;
        background-color: #eb5f74;
    }
    .panel_foot{
        position: absolute;
        bottom: 0;
        width: 100%;
    }
    .btn-info{
        float: left;
        display: inline-block;
        border-bottom-left-radius: 10px;
        width: 50%;
    }
    .btn-danger{
        float: left;
        display: inline-block;
        width: 50%;
        border-bottom-right-radius: 10px;
        background: #fff;
        background-color: #fff;
    }
    .btn-danger:hover{
        background: #fff;
        background-color: #fff;
    }
    .panel_body{
        min-height: 100px;
        padding: 20px;
    }
</style>
