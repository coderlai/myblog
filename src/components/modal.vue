<template>
    <div class="my-modal" :class="obj">
        {{msg}}
        <a href="javascript:;" @click="hide">&Chi;</a>
    </div>
</template>
<script>
    export default{
        props:{
            msg:{
                type:String,
                default:'弹出框默认信息'
            },
            isActive:{
                type:Boolean,
                default:false
            }
        },
        methods:{
            hide:function () {
                this.$store.commit("toggleModal",{show:false,msg:''})
            }
        },
        computed:{
            obj:function () {
                return {
                    'my-active':this.isActive,
                    'my-hide':!this.isActive
                }
            }
        }
    }
</script>
<style>
    .my-modal {
        position: fixed;
        width: 200px;
        height: 45px;
        line-height:45px;
        padding-left:10px;
        background-color: rgba(49, 112, 143, .9);
        color: white;
        top: 30%;
        left:50%;
        margin-left:-100px;
        transition: all 1s;
        z-index:99999;
    }
    .my-modal > a {
        position: absolute;
        right: 5px;
        top: -10px;
        color: #fff;
        text-decoration: none;
    }

    .my-active {
        opacity: 1;
    }

    .my-hide {
        opacity: 0;
    }
</style>