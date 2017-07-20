<template>
<div>
    <modal :isActive="show" :msg="msg"></modal>
    <headerComponent></headerComponent>
    <div class="container main-container">
        <div class="container">
            <div class="row">
                <router-view></router-view>
            </div>
        </div>
    </div>
    <footerComponent></footerComponent>
</div>
</template>

<script>
    import headerComponent from "./components/header.vue";
    import footerComponent from "./components/footer.vue";
    export default {
        components:{headerComponent,footerComponent},
        methods:{

        },
        computed:{
            show(){
                return this.$store.state.show;
            },
            msg(){
                return this.$store.state.msg;
            }
        }
    }
</script>
<style>
.main-container{
    padding-top:80px;
    min-height: 800px;
}
.container{
    padding-left:0;
    padding-right:0;
}
</style>