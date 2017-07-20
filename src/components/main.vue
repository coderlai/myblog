<template>
    <div>
        <asideComponent></asideComponent>
        <div class="col-sm-9 animated bounceInRight">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import asideComponent from "./aside.vue"
    export default {
        data(){
           return {

           }
        },
        components:{asideComponent}
    }
</script>

<style>
.form-horizontal input{
    border-radius:0;
}
.form-horizontal button{
    border-radius:0;
}

.post-item-container{
    margin-bottom: 30px;
    border-bottom: 1px dashed #d9d9d9;
}
.post-item-container>h4{
    margin-bottom:30px;
}
.post-item-container>h4>a{
    color: #337ab7;
    text-decoration: none;
    font-size:18px;
}
.post-item-container>h4>a:hover{
    color: #23527c;
    text-decoration: underline;
}
</style>